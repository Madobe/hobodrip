import type {
    Attachment,
    AttachmentType,
    Doll,
    Weapon,
} from "@/types/attachments"
import _weapons from "@/assets/data/weapon-db.json"

const weapons: { [key: string]: Weapon } = _weapons

export const WEAPON_TYPES = {
    0: "AR",
    1: "BLD",
    2: "HG",
    3: "MG",
    4: "SG",
    5: "SMG",
    6: "RF",
}

export function calculateCombatEfficiency(
    doll: Doll,
    neuralHelix: number,
    fortifications: number,
    attachments: Attachment[],
) {
    // Because neural helix boosts are consistent for ATK/HP/DEF, we can just multiple the final
    // value from them by the correct multiplier
    const helixMultiplier =
        neuralHelix < 2 ? 1.03
        : neuralHelix < 4 ? 1.06
        : 1.12
    const atk = doll.attack
    const hp = doll.health
    const def = doll.defense
    const cr = doll.crit_rate / 100
    const cd = doll.crit_dmg / 100

    // The number of fixed keys is assumed to be neuralHelix down to the nearest multiple of 2
    const fixedKeys = neuralHelix - (neuralHelix % 2)

    // Assume it's calibrated if any of the stats on the attachment are over 5 but below 20 (to not
    // false positive on a flat stat)
    const calibrations = attachments.filter(a =>
        a.stats.some(s => s.value > 5 && s.value < 20),
    ).length

    return (
        (5 * atk + 4 * hp + 3 * def) *
        helixMultiplier *
        (0.1 * cr +
            0.2 * cd +
            0.01 * fixedKeys +
            0.01 * fortifications +
            0.008 * calibrations)
    ).toFixed(0)
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

export function getAttachmentTypes() {
    return [
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
        "MG Muzzle",
        "MG Sight",
        "MG Bipod",
        "MG Underbarrel",
        "SG Muzzle",
        "SG Sight",
        "SG Link",
        "SG Latch",
        "SMG Muzzle",
        "SMG Sight",
        "SMG Foregrip",
        "SMG Underbarrel",
        "RF Muzzle",
        "RF Sight",
        "RF Bipod",
        "RF Underbarrel",
    ]
}

/**
 * Provides the stats that an attachment can have.
 * @returns The stats which can be on an attachment.
 */
export const getPossibleStats = () => [
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
                [weapons[weapon].type]: weapons[weapon],
            })
        },
        {} as {
            [key: number]: Weapon
        },
    )
}
