import { type Enemy } from "../enemy";
import { type MapField } from "../map-field";

import { Doll } from "../doll";
import { ForestFaerie } from "../weapon";
import { Debuff, DollRarity, DollType, Weakness, WeaponTypes } from "@/utils/defs";

class DollBelka extends Doll {
    readonly attack = 757
    readonly best_set = "Electric Boost"
    readonly defense = 528
    readonly health = 1770
    readonly img_path = "/src/assets/images/dolls/Belka.png"
    readonly movement = 9
    readonly name = "Belka"
    readonly rarity = DollRarity.ELITE
    readonly stability = 8
    readonly stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    readonly type = DollType.VANGUARD
    readonly weaknesses = Weakness.AMMO_SHOTGUN & Weakness.FREEZE
    readonly weaponType = WeaponTypes.AR

    constructor() {
        super( { weapon: ForestFaerie } )
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
            case 6: stats.attack += 58; stats.health += 133
            case 5: stats.attack += 50; stats.defense += 40
            case 4: stats.health += 102; stats.attack_boost += 5
            case 3: stats.attack += 43; stats.defense += 30
            case 2: stats.health += 74; stats.attack_boost += 5
            case 1: stats.attack += 35; stats.defense += 22
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
        const added = Math.min( 5, field.getUnitsWithDebuff( Debuff.NEGATIVE_CHARGE ) ) * 0.03
        return this.doAttack( field, target, 1.3 + added )
    }

    /**
     *
     */
    skill3 ( field: MapField, target: Enemy ) {
        let multiplier = 1.3

        if ( target.weaknesses & Weakness.ELECTRIC ) multiplier += 0.1

        // Just assume she moves her full range for now
        multiplier += 0.45

        return this.doAttack( field, target, multiplier )
    }

    /**
     *
     */
    skill4 ( field: MapField, target: Enemy ) {
        let multiplier = 1.6

        if ( target.weaknesses & Weakness.ELECTRIC ) multiplier += 0.1

        // Just assume she moves her full range for now
        multiplier += 0.45

        return this.doAttack( field, target, multiplier )
    }
}

export default new DollBelka
