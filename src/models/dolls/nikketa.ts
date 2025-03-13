import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { SilverwingDreamwarden } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollNikketa extends Doll {
    readonly attack = 836
    readonly best_set = ""
    readonly defense = 519
    readonly health = 1859
    readonly img_path = "/hobodrip/images/dolls/Nikketa.png"
    readonly name = "Nikketa"
    readonly rarity = DollRarity.ELITE
    readonly stability = 9
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.SENTINEL
    readonly weaknesses = Weakness.AMMO_LIGHT & Weakness.ELECTRIC
    readonly weaponType = WeaponTypes.RF

    constructor() {
        super( { weapon: SilverwingDreamwarden } )
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
            case 6: stats.attack += 64; stats.health += 140
            case 5: stats.attack += 55; stats.defense += 39
            case 4: stats.health += 108; stats.attack_boost += 10
            case 3: stats.attack += 47; stats.defense += 30
            case 2: stats.health += 78; stats.attack_boost += 5
            case 1: stats.attack += 39; stats.defense += 22
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

export default new DollNikketa
