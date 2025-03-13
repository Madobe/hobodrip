import { type Enemy } from "../enemy";
import { type MapField } from "../map-field";

import { Doll } from "../doll";
import { HeavyStrings } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollDaiyan extends Doll {
    readonly attack = 722
    readonly best_set = "Ballistic Boost"
    readonly crit_rate = 30
    readonly defense = 504
    readonly health = 1616
    readonly img_path = "/src/assets/images/dolls/Daiyan.png"
    readonly movement = 9
    readonly name = "Daiyan"
    readonly rarity = DollRarity.ELITE
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.VANGUARD
    readonly weaknesses = Weakness.AMMO_MEDIUM & Weakness.BURN
    readonly weaponType = WeaponTypes.AR

    constructor() {
        super( { weapon: HeavyStrings } )
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
            case 6: stats.attack += 55; stats.health += 122
            case 5: stats.attack += 48; stats.defense += 38
            case 4: stats.health += 94; stats.crit_dmg += 10
            case 3: stats.attack += 41; stats.defense += 29
            case 2: stats.health += 68; stats.attack_boost += 5
            case 1: stats.attack += 34; stats.defense += 21
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
        return this.doAttack( field, target, 1.5 )
    }

    /**
     *
     */
    skill3 () {
        return 0
    }

    /**
     *
     */
    skill4 ( field: MapField, target: Enemy ) {
        return this.doAttack( field, target, 1.9 )
    }
}

export default new DollDaiyan
