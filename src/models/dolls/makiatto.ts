import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { BittersweetCaramel } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollMakiatto extends Doll {
    readonly attack = 844
    readonly best_set = "Freeze Boost"
    readonly defense = 504
    readonly health = 1819
    readonly img_path = "/src/assets/images/dolls/Makiatto.png"
    readonly movement = 4
    readonly name = "Makiatto"
    readonly rarity = DollRarity.ELITE
    readonly stability = 9
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.SENTINEL
    readonly weaknesses = Weakness.AMMO_LIGHT & Weakness.BURN
    readonly weaponType = WeaponTypes.RF

    constructor() {
        super( { weapon: BittersweetCaramel } )
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
            case 6: stats.attack += 64; stats.health += 137
            case 5: stats.attack += 56; stats.defense += 38
            case 4: stats.health += 105; stats.attack_boost += 5
            case 3: stats.attack += 48; stats.defense += 29
            case 2: stats.health += 77; stats.attack_boost += 5
            case 1: stats.attack += 29; stats.defense += 21
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

export default new DollMakiatto
