import { defineStore } from "pinia"

import type { Attachment, AttachmentType, Stat } from "@/types/attachments"
import { ATTACHMENT_TYPES } from "@/utils/stats"

export const useAttachmentsStore = defineStore("attachments", {
    state: () => ({
        data: [
            // Numbering per category can be found in @/utils/stats.ts
            [
                // AR
                [], // Muzzle
                [], // Sight
                [], // Foregrip
                [], // Underbarrel
            ],
            [[], [], [], []], // BLD
            [[], [], [], []], // HG
            [[], [], [], []], // MG
            [[], [], [], []], // SG
            [[], [], [], []], // SMG
            [[], [], [], []], // RF
        ] as Attachment[][][],
    }),
    actions: {
        addAttachment(
            attachmentType: AttachmentType,
            attachmentSet: string | undefined,
            stats: Stat[]
        ) {
            this.$state.data[attachmentType.type][attachmentType.slot].push({
                set: attachmentSet || "",
                stats,
                type: ATTACHMENT_TYPES[attachmentType.type],
            })
        },
    },
})
