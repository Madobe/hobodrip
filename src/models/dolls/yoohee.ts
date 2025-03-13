import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { StarfallSpark } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollYoohee extends Doll {
    readonly attack = 757
    readonly best_set = "Allay Support"
    readonly defense = 585
    readonly health = 1851
    readonly img_path = "/src/assets/images/dolls/Yoohee.png"
    readonly name = "Yoohee"
    readonly rarity = DollRarity.ELITE
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.SUPPORT
    readonly weaknesses = Weakness.AMMO_SHOTGUN & Weakness.FREEZE
    readonly weaponType = WeaponTypes.AR

    constructor() {
        super( { weapon: StarfallSpark } )
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
            case 6: stats.attack += 58; stats.health += 140
            case 5: stats.attack += 50; stats.defense += 44
            case 4: stats.health += 107; stats.health_boost += 5
            case 3: stats.attack += 43; stats.defense += 34
            case 2: stats.health += 78; stats.attack_boost += 5
            case 1: stats.attack += 35; stats.defense += 25
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

export default new DollYoohee
