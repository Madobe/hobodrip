import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { ChasingLight } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollQiuhua extends Doll {
    readonly attack = 757
    readonly best_set = "Burn Boost"
    readonly crit_dmg = 130
    readonly crit_rate = 30
    readonly defense = 536
    readonly health = 1713
    readonly img_path = "/hobodrip/images/dolls/Qiuhua.png"
    readonly movement = 9
    readonly name = "Qiuhua"
    readonly rarity = DollRarity.ELITE
    readonly stability = 8
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.VANGUARD
    readonly weaknesses = Weakness.AMMO_HEAVY & Weakness.CORROSION
    readonly weaponType = WeaponTypes.SG

    constructor() {
        super( { weapon: ChasingLight } )
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
            case 6: stats.attack += 58; stats.health += 129
            case 5: stats.attack += 50; stats.defense += 41
            case 4: stats.health += 99; stats.crit_dmg += 10
            case 3: stats.attack += 43; stats.defense += 31
            case 2: stats.health += 72; stats.attack_boost += 5
            case 1: stats.attack += 35; stats.defense += 23
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

export default new DollQiuhua
