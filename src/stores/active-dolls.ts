import { defineStore } from "pinia"

import type { Doll } from "@/models/doll"

export const useDollsStore = defineStore( "dolls", {
    state: () => ( {
        data: [] as Doll[],
    } ),
    getters: {
        ordered: state => state.data.sort( ( a, b ) => a.order - b.order ),
    },
    actions: {
        addDoll ( doll: Doll ) {
            this.data.push( doll )
        },
        removeDoll ( name: string ) {
            this.data.splice(
                this.data.findIndex( doll => doll.name === name ),
                1
            )
        },
        resetAttachments () {
            this.data.forEach( doll => {
                doll.weapon.resetAttachments()
            } )
        },
        swapOrder ( doll: Doll, event: Event ) {
            let newOrder = parseInt( ( event.target as HTMLInputElement ).value )
            const otherDoll = this.data.find( d => d.order === newOrder )

            if ( newOrder > this.data.length ) newOrder = this.data.length
            if ( otherDoll ) otherDoll.order = doll.order

            doll.order = newOrder
        },
    },
} )
