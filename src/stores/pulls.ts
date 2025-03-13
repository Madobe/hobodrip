import { defineStore } from "pinia"

export interface Pull {
    name: string
    pity: number
}

export const usePullsStore = defineStore( "pulls", {
    state: () => ( {
        count: 0,
        elites: 0,
        firstTimes: {} as { [name: string]: boolean },
        pity: false,
        pulls: [] as Pull[],
        standardPity: 0,
        standards: 0,
        total: 0,
    } ),
    actions: {
        addPulls( newPulls: Pull | Pull[] ) {
            const intermediary: Pull[] = ( [] as Pull[] ).concat( newPulls )
            intermediary.forEach( doll => ( this.firstTimes[doll.name] = true ) )
            this.pulls = this.pulls.concat( newPulls )
        },
        increaseCount() {
            this.count++
            this.total++
        },
        increaseElites() {
            this.elites++
        },
        increaseStandards() {
            this.standards++
        },
        resetCount() {
            this.count = 0
        },
        setPity( newPity: boolean ) {
            this.pity = newPity
        },
        setStandardPity( newPity: number ) {
            this.standardPity = newPity
        },
    },
} )
