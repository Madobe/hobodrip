import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { EulogisticVerse } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollDushevnaya extends Doll {
    readonly attack = 757
    readonly best_set = "Phase Strike"
    readonly defense = 585
    readonly health = 1851
    readonly img_path = "/src/assets/images/dolls/Dushevnaya.png"
    readonly movement = 6
    readonly name = "Dushevnaya"
    readonly rarity = DollRarity.ELITE
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.SUPPORT
    readonly weaknesses = Weakness.AMMO_LIGHT & Weakness.ELECTRIC
    readonly weaponType = WeaponTypes.RF

    constructor() {
        super( { weapon: EulogisticVerse } )
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
            case 6: stats.attack += 58; stats.health += 140
            case 5: stats.attack += 50; stats.defense += 44
            case 4: stats.health += 107; stats.health_boost += 5
            case 3: stats.attack += 43; stats.defense += 34
            case 2: stats.health += 76; stats.attack_boost += 5
            case 1: stats.attack += 35; stats.defense += 25
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
        return this.doAttack( field, target, 1.1 )
    }

    /**
     *
     */
    skill3 ( field: MapField, target: Enemy ) {
        return this.doAttack( field, target, 1.2 )
    }

    /**
     *
     */
    skill4 () {
        return 0
    }
}

export default new DollDushevnaya
