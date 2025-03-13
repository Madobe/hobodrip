import type { Attachment } from "@/types/attachments"

import { DefaultEnemy, Enemy } from "./enemy"
import { EmptyMapField, MapField } from "./map-field"
import MapUnit, { DefaultMapUnit } from "./map-unit"
import { Unit } from "./unit"
import Weapon, { Weapons } from "./weapon"

import DispatchRoomStats from '@/assets/data/dispatch-room-stats.json'
import { DollRarity, DollType, MapEvent, Weakness, WeaponTypes, type MapEventArgs } from "@/utils/defs"

interface DollArgs {
    fixedKeys?: number
    neuralHelix?: number
    fortifications?: number
    weapon: Weapon
}

const weapons: {
    [ key: string ]: Weapon
} = Weapons.reduce( ( accumulator, weapon ) => {
    return Object.assign( accumulator, {
        [ weapon.name ]: weapon
    } )
}, {} )

/**
 * Represents a doll unit.
 */
export class Doll extends Unit {
    // Doll values that can be changed via UI
    affinity = 1 // Affinity level
    covenant = false // Is this doll married?
    dispatch_room = 1 // The level of the dispatch room
    fixed_keys = 0 // The number of fixed keys currently unlocked on the doll
    fortifications = 0 // The number of fortifications (dupes) on the doll
    movement = 5 // Base movement
    neural_helix = 0 // Number of neural helix slots unlocked
    stability = 10 // Base stability
    universal_keys = [] // The universal (right side) keys on the doll
    weapon = weapons[ "Planeta" ]// The weapon currently equipped by the doll

    // Doll values that can't be changed via UI
    ammo_type: Weakness = Weakness.AMMO_MEDIUM
    best_set = "" // The best attachment set for this doll
    cooldowns: number[] = [] // The cooldowns for each skill
    img_path = "/hobodrip/images/placeholder.png" // The path for the doll's selection portrait
    rarity = DollRarity.STANDARD // The rarity of the doll (0 = Standard, 1 = Elite)
    stat_order: string[] = []
    type: DollType = DollType.BULWARK // The type of doll
    weaponType: WeaponTypes = WeaponTypes.AR

    // Values that are specific to the web app (note that these may not be used on every page)
    order = 0

    constructor( data: DollArgs ) {
        super()

        this.fixed_keys = data.fixedKeys || 0
        this.fortifications = data.fortifications || 0
        this.neural_helix = data.neuralHelix || 0
        this.weapon = data.weapon
    }

    /**
     * The amount of extra attack/defense/HP the doll has as a result of the amount of fixed keys
     * are unlocked for her.
     * 0-1 = 0%
     * 2-3 = 3%
     * 4-5 = 6%
     * 6   = 12%
     */
    get advancementBenefit () {
        return 1 + (
            this.fixed_keys >= 2 ?
                3 * Math.pow( 2, Math.floor( this.fixed_keys / 2 ) - 1 ) / 100 :
                0
        )
    }

    /**
     * Returns an object with the bonuses afforded by the current neural helix level. This is meant
     * to be overridden by each descendant.
     */
    get affinityStats () {
        return this.defaultStatsObject
    }

    /**
     * Method meant to be overridden by each doll which determines the scaling of the attachments.
     * The default is just checking the regular attack damage. This does not work properly for any
     * dolls that scale off things other than attack, or do not scale with the same stats on their
     * different skills.
     */
    get attachmentValue () {
        return this.skill1( EmptyMapField, DefaultEnemy, DefaultMapUnit )
    }

    /**
     * The combat effectiveness of the doll. The only part that's assumed is t
     */
    get combatEffectiveness () {
        // Assume an attachment is calibrated if any of the stats on the attachment are over 5 but
        // below 20 (to not false positive on a flat stat)
        const calibrations = Object.values( this.weapon.attachments )
            .filter( a => a.stats.some( s => s.value >= 5 && s.value <= 20 ) )
            .length

        return (
            ( 5 * this.totalAttack + 4 * this.totalHealth + 3 * this.totalDefense ) *
            this.advancementBenefit *
            ( 0.1 * this.totalCritRate / 100 +
                0.2 * this.totalCritDmg / 100 +
                0.01 * this.fixed_keys +
                0.01 * this.fortifications +
                0.008 * calibrations )
        ).toFixed( 0 )
    }

