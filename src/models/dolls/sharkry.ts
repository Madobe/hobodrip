import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { Planeta } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollSharkry extends Doll {
    readonly attack = 679
    readonly best_set = "Phase Strike"
    readonly defense = 463
    readonly health = 1706
    readonly img_path = "/images/dolls/Sharkry.png"
    readonly name = "Sharkry"
    readonly rarity = DollRarity.STANDARD
    readonly stability = 9
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.SENTINEL
    readonly weaknesses = Weakness.AMMO_MEDIUM & Weakness.CORROSION
    readonly weaponType = WeaponTypes.AR

    constructor() {
        super( { weapon: Planeta } )
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
            case 6: stats.attack += 52; stats.health += 129
            case 5: stats.attack += 45; stats.defense += 35
            case 4: stats.health += 99; stats.crit_dmg += 10
            case 3: stats.attack += 38; stats.defense += 27
            case 2: stats.health += 72; stats.attack_boost += 5
            case 1: stats.attack += 32; stats.defense += 19
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

export default new DollSharkry
