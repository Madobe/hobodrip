import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { M1Super90 } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollLotta extends Doll {
    readonly attack = 696
    readonly best_set = "Freeze Boost"
    readonly defense = 487
    readonly health = 1599
    readonly img_path = "/hobodrip/images/dolls/Lotta.png"
    readonly name = "Lotta"
    readonly rarity = DollRarity.STANDARD
    readonly stability = 9
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.SENTINEL
    readonly weaknesses = Weakness.AMMO_MEDIUM & Weakness.BURN
    readonly weaponType = WeaponTypes.SG

    constructor() {
        super( { weapon: M1Super90 } )
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
            case 6: stats.attack += 53; stats.health += 121
            case 5: stats.attack += 46; stats.defense += 37
            case 4: stats.health += 93; stats.attack_boost += 5
            case 3: stats.attack += 39; stats.defense += 28
            case 2: stats.health += 67; stats.attack_boost += 5
            case 1: stats.attack += 32; stats.defense += 21
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

export default new DollLotta
