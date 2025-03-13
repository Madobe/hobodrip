import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { Curva } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollColphne extends Doll {
    readonly attack = 515
    readonly best_set = "Emergency Repair"
    readonly defense = 503
    readonly health = 1787
    readonly img_path = "/images/dolls/Colphne.png"
    readonly movement = 7
    readonly name = "Colphne"
    readonly rarity = DollRarity.STANDARD
    readonly stat_order = [ "Attack Boost", "Attack", "Health Boost", "Defense Boost" ]
    readonly type = DollType.SUPPORT
    readonly weaknesses = Weakness.AMMO_SHOTGUN & Weakness.CORROSION
    readonly weaponType = WeaponTypes.HG

    constructor() {
        super( { weapon: Curva } )
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
            case 6: stats.attack += 39; stats.health += 135
            case 5: stats.attack += 34; stats.defense += 38
            case 4: stats.health += 103; stats.health_boost += 5
            case 3: stats.attack += 29; stats.defense += 29
            case 2: stats.health += 75; stats.attack_boost += 5
            case 1: stats.attack += 24; stats.defense += 21
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
    skill2 () {
        return 0
    }

    /**
     *
     */
    skill3 ( field: MapField, target: Enemy ) {
        return this.doAttack( field, target, 1.3 )
    }

    /**
     *
     */
    skill4 () {
        return 0
    }
}

export default new DollColphne
