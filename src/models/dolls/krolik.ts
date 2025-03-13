import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { Hare } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollKrolik extends Doll {
    readonly attack = 618
    readonly best_set = "Phase Strike"
    readonly defense = 463
    readonly health = 1397
    readonly img_path = "/hobodrip/images/dolls/Krolik.png"
    readonly movement = 9
    readonly name = "Krolik"
    readonly rarity = DollRarity.STANDARD
    readonly stability = 8
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.VANGUARD
    readonly weaknesses = Weakness.AMMO_SHOTGUN & Weakness.CORROSION
    readonly weaponType = WeaponTypes.BLD

    constructor() {
        super( { weapon: Hare } )
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
            case 6: stats.attack += 47; stats.health += 106
            case 5: stats.attack += 41; stats.defense += 35
            case 4: stats.health += 81; stats.crit_dmg += 10
            case 3: stats.attack += 35; stats.defense += 27
            case 2: stats.health += 59; stats.attack_boost += 5
            case 1: stats.attack += 29; stats.defense += 19
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

export default new DollKrolik
