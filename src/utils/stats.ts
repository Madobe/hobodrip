import type { ActiveDoll, AttachmentType, Weapon } from "@/types/attachments"
import _weapons from "@/assets/data/weapon-db.json"

const weapons: { [key: string]: Weapon } = _weapons

// =================================================================================================
// = Internal only
// =================================================================================================

/**
 * Determines what bracket of ATK/DEF/HP multiplier the doll is in based on its neural helix count.
 * @param doll The doll the calculation is for.
 */
function getHelixActivationMultiplier(doll: ActiveDoll) {
    if (doll.neuralHelix >= 2 && doll.neuralHelix < 4) return 0.03
    else if (doll.neuralHelix >= 4 && doll.neuralHelix < 6) return 0.06
    else if (doll.neuralHelix === 6) return 0.12
    else return 0
}

/**
 * Adds up every stat value the given doll has on their gear of the given stat.
 * @param doll The doll the calculation is for.
 * @param type The stat type to add up.
 */
function getTotalAttachmentStat(doll: ActiveDoll, type: string) {
    return Object.values(doll.weapon.attachments).reduce(
        (totalBoost, attachment) =>
            totalBoost +
            attachment.stats.reduce(
                (accumulator, stat) =>
                    stat.stat === type ? accumulator + stat.value : accumulator,
                0
            ),
        0
    )
}

// =================================================================================================
// = Exports
// =================================================================================================

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
 * The types of weapons, keyed by their numerical representations.
 */
export const WEAPON_TYPES = {
    0: "AR",
    1: "BLD",
    2: "HG",
    3: "MG",
    4: "SG",
    5: "SMG",
    6: "RF",
}

/**
 * Calculate the CE value for the doll, given their equips.
 * @param doll The data for the doll.
 * @param neuralHelix The amount of neural helix nodes that have been unlocked.
 * @param fortifications The amount of dupes the doll has.
 * @param attachments The attachments on the doll's weapon.
 * @returns The doll's combat effectiveness value.
 */
export function calculateCombatEffectiveness(doll: ActiveDoll) {
    // Because neural helix boosts are consistent for ATK/HP/DEF, we can just multiple the final
    // value from them by the correct multiplier
    const helixMultiplier = 1 + getHelixActivationMultiplier(doll)
    const atk = doll.info.attack
    const hp = doll.info.health
    const def = doll.info.defense
    const cr = doll.info.crit_rate / 100
    const cd = doll.info.crit_dmg / 100

    // The number of fixed keys is assumed to be neuralHelix down to the nearest multiple of 2
    const fixedKeys = doll.neuralHelix - (doll.neuralHelix % 2)

    // Assume it's calibrated if any of the stats on the attachment are over 5 but below 20 (to not
    // false positive on a flat stat)
    const calibrations = Object.values(doll.weapon.attachments).filter(a =>
        a.stats.some(s => s.value > 5 && s.value < 20)
    ).length

    return (
        (5 * atk + 4 * hp + 3 * def) *
        helixMultiplier *
        (0.1 * cr +
            0.2 * cd +
            0.01 * fixedKeys +
            0.01 * doll.fortifications +
            0.008 * calibrations)
    ).toFixed(0)
}

/**
 * Calculates the average damage the attack would do on a unit with the given defense. This foregoes
 * individual attack damage for the average.
 */
export function calculateDamage(
    attack: number,
    defense: number,
    buffs: number = 0,
    crit_rate: number = 0.2,
    crit_dmg: number = 1.2,
    skill_modifier: number = 1,
    elemental_advantages: number = 0
) {
    const min_dmg =
        (attack / (1 + defense / attack)) *
        (1 + buffs) *
        (1 + 0.1 * elemental_advantages) *
        skill_modifier
    const max_dmg = min_dmg * crit_dmg

    return min_dmg + (max_dmg / min_dmg) * crit_rate
}

/**
 * Calculates the doll's final main stat value.
 * @param doll The doll the calculation is for.
 * @returns Total attack after all multipliers.
 */
