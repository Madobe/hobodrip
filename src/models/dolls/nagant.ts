import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { NagantM1895 } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollNagant extends Doll {
    readonly attack = 609
    readonly best_set = "Phase Strike"
    readonly defense = 512
    readonly health = 1656
    readonly img_path = "/images/dolls/Nagant.png"
    readonly movement = 6
    readonly name = "Nagant"
    readonly rarity = DollRarity.STANDARD
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.BULWARK
    readonly weaknesses = Weakness.AMMO_SHOTGUN & Weakness.BURN
    readonly weaponType = WeaponTypes.HG

    constructor() {
        super( { weapon: NagantM1895 } )
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
            case 6: stats.attack += 46; stats.health += 125
            case 5: stats.attack += 40; stats.defense += 39
            case 4: stats.health += 96; stats.crit_dmg += 10
            case 3: stats.attack += 34; stats.defense += 30
            case 2: stats.health += 70; stats.attack_boost += 5
            case 1: stats.attack += 28; stats.defense += 22
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

export default new DollNagant