    /**
     * The percentage boost given by the doll's covenant status (5% or nothing).
     */
    get covenantBoost () {
        return this.covenant ? 5 : 0
    }

    /**
     * The stats that can be supplemented by sources other than weapons/attachments. This object is
     * intended to be updated by its caller before being returned from it.
     */
    get defaultStatsObject () {
        return Object.seal( {
            attack: 0,
            attack_boost: 0,
            crit_dmg: 0,
            crit_rate: 0,
            defense: 0,
            health: 0,
            health_boost: 0
        } )
    }

    /**
     * Gets the current dispatch room bonuses for the doll's type at the dispatch room level.
     */
    get dispatchRoomStats () {
        const stats = this.defaultStatsObject

        if (
            this.type === DollType.BULWARK && this.dispatch_room >= 2 ||
            this.type === DollType.SENTINEL && this.dispatch_room >= 4 ||
            this.type === DollType.SUPPORT && this.dispatch_room >= 3 ||
            this.type === DollType.VANGUARD && this.dispatch_room >= 1
        ) {
            Object.assign( stats, DispatchRoomStats[ this.type ][ Math.floor( this.dispatch_room / 4 ) ] )
        }

        return stats
    }

    /**
     * The neural helix stat boosts for the doll.
     */
    get neuralHelixStats () {
        return this.defaultStatsObject
    }

    /**
     * The total attack of the doll, after all boosts are added.
     */
    get totalAttack () {
        const totalFlat = this.attack + this.weapon.attack + this.neuralHelixStats.attack + this.affinityStats.attack +
            this.dispatchRoomStats.attack + this.weapon.getStatTotal( "Attack" )
        const attackBoosts = this.neuralHelixStats.attack_boost + this.weapon.attackBoost + this.advancementBenefit +
            this.covenantBoost

        return totalFlat * ( 1 + ( attackBoosts / 100 ) )
    }

    /**
     * The total defense of the doll, after all boosts are added.
     */
    get totalDefense () {
        const totalFlat = this.defense + this.neuralHelixStats.defense + this.affinityStats.defense +
            this.dispatchRoomStats.defense + this.weapon.getStatTotal( "Defense" )
        const defenseBoosts = this.weapon.defenseBoost + this.advancementBenefit + this.covenantBoost

        return totalFlat * ( 1 + ( defenseBoosts / 100 ) )
    }

    /**
     * The total health of the doll, after all boosts are added.
     */
    get totalHealth () {
        const totalFlat = this.health + this.neuralHelixStats.health + this.affinityStats.health +
            this.dispatchRoomStats.health + this.weapon.getStatTotal( "Health" )
        const healthBoosts = this.weapon.healthBoost + this.advancementBenefit + this.covenantBoost

        return totalFlat * ( 1 + ( healthBoosts / 100 ) )
    }

    /**
     * The total crit rate of the doll, after all boosts are added.
     */
    get totalCritRate () {
        return this.crit_rate + this.neuralHelixStats.crit_rate + this.affinityStats.crit_rate +
            this.dispatchRoomStats.crit_rate + this.weapon.critRate
    }

    /**
     * The total crit damage of the doll, after all boosts are added.
     */
    get totalCritDmg () {
        return this.crit_dmg + this.neuralHelixStats.crit_dmg + this.affinityStats.crit_dmg +
            this.dispatchRoomStats.crit_dmg + this.weapon.critDmg
    }

