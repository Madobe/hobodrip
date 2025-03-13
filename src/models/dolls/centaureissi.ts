import { type Enemy } from "../enemy";
import { type MapField } from "../map-field";

import { Doll } from "../doll";
import { MaidsRules } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollCentaureissi extends Doll {
    readonly attack = 696
    readonly best_set = "Emergency Repair"
    readonly defense = 585
    readonly health = 1893
    readonly img_path = "/hobodrip/images/dolls/Centaureissi.png"
    readonly movement = 6
    readonly name = "Centaureissi"
    readonly rarity = DollRarity.ELITE
    readonly stat_order = [ "Attack Boost", "Attack", "Health Boost", "Defense Boost" ]
    readonly type = DollType.SUPPORT
    readonly weaknesses = Weakness.AMMO_HEAVY & Weakness.HYDRO
    readonly weaponType = WeaponTypes.AR

    constructor() {
        super( { weapon: MaidsRules } )
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
            case 6: stats.attack += 53; stats.health += 143
            case 5: stats.attack += 46; stats.defense += 44
            case 4: stats.health += 110; stats.health_boost += 5
            case 3: stats.attack += 39; stats.defense += 34
            case 2: stats.health += 80; stats.attack_boost += 5
            case 1: stats.attack += 32; stats.defense += 25
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
        let multiplier = 1.3

        if ( target.weaknesses & Weakness.BURN ) multiplier += 0.1

        return this.doAttack( field, target, multiplier )
    }

    /**
     *
     */
    skill3 ( field: MapField, target: Enemy ) {
        return this.doAttack( field, target, 0.5 )
    }

    /**
     *
     */
    skill4 () {
        return 0
    }
}

export default new DollCentaureissi
