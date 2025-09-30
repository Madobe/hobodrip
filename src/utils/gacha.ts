import { computed, onMounted, onUnmounted, ref } from "vue"

import { Category, useGachaItems, type GachaItem } from "@/data-providers/gacha"
import { getRandomElement } from "./array"
import { clamp } from "./math"

// Configurations (weights are out of 100)
const baseNamespace = "hobodrip.gacha" // For localStorage
const eliteWeight = 0.6 // eg. 0.6% of the time, an elite is pulled
const maxPulls = 1000 // The maximum number of entries to save for this banner
const standardWeight = 6 // eg. 6% of the time, a standard is pulled

export enum GachaType {
    DOLL = 0,
    WEAPON
}

type BannerParams = {
    effectiveHardPity: number,
    hardPity: number,
    softPity: number
}

export type PullRecord = {
    category: Category,
    name: string,
    pity?: number
}

type FirstPullFn = ( category: Category ) => void
interface UseGachaParams {
    id: string,
    rateUp: GachaItem[],
    type?: GachaType,
    onFirstFn: FirstPullFn
}

/**
 * Checks if the given pull has already been pulled before.
 * @param pulls The cache of pulls to check.
 * @param pull The pull to check.
 * @returns True if pull is in pulls. False otherwise.
 */
function includesPull ( pulls: PullRecord[], pull: GachaItem | PullRecord ): boolean {
    return pulls.map( p => p.name ).includes( pull.name )
}

/**
 * Removes extra parameters to lower the local storage footprint.
 * @param item The item to slim down.
 * @returns GachaItem with some properties removed.
 */
function toPullRecord ( item: GachaItem, pity?: number ) {
    return {
        category: item.category,
        name: item.name,
        pity
    }
}

export function useGacha ( { id, rateUp, type = GachaType.DOLL, onFirstFn }: UseGachaParams ) {
    if ( rateUp.map( i => i.category ).some( c => c & Category.NONEXISTENT ) ) {
        console.error( `One or more of the items for banner '${id}' did not exist.` + rateUp )
    }

    const namespace = `${baseNamespace}.${id}`

    const hasGuarantee = computed( () => {
        const lastElite = pulls.value.toReversed().find( p => p.category & Category.ELITE )
        return lastElite && !isRateUp( lastElite.name )
    } )
    const params: BannerParams = {
        [ GachaType.DOLL ]: {
            effectiveHardPity: 74,
            hardPity: 80,
            softPity: 58
        },
        [ GachaType.WEAPON ]: {
            effectiveHardPity: 64,
            hardPity: 70,
            softPity: 48
        }
    }[ type ]
    const pity = computed( () => pullCount.value - clamp( pulls.value.findLastIndex( p => p.category & Category.ELITE ), 0, params.hardPity ) )
    const pulls = ref( [] as PullRecord[] )
    const pullCount = computed( () => pulls.value.length )
    const standardPity = computed( () => pullCount.value - pulls.value.findLastIndex( p => p.category & Category.STANDARD ) - 1 )
    const totalElites = computed( () => pulls.value.filter( p => p.category & Category.ELITE ).length )
    const totalStandards = computed( () => pulls.value.filter( p => p.category & Category.STANDARD ).length )

    const {
        findElite,
        getEliteExcept,
        standardItems,
        standardWeapons
    } = useGachaItems()

    /**
     * Adds a pull to the pull history and clamps the size to maxPulls.
     * @param pull The pull to add.
     */
    function addPull ( pull: PullRecord ) {
        const leftover = pulls.value.slice( -( maxPulls - 1 ) )
        pulls.value = leftover.concat( pull )
        if ( includesPull( leftover, pull ) ) onFirstFn( pull.category )
    }

    /**
     * Performs a gacha pull count number of times.
     * @param count The amount of pulls to perform.
     */
    function doMulti ( count: number = 10 ) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for ( const _ of Array( count ).keys() ) {
            doSingle()
        }
    }

    /**
     * Does a single pull on the given banner with the given rate-ups.
     */
    function doSingle (): void {
        const roll = Math.random() * 100
        const eliteRate = getCurrentEliteRate( params )
        const standardRate = standardWeight + eliteRate

        if ( roll < eliteRate ) {
            if ( hasGuarantee.value || Math.random() * 100 < 50 ) addPull( toPullRecord( findElite( rateUp ), pity.value ) )
            else addPull( toPullRecord( getRandomElement( getEliteExcept( type, rateUp ) ), pity.value ) )
        } else if ( roll < standardRate || standardPity.value + 1 >= 10 ) {
            if ( type === GachaType.DOLL && Math.random() * 100 < 50 )
                addPull( toPullRecord( getRandomElement( rateUp.filter( i => i.category & Category.STANDARD && i.category & Category.DOLL ) ) ) )
            else
                addPull( toPullRecord( getRandomElement( standardItems.value ) ) )
        } else {
            const randomWeapon = getRandomElement( standardWeapons.value )

            addPull( Object.assign( {
                category: Category.RETIRED | Category.WEAPON,
                name: `Retired ${randomWeapon.name}`
            } ) )
        }
    }

    /**
     * Calculates how likely an elite doll/weapon is in the next pull.
     * @param type The type of gacha (doll or weapon).
     * @param pullCount The amount of pulls already made.
     * @returns The percentage in standard readable format.
     */
    function getCurrentEliteRate ( { effectiveHardPity, hardPity, softPity }: BannerParams ) {
        function pullCountToChance ( upper: number ) {
            return parseFloat( "99.99999".slice( 0, 8 - ( upper - pity.value ) ) )
        }

        // These rates are just arbitrary assumptions based on the 2 million pulls data on exilium.moe
        if ( pity.value === hardPity ) return 100
        else if ( pity.value >= effectiveHardPity ) return pullCountToChance( hardPity - 1 )

        return eliteWeight + ( 5.788 * Math.max( 0, pity.value + 1 - softPity ) )
    }

    /**
     * Checks whether the given item is in the rate-up items.
     * @param string The name of the item to check.
     * @returns True if it is. False otherwise.
     */
    function isRateUp ( name: string ) {
        return rateUp.map( i => i.name ).includes( name )
    }

    /**
     * Clears current pulls and the pulls saved to the browser.
     */
    function resetPullHistory () {
        pulls.value.length = 0
        localStorage.removeItem( namespace )
    }

    onMounted( () => {
        const data: PullRecord[] = JSON.parse( localStorage.getItem( namespace ) ?? "[]" )

        if ( data && Array.isArray( data ) ) {
            pulls.value = data
        }
    } )

    onUnmounted( () => {
        const PullRecords = pulls.value.map( p => ( { category: p.category, name: p.name } ) )
        localStorage.setItem( namespace, JSON.stringify( PullRecords ) )
    } )

    return {
        doMulti,
        doSingle,
        hasGuarantee,
        isRateUp,
        pity,
        pullCount,
        pulls,
        resetPullHistory,
        totalElites,
        totalStandards
    }
}
