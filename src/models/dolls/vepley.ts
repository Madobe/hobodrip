import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { HeartSeeker } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollVepley extends Doll {
    readonly attack = 696
    readonly best_set = "Ballistic Boost"
    readonly defense = 528
    readonly health = 1851
    readonly img_path = "/src/assets/images/dolls/Vepley.png"
    readonly movement = 8
    readonly name = "Vepley"
    readonly rarity = DollRarity.ELITE
    readonly stability = 8
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.VANGUARD
    readonly weaknesses = Weakness.AMMO_HEAVY & Weakness.HYDRO
    readonly weaponType = WeaponTypes.SG

    constructor() {
        super( { weapon: HeartSeeker } )
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
            case 6: stats.attack += 53; stats.health += 140
            case 5: stats.attack += 46; stats.defense += 40
            case 4: stats.health += 107; stats.attack_boost += 5
            case 3: stats.attack += 39; stats.defense += 30
            case 2: stats.health += 78; stats.attack_boost += 5
            case 1: stats.attack += 32; stats.defense += 22
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

export default new DollVepley
