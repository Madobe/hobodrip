import { DefaultEnemy, type Enemy } from "../enemy";
import { EmptyMapField, type MapField } from "../map-field";

import { Doll } from "../doll";
import { Aglaea } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollAndoris extends Doll {
    readonly attack = 591
    readonly best_set = "Allay Support"
    readonly defense = 642
    readonly health = 2288
    readonly img_path = "/src/assets/images/dolls/Andoris.png"
    readonly movement = 6
    readonly name = "Andoris"
    readonly rarity = DollRarity.ELITE
    readonly stability = 12
    readonly stat_order = [ "Health Boost", "Defense Boost", "Health", "Defense" ]
    readonly type = DollType.BULWARK
    readonly weaknesses = Weakness.AMMO_HEAVY & Weakness.CORROSION
    readonly weaponType = WeaponTypes.AR

    constructor() {
        super( { weapon: Aglaea } )
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

    get attachmentValue () {
        return this.skill1( EmptyMapField, DefaultEnemy )
    }

    get neuralHelixStats () {
        const stats = this.defaultStatsObject

        switch ( this.neural_helix ) {
            default:
            case 6: stats.attack += 45; stats.health += 173
            case 5: stats.attack += 39; stats.defense += 49
            case 4: stats.health += 133; stats.health_boost += 5
            case 3: stats.attack += 33; stats.defense += 37
            case 2: stats.health += 96; stats.health_boost += 5
            case 1: stats.attack += 28; stats.defense += 27
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
    skill2 () {
        return 0
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

export default new DollAndoris
