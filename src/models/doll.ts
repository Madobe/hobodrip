import type { Enemy } from "./enemy"
import type { MapField } from "./map-field"

import Weapon, { Weapons } from "./weapon"

import DispatchRoomStats from '@/assets/data/dispatch-room-stats.json'
import { DollType } from "@/utils/defs"

import { Unit } from "./unit"

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

    // Doll values that can't be changed via UI
    attack = 0 // Base attack
    best_set = "" // The best attachment set for this doll
    cooldowns = [] // The cooldowns for each skill
    crit_dmg = 120 // Base crit damage
    crit_rate = 20 // Base crit rate
    defense = 0 // Base defense
    health = 0 // Base health
    img_path = "" // The path for the doll's selection portrait
    name = "" // Doll name
    neural_helix = 0 // Number of neural helix slots unlocked
    rarity = 0 // The rarity of the doll (0 = Standard, 1 = Elite)
    type = 0 // The type of doll
    universal_keys = [] // The universal (right side) keys on the doll
    weapon: Weapon // The weapon currently equipped by the doll

    // Values that are specific to the web app
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
     * Changes the doll's active weapon.
     * @param name The name of the weapon to change to.
     */
    changeWeapon ( name: string ) {
        this.weapon = weapons[ name ] ?? new Weapon( { attack: 0, name: "Placeholder", type: 0 } )
    }

    /**
     * The base normal attack function. This may change for a doll if they have a different
     * multiplier for their default attack. In this case, this parent function can just be called
     * with a different multiplier from the descendant. For example:
     *
     * super( field, target, 0.9 )
     *
     * @param field The map state.
     * @param target The enemy being targeted.
     * @param skillModifier The modifier on the attack (generally, this is 80% of attack).
     * @returns The average damage to be expected (damage is set to the average expected when crit
     * is accounted for).)
     */
    normalAttack ( field: MapField, target: Enemy, skillModifier = 0.8 ) {
        const attack = this.totalAttack
        const scaledAttack = attack / ( 1 + target.defense / attack )
        const critValue = ( this.totalCritDmg - 100 ) / ( 100 / this.crit_rate )

        // TODO: Add damage% buffs
        let multipliers = 1
        if ( target.weaknesses.includes( this.weapon.type ) ) multipliers += 0.1

        return scaledAttack * multipliers * critValue * skillModifier
    }

    /**
     * The doll's passive ability. Needs to be overridden by any descendants.
     */
    passive () { }

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    skill1 ( target: Enemy ) { }
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    skill2 ( target: Enemy ) { }
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    skill3 ( target: Enemy ) { }
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    skill4 ( target: Enemy ) { }
}
