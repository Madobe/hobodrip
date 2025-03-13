import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { Stechkin } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollKsenia extends Doll {
    readonly attack = 539
    readonly best_set = "Emergency Repair"
    readonly defense = 463
    readonly health = 1842
    readonly img_path = "/src/assets/images/dolls/Ksenia.png"
    readonly movement = 6
    readonly name = "Ksenia"
    readonly rarity = DollRarity.STANDARD
    readonly stat_order = [ "Attack Boost", "Attack", "Health Boost", "Defense Boost" ]
    readonly type = DollType.SUPPORT
    readonly weaknesses = Weakness.AMMO_SHOTGUN & Weakness.BURN
    readonly weaponType = WeaponTypes.HG

    constructor() {
        super( { weapon: Stechkin } )
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
            case 6: stats.attack += 41; stats.health += 139
            case 5: stats.attack += 36; stats.defense += 35
            case 4: stats.health += 107; stats.health_boost += 5
            case 3: stats.attack += 31; stats.defense += 27
            case 2: stats.health += 78; stats.attack_boost += 5
            case 1: stats.attack += 25; stats.defense += 19
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

export default new DollKsenia
