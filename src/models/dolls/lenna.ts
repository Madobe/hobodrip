import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { YoungLion } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollLenna extends Doll {
    readonly attack = 689
    readonly best_set = "Electric Boost"
    readonly defense = 550
    readonly health = 2081
    readonly img_path = "/images/dolls/Lenna.png"
    readonly movement = 7
    readonly name = "Lenna"
    readonly rarity = DollRarity.ELITE
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.SUPPORT
    readonly weaknesses = Weakness.AMMO_MEDIUM & Weakness.FREEZE
    readonly weaponType = WeaponTypes.SMG

    constructor() {
        super( { weapon: YoungLion } )
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
            case 6: stats.attack += 51; stats.health += 159
            case 5: stats.attack += 45; stats.defense += 42
            case 4: stats.health += 122; stats.health_boost += 5
            case 3: stats.attack += 38; stats.defense += 32
            case 2: stats.health += 89; stats.attack_boost += 5
            case 1: stats.attack += 31; stats.defense += 23
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

export default new DollLenna
