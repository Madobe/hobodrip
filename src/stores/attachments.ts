import { defineStore } from "pinia"

import type { Attachment, AttachmentType, Stat } from "@/types/attachments"

export const useAttachmentsStore = defineStore( "attachments", {
    state: () => ( {
        data: {
            0: {
                // AR
                0: [] as Attachment[], // Muzzle
                1: [] as Attachment[], // Sight
                2: [] as Attachment[], // Foregrip
                3: [] as Attachment[], // Underbarrel
            },
            1: {
                // BLD
                0: [] as Attachment[],
                1: [] as Attachment[],
                2: [] as Attachment[],
                3: [] as Attachment[],
            },
            2: {
                // HG
                0: [] as Attachment[],
                1: [] as Attachment[],
                2: [] as Attachment[],
                3: [] as Attachment[],
            },
            3: {
                // MG
                0: [] as Attachment[],
                1: [] as Attachment[],
                2: [] as Attachment[],
                3: [] as Attachment[],
            },
            4: {
                // SG
                0: [] as Attachment[],
                1: [] as Attachment[],
                2: [] as Attachment[],
                3: [] as Attachment[],
            },
            5: {
                // SMG
                0: [] as Attachment[],
                1: [] as Attachment[],
                2: [] as Attachment[],
                3: [] as Attachment[],
            },
            6: {
                // RF
                0: [] as Attachment[],
                1: [] as Attachment[],
                2: [] as Attachment[],
                3: [] as Attachment[],
            },
        } as {
            [ weaponType: number ]: {
                [ slot: number ]: Attachment[]
            }
        },
    } ),
    actions: {
        addAttachment (
            attachmentType: AttachmentType,
            attachmentSet: string | undefined,
            stats: Stat[]
        ) {
            this.$state.data[ attachmentType.type ][ attachmentType.slot ].push( {
                equipped: false,
                set: attachmentSet || "",
                stats,
                type: attachmentType.name || "",
            } )
        },
        resetEquipped () {
            for ( let weaponType = 0; weaponType < 7; weaponType++ ) {
                for ( let slot = 0; slot < 4; slot++ ) {
                    for ( let i = 0; i < this.data[ weaponType ][ slot ].length; i++ ) {
                        this.data[ weaponType ][ slot ][ i ].equipped = false
                    }
                }
            }
        }
    },
} )
