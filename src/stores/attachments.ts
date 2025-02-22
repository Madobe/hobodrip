import { defineStore } from "pinia"

import type { AttachmentType, Stat } from "@/types/attachments"

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
        ] as Stat[][][][],
    }),
    actions: {
        addAttachment(attachmentType: AttachmentType, stats: Stat[]) {
            this.$state.data[attachmentType.type][attachmentType.slot].push(
                stats,
            )
        },
    },
})
