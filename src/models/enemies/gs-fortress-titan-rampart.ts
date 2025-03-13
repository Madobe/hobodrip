import { Alliance, Weakness } from "@/utils/defs";
import { Enemy } from "../enemy";

class GSFortressTitanRampart extends Enemy {
    alliance = Alliance.ENEMY
    attack = 1222
    crit_rate = 0
    defense = 4809
    health = 2404345
    size: [ number, number ] = [ 3, 3 ]
    stability = 65
    weaknesses = Weakness.AMMO_LIGHT | Weakness.AMMO_MEDIUM | Weakness.BURN | Weakness.ELECTRIC

    currentHealth = this.health
}

export default new GSFortressTitanRampart()
