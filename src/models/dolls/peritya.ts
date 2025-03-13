import type { Enemy } from "../enemy";
import type { MapField } from "../map-field";

import { Doll } from "../doll";
import { OpticalIllusion } from "../weapon";
import { DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollPeritya extends Doll {
    readonly attack = 765
    readonly best_set = "Corrosion Boost"
    readonly defense = 536
    readonly health = 1948
    readonly img_path = "/src/assets/images/dolls/Peritya.png"
    readonly name = "Peritya"
    readonly rarity = DollRarity.ELITE
    readonly stability = 9
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.SENTINEL
    readonly weaknesses = Weakness.AMMO_LIGHT & Weakness.HYDRO
    readonly weaponType = WeaponTypes.MG

    constructor() {
        super( { weapon: OpticalIllusion } )
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
            case 6: stats.attack += 58; stats.health += 147
            case 5: stats.attack += 51; stats.defense += 41
            case 4: stats.health += 113; stats.attack_boost += 5
            case 3: stats.attack += 43; stats.defense += 31
            case 2: stats.health += 82; stats.attack_boost += 5
            case 1: stats.attack += 36; stats.defense += 23
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

export default new DollPeritya
