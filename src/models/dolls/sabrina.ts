import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { Mezzaluna } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollSabrina extends Doll {
    readonly attack = 609
    readonly best_set = "Phase Strike"
    readonly defense = 642
    readonly health = 2249
    readonly img_path = "/hobodrip/images/dolls/Sabrina.png"
    readonly movement = 6
    readonly name = "Sabrina"
    readonly rarity = DollRarity.ELITE
    readonly stability = 12
    readonly stat_order = [ "Attack Boost", "Defense Boost", "Health Boost", "Attack" ]
    readonly type = DollType.BULWARK
    readonly weaknesses = Weakness.AMMO_HEAVY & Weakness.ELECTRIC
    readonly weaponType = WeaponTypes.SG

    constructor() {
        super( { weapon: Mezzaluna } )
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
            case 6: stats.attack += 46; stats.health += 169
            case 5: stats.attack += 40; stats.defense += 49
            case 4: stats.health += 130; stats.health_boost += 5
            case 3: stats.attack += 34; stats.defense += 37
            case 2: stats.health += 95; stats.health_boost += 5
            case 1: stats.attack += 28; stats.defense += 27
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

export default new DollSabrina
