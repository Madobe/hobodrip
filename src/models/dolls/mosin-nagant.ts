import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { Samosek } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollMosinNagant extends Doll {
    readonly attack = 820
    readonly best_set = "Electric Boost"
    readonly defense = 528
    readonly health = 1859
    readonly img_path = "/src/assets/images/dolls/Mosin-Nagant.png"
    readonly movement = 4
    readonly name = "Mosin-Nagant"
    readonly rarity = DollRarity.ELITE
    readonly stability = 9
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.SENTINEL
    readonly weaknesses = Weakness.AMMO_LIGHT & Weakness.CORROSION
    readonly weaponType = WeaponTypes.RF

    constructor() {
        super( { weapon: Samosek } )
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
            case 6: stats.attack += 62; stats.health += 140
            case 5: stats.attack += 54; stats.defense += 40
            case 4: stats.health += 108; stats.attack_boost += 5
            case 3: stats.attack += 46; stats.defense += 30
            case 2: stats.health += 78; stats.attack_boost += 5
            case 1: stats.attack += 38; stats.defense += 22
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

export default new DollMosinNagant
