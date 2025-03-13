import { MapField } from "../map-field";
import MapUnit from "../map-unit";

import { Doll } from "../doll";
import { Enemy } from "../enemy";
import { Planeta } from "../weapon";
import { DollType, MapEvent, Weakness, WeaponTypes, type MapEventArgs } from "@/utils/defs";

class DollTololo extends Doll {
    readonly attack = 836
    readonly best_set = "Hydro Boost"
    readonly defense = 528
    readonly health = 1819
    readonly img_path = "/src/assets/images/dolls/Tololo.png"
    readonly name = "Tololo"
    readonly rarity = 1
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.SENTINEL
    readonly weaknesses = Weakness.AMMO_HEAVY | Weakness.ELECTRIC
    readonly weaponType = WeaponTypes.AR

    private lightspike = 0

    constructor() {
        super( { weapon: Planeta } )
    }

    get affinityStats () {
        const stats = this.defaultStatsObject

        switch ( this.affinity ) {
            default:
            case 5:
                stats.attack += 54
                stats.health += 112
            case 4:
                stats.attack += 42
                stats.defense += 76
            case 3:
                stats.health += 90
                stats.defense += 32
            case 2:
                stats.attack += 24
                stats.health += 78
            case 1:
            case 0:
                break
        }

        return stats
    }

    get neuralHelixStats () {
        const stats = this.defaultStatsObject

        switch ( this.neural_helix ) {
            default:
            case 6: stats.attack += 64; stats.health += 137
            case 5: stats.attack += 55; stats.defense += 40
            case 4: stats.health += 105; stats.crit_dmg += 10
            case 3: stats.attack += 47; stats.defense += 30
            case 2: stats.health += 77; stats.attack_boost += 5
            case 1: stats.attack += 39; stats.defense += 22
            case 0: break
        }

        return stats
    }

    /**
     * V5: The effects of Lightspike is enhanced, increasing critical rate and critical damage by 2%.
     */
    get totalCritRate () {
        const lightspikeBoost = ( this.fortifications >= 5 ? 0.7 : 0.5 ) * this.lightspike
        return super.totalCritRate + lightspikeBoost
    }

    /**
     * V5: The effects of Lightspike is enhanced, increasing critical rate and critical damage by 2%.
     */
    get totalCritDmg () {
        const lightspikeBoost = ( this.fortifications >= 5 ? 0.7 : 0.5 ) * this.lightspike
        return super.totalCritDmg + lightspikeBoost
    }

    /**
     * Fills Confectance Index to maximum at the start of the battle. After attacking, if
     * Confectance Index is at max, consumes all of it and gains 1 instance of Extra Action. At the
     * start of each action, for every 2 points of Confectance Index, gains 1 random buff until the
     * end of the action. Each time an allied unit deals Hydro damage, this unit gains 1 stack of
     * Lightspike.
     *
     * V4: During an Extra Action, this unit gains Targeted Attack Boost II, Critical Rate Boost II,
     * Phase Boost II and Piercing II for 2 turns.
     */
    handleEvent ( map: MapField, event: MapEvent, args: MapEventArgs ): void {
        // If another doll does hydro damage, gain +1 lightspike
        if (
            args.actor !== this &&
            ( event & MapEvent.DOLL_ATTACK ) === MapEvent.DOLL_ATTACK &&
            args.element && ( args.element & Weakness.HYDRO ) === Weakness.HYDRO
        ) {
            this.lightspike = Math.min( 8, this.lightspike + 1 )
        }

        if ( args.actor === this && ( event & MapEvent.KILLED_TARGET ) === MapEvent.KILLED_TARGET ) {
            this.changeConfectance( 1 )
        }

        if (
            args.actor === this &&
            ( event & MapEvent.DOLL_ATTACK ) === MapEvent.DOLL_ATTACK &&
            args.confectance >= 6
        ) {
            this.changeConfectance( -args.confectance )
            // Grant extra action
        }
    }

    /**
     * Selects 1 enemy target within 8 tiles and deals physical damage equal to 80% of attack to
     * them.
     */
    skill1 ( field: MapField, target: Enemy ) {
        return this.doAttack( field, target )
    }

    /**
     * Select 1 enemy target within 8 tiles and deal Hydro damage equal to 130% of attack to it. If
     * phase weakness is exploited, this attack ignores 15% of Cover damage reduction and gain 2
     * points of Confectance Index.
     *
     * Fixed Key: Apply Congestion for 2 turns.
     */
    skill2 ( field: MapField, target: Enemy ) {
        let multiplier = 1.3

        if ( target.weaknesses & ( this.ammo_type | Weakness.HYDRO ) ) {
            // Need to raise Confectance externally because otherwise it causes a recursion
            // this.confectance += 2
        }

        if ( target.weaknesses & Weakness.HYDRO ) multiplier += 0.1

        return this.doAttack( field, target, multiplier )
    }

    /**
     * Selects 1 enemy target within 8 tiles, dealing physical damage equal to 130% of attack. If
     * the user has 2 or more buffs, increases the damage dealt by 20% and gains 2 points of
     * Confectance Index.
     *
     * V2: If the user has 3 or more buffs, this attack deal Hydro damage, and the user gains an
     * additional 1 point of Confectance Index.
     */
    skill3 ( field: MapField, target: Enemy, actor: MapUnit ) {
        let multiplier = 1.3

        if ( actor && actor.buffs.length >= 3 && ( target.weaknesses & Weakness.HYDRO ) ) {
            // this.confectance++
        }

        if ( actor && actor.buffs.length >= 2 ) {
            // this.confectance += 2
            multiplier += 0.2

            if ( this.fortifications >= 2 && target.weaknesses & Weakness.HYDRO ) multiplier += 0.1
        }

        return this.doAttack( field, target, multiplier )
    }

    /**
     * Select 1 enemy target within 8 tiles and deal Hydro damage equal to 180% of attack to it.
     *
     * V3: If under the effect of 3 or more buffs, increase damage dealt by 15% and reduce this
     * skill's cooldown by 2 turns.
     *
     * V6: If this kills the target, gain 1 point of Confectance Index. (Note: This is handled
     * in handleEvent.)
     */
    skill4 ( field: MapField, target: Enemy, actor: MapUnit ) {
        let multiplier = 1.8

        if ( this.fortifications >= 3 && actor && actor.buffs.length >= 3 ) {
            multiplier += 0.15
        }

        if ( target.weaknesses & Weakness.HYDRO ) multiplier += 0.1

        return this.doAttack( field, target, multiplier )
    }
}

export default new DollTololo
