import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { Daydream } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollMechty extends Doll {
    readonly attack = 723
    readonly best_set = "Corrosion Boost"
    readonly defense = 577
    readonly health = 1876
    readonly img_path = "/src/assets/images/dolls/Mechty.png"
    readonly movement = 6
    readonly name = "Mechty"
    readonly rarity = DollRarity.ELITE
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.SUPPORT
    readonly weaknesses = Weakness.AMMO_HEAVY & Weakness.HYDRO
    readonly weaponType = WeaponTypes.AR

    constructor() {
        super( { weapon: Daydream } )
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
            case 6: stats.attack += 55; stats.health += 142
            case 5: stats.attack += 48; stats.defense += 44
            case 4: stats.health += 109; stats.health_boost += 5
            case 3: stats.attack += 41; stats.defense += 33
            case 2: stats.health += 79; stats.attack_boost += 5
            case 1: stats.attack += 34; stats.defense += 24
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

export default new DollMechty
