import type { Enemy } from "@/types/attachments"

import { Doll } from "../doll";
import { Planeta } from "../weapon";

class DollTololo extends Doll {
    attack = 836
    best_set = "Hydro Boost"
    default_weapon = "Planeta"
    defense = 528
    health = 1819
    img_path = "/src/assets/images/dolls/Tololo.png"
    name = "Tololo"
    rarity = 1
    stat_order = [ "Attack Boost", "Attack", "Crit Rate", "Crit DMG" ]
    type = 0

    constructor() {
        super( { weapon: Planeta } )
    }

    get affinityStats () {
        const stats = this.defaultStatsObject

        switch ( this.affinity ) {
            default:
            case 5:
                stats.attack += 54
                stats.health += 112
            case 4:
                stats.attack += 42
                stats.defense += 76
            case 3:
                stats.health += 90
                stats.defense += 32
            case 2:
                stats.attack += 24
                stats.health += 78
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
            case 6: stats.attack += 64; stats.health += 137
            case 5: stats.attack += 55; stats.defense += 40
            case 4: stats.health += 105; stats.crit_dmg += 10
            case 3: stats.attack += 47; stats.defense += 30
            case 2: stats.health += 77; stats.attack_boost += 5
            case 1: stats.attack += 39; stats.defense += 22
            case 0: break
        }

        return stats
    }

    passive (): void { }

    skill1 ( target: Enemy ): void {
        console.log( target )
    }

    skill2 ( target: Enemy ): void {
        console.log( target )
    }

    skill3 ( target: Enemy ): void {
        console.log( target )
    }

    skill4 ( target: Enemy ): void {
        console.log( target )
    }
}

export const Tololo = new DollTololo
