import { defineStore } from "pinia"

import type { Attachment, AttachmentType, Stat } from "@/types/attachments"

const LOCAL_STORAGE_KEY = "hobodrip.attachments"

interface AttachmentStoreInterface {
    [ weaponType: number ]: {
        [ slot: number ]: Attachment[]
    }
}

export const useAttachmentsStore = defineStore( "attachments", {
    state: () => ( {
        data: localStorage.getItem( LOCAL_STORAGE_KEY ) ?
            JSON.parse( localStorage.getItem( LOCAL_STORAGE_KEY ) ?? "" ) as AttachmentStoreInterface :
            {
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
            } as AttachmentStoreInterface
    } ),
    actions: {
        addAttachment (
            attachmentType: AttachmentType,
            attachmentSet: string | undefined,
            stats: Stat[]
        ) {
            this.$state.data[ attachmentType.type ][ attachmentType.slot ].push( {
                equipped: false,
                name: attachmentType.name ?? "",
                set: attachmentSet ?? "",
                stats: stats.filter( stat => !!stat.stat ),
                type: attachmentType.type
            } )
            this.saveStore()
        },
        resetEquipped () {
            for ( let weaponType = 0; weaponType < 7; weaponType++ ) {
                for ( let slot = 0; slot < 4; slot++ ) {
                    for ( let i = 0; i < this.data[ weaponType ][ slot ].length; i++ ) {
                        this.data[ weaponType ][ slot ][ i ].equipped = false
                    }
                }
            }
            this.saveStore()
        },
        saveStore () {
            const resetVersion = Object.assign( {}, this.data )

            Object.keys( resetVersion ).forEach( _key => {
                const key = parseInt( _key )
                Object.keys( resetVersion[ key ] ).forEach( _slot => {
                    const slot = parseInt( _slot )
                    resetVersion[ key ][ slot ].forEach( attachment => attachment.equipped = false )
                } )
            } )

            localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( resetVersion ) )
        }
    },
} )
