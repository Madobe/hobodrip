import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { EchoesOfSorrow } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollVector extends Doll {
    readonly attack = 748
    readonly best_set = "Burn Boost"
    readonly defense = 569
    readonly health = 1819
    readonly img_path = "/src/assets/images/dolls/Vector.png"
    readonly movement = 6
    readonly name = "Vector"
    readonly rarity = DollRarity.ELITE
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.SUPPORT
    readonly weaknesses = Weakness.AMMO_MEDIUM & Weakness.HYDRO
    readonly weaponType = WeaponTypes.SMG

    constructor() {
        super( { weapon: EchoesOfSorrow } )
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
            case 6: stats.attack += 57; stats.health += 137
            case 5: stats.attack += 49; stats.defense += 43
            case 4: stats.health += 105; stats.health_boost += 5
            case 3: stats.attack += 42; stats.defense += 33
            case 2: stats.health += 77; stats.attack_boost += 5
            case 1: stats.attack += 35; stats.defense += 24
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

export default new DollVector
