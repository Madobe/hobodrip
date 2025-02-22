export interface Attachment {
    stats: Stat[]
    type: string
}

export interface AttachmentType {
    slot: number
    type: number
}

export interface Doll {
    attack: number
    crit_dmg: number
    crit_rate: number
    defaultWeapon: string
    defense: number
    health: number
    img_path: string
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
    type: number
    unconfirmed?: boolean
}