export function calculateTotalStat(
    doll: ActiveDoll,
    stat: "Attack" | "Defense" | "Health"
) {
    let baseStat = doll.info[
        stat.toLowerCase() as keyof typeof doll.info
    ] as number

    if (stat === "Attack") baseStat += doll.weapon.info.attack

    const attachmentFlatBoosts = getTotalAttachmentStat(doll, stat)
    const attachmentBoosts = getTotalAttachmentStat(doll, `${stat} Boost`)
    const weaponBoost = doll.weapon.info.attack_boost || 0
    const helixMultiplier = getHelixActivationMultiplier(doll)

    return (
        (baseStat + attachmentFlatBoosts) *
        (1 + helixMultiplier + (weaponBoost + attachmentBoosts) / 100)
    )
}

/**
 *
 * @param doll
 * @param stat
 * @returns
 */
export function calculateTotalCrit(doll: ActiveDoll, stat: "Rate" | "DMG") {
    let baseStat = doll.info.crit_rate + (doll.weapon.info.crit_rate || 0)

    if (stat === "DMG")
        baseStat = doll.info.crit_dmg + (doll.weapon.info.crit_dmg || 0)

    const attachmentBoosts = getTotalAttachmentStat(doll, `Crit ${stat}`)

    return baseStat + attachmentBoosts
}

/**
 * Processes the given text (could be random output from OCR) and returns the matching attachment
 * type number.
 * @returns The attachment type number, or -1 if no matches could be made.
 */
export function getAttachmentTypeFromText(text: string) {
    const attachmentTypes: {
        [type: string]: AttachmentType
    } = {
        "AR Muzzle": { slot: 0, type: 0 },
        "AR Sight": { slot: 1, type: 0 },
        "AR Foregrip": { slot: 2, type: 0 },
        "AR Underbarrel": { slot: 3, type: 0 },
        "Blade Edge": { slot: 0, type: 1 },
        "Blade Adjuster": { slot: 1, type: 1 },
        "Special Link": { slot: 2, type: 1 },
        "Special Latch": { slot: 3, type: 1 },
        "HG Muzzle": { slot: 0, type: 2 },
        "HG Sight": { slot: 1, type: 2 },
        "HG Link": { slot: 2, type: 2 },
        "HG Latch": { slot: 3, type: 2 },
        "MG Muzzle": { slot: 0, type: 3 },
        "MG Sight": { slot: 1, type: 3 },
        "MG Bipod": { slot: 2, type: 3 },
        "MG Underbarrel": { slot: 3, type: 3 },
        "SG Muzzle": { slot: 0, type: 4 },
        "SG Sight": { slot: 1, type: 4 },
        "SG Link": { slot: 2, type: 4 },
        "SG Latch": { slot: 3, type: 4 },
        "SMG Muzzle": { slot: 0, type: 5 },
        "SMG Sight": { slot: 1, type: 5 },
        "SMG Foregrip": { slot: 2, type: 5 },
        "SMG Underbarrel": { slot: 3, type: 5 },
        "RF Muzzle": { slot: 0, type: 6 },
        "RF Sight": { slot: 1, type: 6 },
        "RF Bipod": { slot: 2, type: 6 },
        "RF Underbarrel": { slot: 3, type: 6 },
    }

    for (const type in attachmentTypes) {
        if (text.includes(type)) return attachmentTypes[type]
    }

    return -1
}

/**
 * Organizes weapons by weapon type.
 * @param [_cache] Optional argument for a smaller weapon cache. If this is not provided, the
 * function instead processes every weapon available.
 * @returns
 */
export function getWeaponsByType(_cache?: { [key: string]: Weapon }) {
    const cache = _cache || weapons

    return Object.keys(cache).reduce(
        (accumulator, weapon) => {
            return Object.assign(accumulator, {
                [weapons[weapon].type]: (
                    accumulator[weapons[weapon].type] || []
                ).concat(weapons[weapon]),
            })
        },
        {} as {
            [key: number]: Weapon[]
        }
    )
}
