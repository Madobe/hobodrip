import type { Unit } from "@/models/unit";

/**
 * Constants
 */
export enum Alliance {
    PLAYER = 1 << 1,
    ENEMY = 1 << 2,
    PLAYER_ALLY = 1 << 3,
    THIRD_PARTY = 1 << 4
}

export enum Buff {
    BURNING_ASSAULT_I
}

export enum Debuff {
    NEGATIVE_CHARGE
}

export enum DollRarity {
    STANDARD,
    ELITE
}

export enum DollType {
    BULWARK = 1,
    SENTINEL = 2,
    SUPPORT = 4,
    VANGUARD = 8
}

export enum MapEvent {
    DOLL_ATTACK = 1 << 1,
    KILLED_TARGET = 1 << 2,
    START_TURN = 1 << 3,
    TARGETED_ATTACK = 1 << 4
}

export enum Weakness {
    NONE = 0,
    AMMO_LIGHT = 1 << 1,
    AMMO_MEDIUM = 1 << 2,
    AMMO_HEAVY = 1 << 3,
    AMMO_SHOTGUN = 1 << 4,
    AMMO_MELEE = 1 << 5,
    BURN = 1 << 6,
    CORROSION = 1 << 7,
    ELECTRIC = 1 << 8,
    FREEZE = 1 << 9,
    HYDRO = 1 << 10
}

export enum WeaponTypes {
    AR,
    BLD,
    HG,
    MG,
    SG,
    SMG,
    RF
}

/**
 * The sets that an attachment can be part of.
 */
export const ATTACHMENT_SETS = [
    "Allay Support",
    "Ballistic Boost",
    "Burn Boost",
    "Corrosion Boost",
    "Double Strategy",
    "Electric Boost",
    "Emergency Repair",
    "Freeze Boost",
    "Hydro Boost",
    "Phase Resonance",
    "Phase Strike",
    "Ultimate Pursuit",
]

/**
 * The types of attachments that are possible.
 */
export const ATTACHMENT_TYPES: {
    [ key: string ]: {
        slot: number,
        type: WeaponTypes
    }
} = {
    "AR Muzzle": { slot: 0, type: WeaponTypes.AR },
    "AR Sight": { slot: 1, type: WeaponTypes.AR },
    "AR Foregrip": { slot: 2, type: WeaponTypes.AR },
    "AR Underbarrel": { slot: 3, type: WeaponTypes.AR },
    "Blade Edge": { slot: 0, type: WeaponTypes.BLD },
    "Blade Adjuster": { slot: 1, type: WeaponTypes.BLD },
    "Special Link": { slot: 2, type: WeaponTypes.BLD },
    "Special Latch": { slot: 3, type: WeaponTypes.BLD },
    "HG Muzzle": { slot: 0, type: WeaponTypes.HG },
    "HG Sight": { slot: 1, type: WeaponTypes.HG },
    "HG Link": { slot: 2, type: WeaponTypes.HG },
    "HG Latch": { slot: 3, type: WeaponTypes.HG },
    "MG Muzzle": { slot: 0, type: WeaponTypes.MG },
    "MG Sight": { slot: 1, type: WeaponTypes.MG },
    "MG Bipod": { slot: 2, type: WeaponTypes.MG },
    "MG Underbarrel": { slot: 3, type: WeaponTypes.MG },
    "SG Muzzle": { slot: 0, type: WeaponTypes.SG },
    "SG Sight": { slot: 1, type: WeaponTypes.SG },
    "SG Link": { slot: 2, type: WeaponTypes.SG },
    "SG Latch": { slot: 3, type: WeaponTypes.SG },
    "SMG Muzzle": { slot: 0, type: WeaponTypes.SMG },
    "SMG Sight": { slot: 1, type: WeaponTypes.SMG },
    "SMG Foregrip": { slot: 2, type: WeaponTypes.SMG },
    "SMG Underbarrel": { slot: 3, type: WeaponTypes.SMG },
    "RF Muzzle": { slot: 0, type: WeaponTypes.RF },
    "RF Sight": { slot: 1, type: WeaponTypes.RF },
    "RF Bipod": { slot: 2, type: WeaponTypes.RF },
    "RF Underbarrel": { slot: 3, type: WeaponTypes.RF },
}


/**
 * The stats that an attachment can have.
 */
export const AVAILABLE_STATS = [
    "Attack",
    "Attack Boost",
    "Crit Rate",
    "Crit DMG",
    "Defense",
    "Defense Boost",
    "Health",
    "Health Boost",
]

/**
 * Interfaces
 */
export interface MapEventArgs {
    actor: Unit,
    confectance: number,
    element?: Weakness
}
