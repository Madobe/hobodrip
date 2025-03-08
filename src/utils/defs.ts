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
export const ATTACHMENT_TYPES = [
    "AR Muzzle",
    "AR Sight",
    "AR Foregrip",
    "AR Underbarrel",
    "Blade Edge",
    "Blade Adjuster",
    "Special Link",
    "Special Latch",
    "HG Muzzle",
    "HG Sight",
    "HG Link",
    "HG Latch",
    "SMG Muzzle",
    "SMG Sight",
    "SMG Foregrip",
    "SMG Underbarrel",
    "SG Muzzle",
    "SG Sight",
    "SG Link",
    "SG Latch",
    "MG Muzzle",
    "MG Sight",
    "MG Bipod",
    "MG Underbarrel",
    "RF Muzzle",
    "RF Sight",
    "RF Bipod",
    "RF Underbarrel",
]

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
    element?: Weakness
}