    /**
     * Calculates what combination of attachments is the best.
     * @param best The currently equipped attachments.
     * @param leftovers The attachments that have yet to be tested in this recursion.
     */
    calculateBestAttachments ( equipped: Attachment[], leftovers: Attachment[][] ): Attachment[] {
        if ( !leftovers.length ) return equipped

        const attachments = leftovers.pop() ?? []
        let bestValue = 0
        let bestIndex = -1

        for ( let i = 0; i < attachments.length; i++ ) {
            this.weapon.attachments.push( attachments[ i ] )
            const currentValue = this.attachmentValue

            if ( currentValue > bestValue ) {
                bestValue = currentValue
                bestIndex = i
            }

            this.weapon.attachments.pop()
        }

        if ( bestIndex > -1 ) {
            equipped.push( attachments[ bestIndex ] )
        }

        return this.calculateBestAttachments( equipped, leftovers )
    }

    /**
     * Adds the given confectance index. This is handled by MapUnit.
     * @param amount The amount to change the confectance index by. This can be negative.
     */
    changeConfectance ( amount: number ) {
        dispatchEvent( new CustomEvent( "doll_gainConfectance", {
            bubbles: true,
            detail: {
                actor: this,
                amount
            }
        } ) )
    }

    /**
     * Changes the doll's active weapon. The old weapon will be up for garbage collection because
     * nothing has a reference to it, so there's no need to worry about deletion.
     * @param name The name of the weapon to change to.
     */
    changeWeapon ( name: string ) {
        const attachments = this.weapon.attachments
        this.weapon = Object.keys( weapons ).includes( name ) ?
            weapons[ name ].clone() :
            new Weapon( { attack: 0, name: "Placeholder", type: 0 } )
        this.weapon.attachments = attachments
    }

    /**
     * The base attack function. Every attack will use call this, but will provide its own
     * multipliers. Note that there's not a need to differentiate what kind of multipliers are
     * accounted for because they all end up in the same part of the formula.
     * @param field The map state.
     * @param target The enemy being targeted.
     * @param skillModifier The modifier on the attack (default is 80% of attack).
     * @returns The average damage to be expected (damage is set to the average expected when crit
     * is accounted for).)
     */
    doAttack ( field: MapField, target: Enemy, skillModifier = 0.8, coverIgnore = 0 ) {
        const attack = this.totalAttack
        const scaledAttack = attack / ( 1 + target.defense / attack )
        const critValue = ( this.totalCritDmg - 100 ) / ( 100 / this.crit_rate )

        let multipliers = 1
        if ( target.weaknesses & this.ammo_type ) multipliers += 0.1

        const rawDamage = scaledAttack * multipliers * critValue * skillModifier

        // TODO: Calculate increases from passives on dolls/weapons

        // TODO: Check cover and stability damage reduction
        const coverReduction = !!target.stability ? target.stability_damage_reduction : 0
        const reducedDamage = rawDamage * ( 1 - ( coverReduction - coverIgnore ) )

        return reducedDamage
    }

    /**
     * Provides this doll with an extra action. This is handled in MapUnit.
     */
    doExtraAction () {
        dispatchEvent( new CustomEvent( "doll_extraAction", {
            bubbles: true,
            detail: {
                actor: this
            }
        } ) )
    }

    /**
     * The doll's passive ability. Needs to be overridden by any descendants. Note that any passives
     * that are based on actions should be instead dealt with in the "handleEvent" function.
     * @param event The type of event.
     * @param args Information about the event that occurred.
     */
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    handleEvent ( map: MapField, event: MapEvent, args: MapEventArgs ) { }

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    skill1 ( field: MapField, target: Enemy, actor: MapUnit ): number { return 0 }
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    skill2 ( field: MapField, target: Enemy, actor: MapUnit ): number { return 0 }
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    skill3 ( field: MapField, target: Enemy, actor: MapUnit ): number { return 0 }
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    skill4 ( field: MapField, target: Enemy, actor: MapUnit ): number { return 0 }

    toJSON () {
        return {
            affinity: this.affinity,
            covenant: this.covenant,
            dispatch_room: this.dispatch_room,
            fixed_keys: this.fixed_keys,
            fortifications: this.fortifications,
            neural_helix: this.neural_helix,
            name: this.name,
            universal_keys: this.universal_keys,
            weapon: this.weapon.toJSON()
        }
    }
}
