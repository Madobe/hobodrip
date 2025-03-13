import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { Nemesis } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollNemesis extends Doll {
    readonly attack = 703
    readonly best_set = "Phase Strike"
    readonly defense = 463
    readonly health = 1656
    readonly img_path = "/images/dolls/Nemesis.png"
    readonly movement = 4
    readonly name = "Nemesis"
    readonly rarity = DollRarity.STANDARD
    readonly stability = 9
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.SENTINEL
    readonly weaknesses = Weakness.AMMO_LIGHT & Weakness.HYDRO
    readonly weaponType = WeaponTypes.RF

    constructor() {
        super( { weapon: Nemesis } )
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
            case 6: stats.attack += 53; stats.health += 125
            case 5: stats.attack += 47; stats.defense += 35
            case 4: stats.health += 96; stats.attack_boost += 5
            case 3: stats.attack += 40; stats.defense += 27
            case 2: stats.health += 70; stats.attack_boost += 5
            case 1: stats.attack += 33; stats.defense += 19
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

export default new DollNemesis
