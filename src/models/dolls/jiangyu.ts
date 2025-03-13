import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { LeapingTiger } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollJiangyu extends Doll {
    readonly attack = 802
    readonly best_set = "Electric Boost"
    readonly defense = 519
    readonly health = 1932
    readonly img_path = "/images/dolls/Jiangyu.png"
    readonly name = "Jiangyu"
    readonly rarity = DollRarity.ELITE
    readonly stability = 9
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.SENTINEL
    readonly weaknesses = Weakness.AMMO_HEAVY & Weakness.HYDRO
    readonly weaponType = WeaponTypes.AR

    constructor() {
        super( { weapon: LeapingTiger } )
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

    get neuralHelixStats () {
        const stats = this.defaultStatsObject

        switch ( this.neural_helix ) {
            default:
            case 6: stats.attack += 61; stats.health += 146
            case 5: stats.attack += 53; stats.defense += 39
            case 4: stats.health += 112; stats.attack_boost += 5
            case 3: stats.attack += 45; stats.defense += 30
            case 2: stats.health += 81; stats.attack_boost += 5
            case 1: stats.attack += 37; stats.defense += 22
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

export default new DollJiangyu
