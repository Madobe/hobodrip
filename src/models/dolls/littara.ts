import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { ModelARM } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollLittara extends Doll {
    readonly attack = 670
    readonly best_set = "Ballistic Boost"
    readonly defense = 487
    readonly health = 1656
    readonly img_path = "/src/assets/images/dolls/Littara.png"
    readonly name = "Littara"
    readonly rarity = DollRarity.STANDARD
    readonly stability = 9
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.SENTINEL
    readonly weaknesses = Weakness.AMMO_LIGHT & Weakness.BURN
    readonly weaponType = WeaponTypes.MG

    constructor() {
        super( { weapon: ModelARM } )
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
            case 6: stats.attack += 51; stats.health += 125
            case 5: stats.attack += 44; stats.defense += 36
            case 4: stats.health += 96; stats.attack_boost += 5
            case 3: stats.attack += 38; stats.defense += 28
            case 2: stats.health += 70; stats.attack_boost += 5
            case 1: stats.attack += 31; stats.defense += 20
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

export default new DollLittara
