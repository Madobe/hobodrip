import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { UnspokenCalling } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollSuomi extends Doll {
    readonly attack = 672
    readonly best_set = "Phase Strike"
    readonly defense = 617
    readonly health = 1955
    readonly img_path = "/src/assets/images/dolls/Suomi.png"
    readonly movement = 6
    readonly name = "Suomi"
    readonly rarity = DollRarity.ELITE
    readonly stat_order = [ "Attack Boost", "Attack", "Health Boost", "Defense Boost" ]
    readonly type = DollType.SUPPORT
    readonly weaknesses = Weakness.AMMO_HEAVY & Weakness.CORROSION
    readonly weaponType = WeaponTypes.SMG

    constructor() {
        super( { weapon: UnspokenCalling } )
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
            case 6: stats.attack += 51; stats.health += 148
            case 5: stats.attack += 45; stats.defense += 46
            case 4: stats.health += 113; stats.health_boost += 10
            case 3: stats.attack += 38; stats.defense += 36
            case 2: stats.health += 82; stats.attack_boost += 5
            case 1: stats.attack += 31; stats.defense += 26
            case 0: break
        }

        return stats
    }

    /**
     * We weight the attack (shield strength and damage) more heavily, with a slight boost from max
     * HP.
     */
    get attachmentValue () {
        return this.totalAttack + ( 0.2 * this.totalHealth )
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

export default new DollSuomi
