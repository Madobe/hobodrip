export class Weapon {
    attack = 0
    attachments = []

    constructor() {
    }

    get getBaseAttack () {
        return this.attack
    }

    get getAttackBoost () {
        return this.attachments
    }
}
