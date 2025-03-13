import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { Rectrix } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollUllrid extends Doll {
    readonly attack = 740
    readonly best_set = "Ballistic Boost"
    readonly crit_dmg = 130
    readonly crit_rate = 40
    readonly defense = 528
    readonly health = 1519
    readonly img_path = "/hobodrip/images/dolls/Ullrid.png"
    readonly movement = 9
    readonly name = "Ullrid"
    readonly rarity = DollRarity.ELITE
    readonly stability = 8
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.VANGUARD
    readonly weaknesses = Weakness.AMMO_HEAVY & Weakness.FREEZE
    readonly weaponType = WeaponTypes.BLD

    constructor() {
        super( { weapon: Rectrix } )
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
            case 6: stats.attack += 56; stats.health += 115
            case 5: stats.attack += 49; stats.defense += 40
            case 4: stats.health += 88; stats.crit_dmg += 10
            case 3: stats.attack += 42; stats.defense += 30
            case 2: stats.health += 64; stats.crit_rate += 10
            case 1: stats.attack += 34; stats.defense += 22
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

export default new DollUllrid
