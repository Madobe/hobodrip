import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { Scylla } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollKlukai extends Doll {
    readonly attack = 827
    readonly best_set = "Corrosion Boost"
    readonly defense = 504
    readonly health = 1893
    readonly img_path = "/hobodrip/images/dolls/Klukai.png"
    readonly movement = 6
    readonly name = "Klukai"
    readonly rarity = DollRarity.ELITE
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.SENTINEL
    readonly weaknesses = Weakness.AMMO_SHOTGUN & Weakness.ELECTRIC
    readonly weaponType = WeaponTypes.AR

    constructor() {
        super( { weapon: Scylla } )
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
            case 6: stats.attack += 63; stats.health += 143
            case 5: stats.attack += 55; stats.defense += 38
            case 4: stats.health += 110; stats.attack_boost += 5
            case 3: stats.attack += 47; stats.defense += 29
            case 2: stats.health += 80; stats.attack_boost += 5
            case 1: stats.attack += 39; stats.defense += 21
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

export default new DollKlukai
