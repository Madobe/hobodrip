import type { Enemy, EquippedWeapon } from "@/types/attachments"

interface DollArgs {
    neuralHelix: number
    fortifications: number
    weapon: EquippedWeapon
}

export class Doll {
    attack = 0
    cooldowns = []
    crit_dmg = 120
    crit_rate = 20
    defense = 0
    fortifications = 0
    health = 0
    name = ""
    neuralHelix = 0

    constructor( data: DollArgs ) {
        this.fortifications = data.fortifications
        this.name = this.constructor.name
        this.neuralHelix = data.neuralHelix
    }

    get totalAttack () {
        return 0
    }

    get totalDefense () {
        return 0
    }

    get totalHealth () {
        return 0
    }

    get totalCritRate () {
        return 0
    }

    get totalCritDmg () {
        return 0
    }

    calculateDamage ( target: Enemy ) {
        console.log( target )
    }
}
