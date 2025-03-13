import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { Faithpiercer } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollSpringfield extends Doll {
    readonly attack = 696
    readonly best_set = "Hydro Boost"
    readonly defense = 585
    readonly health = 1909
    readonly img_path = "/src/assets/images/dolls/Springfield.png"
    readonly name = "Springfield"
    readonly rarity = DollRarity.ELITE
    readonly stat_order = [ "Health Boost", "Health", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.SUPPORT
    readonly weaknesses = Weakness.AMMO_LIGHT & Weakness.ELECTRIC
    readonly weaponType = WeaponTypes.RF

    constructor() {
        super( { weapon: Faithpiercer } )
    }

    get affinityStats () {
        const stats = this.defaultStatsObject

        switch ( this.affinity ) {
            default:
            case 5:
            case 4:
            case 3:
            case 2:
            case 1:
            case 0:
                break
        }

        return stats
    }

    /**
     * This is calculated off her ultimate, but with some of the scaling removed.
     */
    get attachmentValue () {
        return this.totalHealth * ( this.totalCritDmg / 100 ) / ( 100 / this.totalCritRate )
    }

    get neuralHelixStats () {
        const stats = this.defaultStatsObject

        switch ( this.neural_helix ) {
            default:
            case 6: stats.attack += 53; stats.health += 144
            case 5: stats.attack += 46; stats.defense += 44
            case 4: stats.health += 111; stats.health_boost += 5
            case 3: stats.attack += 39; stats.defense += 34
            case 2: stats.health += 80; stats.health_boost += 5
            case 1: stats.attack += 32; stats.defense += 25
            case 0: break
        }

        return stats
    }

    /**
     *
     */
    skill1 ( field: MapField, target: Enemy ) {
        return this.doAttack( field, target )
    }

    /**
     *
     */
    skill2 ( field: MapField, target: Enemy ) {
        return this.doAttack( field, target )
    }

    /**
     *
     */
    skill3 ( field: MapField, target: Enemy ) {
        return this.doAttack( field, target )
    }

    /**
     *
     */
    skill4 ( field: MapField, target: Enemy ) {
        return this.doAttack( field, target )
    }
}

export default new DollSpringfield
