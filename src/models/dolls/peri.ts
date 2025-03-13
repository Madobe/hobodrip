import { type Enemy } from "../enemy";
import { type MapField } from "../map-field";

import { Doll } from "../doll";
import { Emerita } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollPeri extends Doll {
    readonly attack = 696
    readonly best_set = "Burn Boost"
    readonly defense = 560
    readonly health = 2191
    readonly img_path = "/hobodrip/images/dolls/Peri.png"
    readonly movement = 6
    readonly name = "Peri"
    readonly rarity = DollRarity.ELITE
    readonly stability = 12
    readonly stat_order = [ "Health Boost", "Health", "Attack Boost", "Crit DMG" ]
    readonly type = DollType.BULWARK
    readonly weaknesses = Weakness.AMMO_MEDIUM & Weakness.FREEZE
    readonly weaponType = WeaponTypes.SMG

    constructor() {
        super( { weapon: Emerita } )
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
        return this.totalHealth
    }


    get neuralHelixStats () {
        const stats = this.defaultStatsObject

        switch ( this.neural_helix ) {
            default:
            case 6: stats.attack += 53; stats.health += 165
            case 5: stats.attack += 46; stats.defense += 42
            case 4: stats.health += 127; stats.health_boost += 5
            case 3: stats.attack += 39; stats.defense += 33
            case 2: stats.health += 92; stats.health_boost += 5
            case 1: stats.attack += 32; stats.defense += 24
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

export default new DollPeri
