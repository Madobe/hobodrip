import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { OTs14 } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollGroza extends Doll {
    readonly attack = 539
    readonly best_set = "Allay Support"
    readonly defense = 553
    readonly health = 1981
    readonly img_path = "/hobodrip/images/dolls/Groza.png"
    readonly movement = 6
    readonly name = "Groza"
    readonly rarity = DollRarity.STANDARD
    readonly stability = 12
    readonly stat_order = [ "Attack Boost", "Health Boost", "Defense Boost", "Attack" ]
    readonly type = DollType.BULWARK
    readonly weaknesses = Weakness.AMMO_HEAVY & Weakness.BURN
    readonly weaponType = WeaponTypes.AR

    constructor() {
        super( { weapon: OTs14 } )
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
            case 6: stats.attack += 41; stats.health += 150
            case 5: stats.attack += 35; stats.defense += 42
            case 4: stats.health += 115; stats.health_boost += 5
            case 3: stats.attack += 30; stats.defense += 32
            case 2: stats.health += 84; stats.health_boost += 5
            case 1: stats.attack += 25; stats.defense += 23
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

export default new DollGroza
