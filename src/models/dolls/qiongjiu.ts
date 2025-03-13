import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { GoldenMelody } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollQiongjiu extends Doll {
    readonly attack = 802
    readonly best_set = "Phase Strike"
    readonly defense = 528
    readonly health = 1893
    readonly img_path = "/images/dolls/Qiongjiu.png"
    readonly name = "Qiongjiu"
    readonly rarity = DollRarity.ELITE
    readonly stability = 9
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.SENTINEL
    readonly weaknesses = Weakness.AMMO_HEAVY & Weakness.FREEZE
    readonly weaponType = WeaponTypes.AR

    constructor() {
        super( { weapon: GoldenMelody } )
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
            case 6: stats.attack += 61; stats.health += 143
            case 5: stats.attack += 53; stats.defense += 40
            case 4: stats.health += 110; stats.attack_boost += 5
            case 3: stats.attack += 45; stats.defense += 30
            case 2: stats.health += 80; stats.attack_boost += 5
            case 1: stats.attack += 37; stats.defense += 22
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

export default new DollQiongjiu
