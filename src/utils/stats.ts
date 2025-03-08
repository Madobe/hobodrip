import type { ActiveDoll, Attachment, AttachmentType } from "@/types/attachments"

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
 * Evaluates how good an attachment is for the given doll. A lower return value indicates a better
 * compatibility with the doll.
 * @param doll The doll that will be using the attachment.
 * @param attachment The attachment being evaluated.
 */
export function calculateAttachmentValue ( doll: ActiveDoll, attachment: Attachment ) {
    return attachment.stats.reduce( ( accumulator, stat ) => {
        const index = doll.info.stat_order.indexOf( stat.stat )

        if ( index === -1 ) accumulator += 4
        else accumulator += index

        return accumulator
    }, 0 )
}

/**
 * Processes the given text (could be random output from OCR) and returns the matching attachment
 * type number.
 * @returns The attachment type number, or -1 if no matches could be made.
 */
export function getAttachmentTypeFromText ( text: string ) {
    const attachmentTypes: {
        [ type: string ]: AttachmentType
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

    for ( const type in attachmentTypes ) {
        if ( text.includes( type ) ) {
            return Object.assign( attachmentTypes[ type ], {
                name: type
            } )
        }
    }

    return -1
}
