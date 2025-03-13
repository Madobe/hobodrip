import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { Unstoppable } from "../weapon";
import { DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollZhaohui extends Doll {
    readonly attack = 591
    readonly best_set = "Allay Support"
    readonly defense = 642
    readonly health = 2288
    readonly img_path = "/src/assets/images/dolls/Zhaohui.png"
    readonly name = "Zhaohui"
    readonly rarity = 1
    readonly stat_order = [ "Health Boost", "Defense Boost", "Health", "Defense" ]
    readonly type = DollType.BULWARK
    readonly weaknesses = Weakness.AMMO_HEAVY & Weakness.CORROSION
    readonly weaponType = WeaponTypes.AR

    constructor() {
        super( { weapon: Unstoppable } )
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
            case 6: stats.attack += 58; stats.health += 127
            case 5: stats.attack += 50; stats.defense += 38
            case 4: stats.health += 97; stats.crit_dmg += 10
            case 3: stats.attack += 43; stats.defense += 29
            case 2: stats.health += 71; stats.attack_boost += 5
            case 1: stats.attack += 35; stats.defense += 21
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

export default new DollZhaohui
