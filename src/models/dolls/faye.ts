import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { Hestia } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollFaye extends Doll {
    readonly attack = 731
    readonly best_set = "Ballistic Boost"
    readonly crit_dmg = 130
    readonly crit_rate = 30
    readonly defense = 528
    readonly health = 1609
    readonly img_path = "/images/dolls/Faye.png"
    readonly movement = 9
    readonly name = "Faye"
    readonly rarity = DollRarity.ELITE
    readonly stability = 8
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.VANGUARD
    readonly weaknesses = Weakness.AMMO_SHOTGUN & Weakness.HYDRO
    readonly weaponType = WeaponTypes.HG

    constructor() {
        super( { weapon: Hestia } )
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
            case 6: stats.attack += 56; stats.health += 121
            case 5: stats.attack += 48; stats.defense += 40
            case 4: stats.health += 93; stats.crit_dmg += 10
            case 3: stats.attack += 41; stats.defense += 31
            case 2: stats.health += 68; stats.attack_boost += 5
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

export default new DollFaye
