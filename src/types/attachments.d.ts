export interface ActiveDoll {
    info: Doll
    name: string
    neuralHelix: number
    fortifications: number
    order: number
    type: number
    weapon: EquippedWeapon
}

export interface Attachment {
    equipped: boolean
    name: string
    set: string
    stats: Stat[]
    type: number
}

export interface AttachmentType {
    name?: string
    slot: number
    type: number
}

export interface Doll {
    attack: number
    best_set: string
    crit_dmg: number
    crit_rate: number
    defaultWeapon: string
    defense: number
    health: number
    img_path: string
    rarity: number
    stat_order: string[]
    type: number
}

export interface Enemy {
    defense: number
}

export interface EquippedWeapon {
    attachments: { [ key: number ]: Attachment }
    info: Weapon
    name: string
}

export interface Stat {
    stat: string
    value: number
}

export interface Weapon {
    attack: number
    attack_boost?: number
    crit_dmg?: number
    crit_rate?: number
    name: string
    type: number
    unconfirmed?: boolean
}
