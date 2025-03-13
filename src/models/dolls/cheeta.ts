import { type Enemy } from "../enemy";
import { type MapField } from "../map-field";

import { Doll } from "../doll";
import { MP7H1 } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollCheeta extends Doll {
    readonly attack = 591
    readonly best_set = "Emergency Support"
    readonly defense = 494
    readonly health = 1842
    readonly img_path = "/images/dolls/Cheeta.png"
    readonly movement = 6
    readonly name = "Cheeta"
    readonly rarity = DollRarity.STANDARD
    readonly stat_order = [ "Attack Boost", "Attack", "Health Boost", "Defense Boost" ]
    readonly type = DollType.BULWARK
    readonly weaknesses = Weakness.AMMO_MEDIUM & Weakness.HYDRO
    readonly weaponType = WeaponTypes.SMG

    constructor() {
        super( { weapon: MP7H1 } )
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
            case 6: stats.attack += 45; stats.health += 139
            case 5: stats.attack += 39; stats.defense += 37
            case 4: stats.health += 107; stats.health_boost += 5
            case 3: stats.attack += 33; stats.defense += 29
            case 2: stats.health += 78; stats.attack_boost += 5
            case 1: stats.attack += 28; stats.defense += 21
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
        return this.doAttack( field, target, 1.3 )
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
    skill4 () {
        return 0
    }
}

export default new DollCheeta
