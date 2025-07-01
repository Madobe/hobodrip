<script setup lang="ts">
import type { InteractionMode } from "chart.js"

import { Modal } from "bootstrap"
import { ref, computed, onMounted, watch } from "vue"
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

import supply from "@/assets/data/gacha-db.json"

import { getRandomElement } from "@/utils/array"
import { usePullsStore } from "@/stores/pulls"
import FullScreenVideoModal from "@/components/FullScreenVideoModal.vue"

interface GachaCategory {
    elites: string[],
    standards: string[]
}

interface GachaSupply {
    dolls: GachaCategory,
    weapons: GachaCategory
}

ChartJS.register( Title, Tooltip, Legend, ArcElement, CategoryScale )

const modalVideoType = ref( 0 )
let modalVideoTimeout = 0

const currentRateUps = [
    "Springfield",
    "Sharkry",
    "Nagant"
]

const processedSupply = supply.data.reduce<GachaSupply>( ( accumulator, value ) => {
    switch ( value.category ) {
        case 0:
            return {
                dolls: { elites: [ ...accumulator.dolls.elites, value.name ], standards: accumulator.dolls.standards },
                weapons: accumulator.weapons
            }
        case 1:
            return {
                dolls: { elites: accumulator.dolls.elites, standards: [ ...accumulator.dolls.standards, value.name ] },
                weapons: accumulator.weapons
            }
        case 2:
            return {
                dolls: accumulator.dolls,
                weapons: { elites: [ ...accumulator.weapons.elites, value.name ], standards: accumulator.weapons.standards }
            }
        case 3:
            return {
                dolls: accumulator.dolls,
                weapons: { elites: accumulator.weapons.elites, standards: [ ...accumulator.weapons.standards, value.name ] }
            }
        default:
            return {
                dolls: accumulator.dolls,
                weapons: { elites: accumulator.weapons.elites, standards: [ ...accumulator.weapons.standards, value.name ] }
            }
    }
}, {
    dolls: {
        elites: [],
        standards: []
    },
    weapons: {
        elites: [],
        standards: []
    }
} as GachaSupply )
// const splashes = supply.data.reduce( ( accumulator, value ) => {
//     return Object.assign( accumulator, { [value.name]: value.splash } )
// }, {} )
const allElites = processedSupply.dolls.elites.concat( processedSupply.weapons.elites )
const allStandards = processedSupply.dolls.standards.concat( processedSupply.weapons.standards )
const pulls = usePullsStore()

const showElites = ref( true )
const showStandards = ref( true )
const showRetired = ref( true )

// Constants
const MAX_PULLS = 1000

// Load pulls and pity counter from localStorage
onMounted( () => {
    const savedPulls = localStorage.getItem( 'hobodrip.gachaPulls' )
    const savedPityCounter = localStorage.getItem( 'hobodrip.gachaPityCounter' )

    if ( savedPulls ) {
        pulls.addPulls( JSON.parse( savedPulls ) )

        // Update the chart and text
        pulls.total = pulls.pulls.length
        pulls.elites = pulls.pulls.filter( pull => isElite( pull.name ) ).length
        pulls.standards = pulls.pulls.filter( pull => isStandard( pull.name ) ).length
        pulls.count = pulls.pulls.length ? pulls.pulls[ pulls.pulls.length - 1 ].pity : 0
        pulls.pity = pulls.pulls.length && isElite( pulls.pulls[ pulls.pulls.length - 1 ].name ) ?
            currentRateUps.includes( pulls.pulls[ pulls.pulls.length - 1 ].name ) :
            false
    }

    if ( savedPityCounter ) {
        pulls.count = JSON.parse( savedPityCounter )
    }

    // Watch for changes in pity counter and save to localStorage
    watch( () => pulls.count, ( newCount ) => {
        localStorage.setItem( 'hobodrip.gachaPityCounter', JSON.stringify( newCount ) )
    } )
} )

// Methods
/**
 * Shifts the saved pulls if the limit is reached.
 */
function shiftPullsIfNeeded () {
    if ( pulls.pulls.length > MAX_PULLS ) {
        pulls.pulls = pulls.pulls.slice( pulls.pulls.length - MAX_PULLS )
        localStorage.setItem( 'hobodrip.gachaPulls', JSON.stringify( pulls.pulls ) )
    }
}

/**
 * Determines whether it's the first time any of the given results have been pulled. If so, get the
 * rarity and play the corresponding movie file in an overlay.
 */
function checkFirstTime ( results: string[] ) {
    results.forEach( item => {
        if ( !pulls.firstTimes[ item ] ) {
            if ( allElites.includes( item ) ) {
                showVideo( 1 )
                hideVideo( 13000 )
            } else if ( allStandards.includes( item ) ) {
                showVideo( 2 )
                hideVideo( 12000 )
            }
        }
    } )
}

/**
 * Each pull is calculated as follows:
 * - Base elite rate is 0.6% (0.3% for dolls and 0.3% for weapons)
 * - Base elite rate is increased starting from 58
 * - According to the pull statistics from exilium.moe, nobody pulls more than 75 to get an elite,
 * so this can be considered to be a 99%
 * - 75 - 58 = 17 with a rate difference from 99 - 0.6 = 98.4, so 98.4 / 17 = 5.788 increase per
 * pull
 *
 * - Base standard rate is 6% (3% for dolls and 3% for weapons)
 * - Standard rate has to be taken as elite + standard rates because otherwise any random value
 * below the elite rate wouldn't be part of the standard rate (so it would effectively be
 * standard - elite)
 *
 * - Rate for blue trash is 93.4% with the rate shared equally between all trash
 */
function doSinglePull () {
    let eliteRate = 0.6 + ( 5.788 * Math.max( 0, pulls.count + 1 - 58 ) )

    // These rates are just arbitrary assumptions based on the 2 million pulls data on exilium.moe
    if ( pulls.count === 74 ) eliteRate = 99
    else if ( pulls.count === 75 ) eliteRate = 99.9
    else if ( pulls.count === 76 ) eliteRate = 99.99
    else if ( pulls.count === 77 ) eliteRate = 99.999
    else if ( pulls.count === 78 ) eliteRate = 99.9999
    else if ( pulls.count === 79 ) eliteRate = 99.99999
    else if ( pulls.count === 80 ) eliteRate = 100

    const roll = Math.random() * 100

    if ( roll < eliteRate ) {
        // There's no elite weapon in the doll banner anyway
        if ( pulls.pity || Math.random() * 100 < 50 ) {
            // Figure out which doll in the elite pool is in the rate up (it is assumed this exists
            // and only one exists)
            return currentRateUps.filter( d => processedSupply.dolls.elites.includes( d ) )[ 0 ]
        } else {
            return getRandomElement( processedSupply.dolls.elites.filter( d => !currentRateUps.includes( d ) ) )
        }
    } else if ( roll < 6 + eliteRate || pulls.standardPity + 1 >= 10 ) {
        if ( pulls.standardPity + 1 >= 10 ) pulls.setStandardPity( 0 )
        else pulls.setStandardPity( pulls.standardPity + 1 )

        if ( Math.random() * 100 < 50 ) {
            const rateUpStandards = currentRateUps.filter( d => processedSupply.dolls.standards.includes( d ) )
            return getRandomElement( rateUpStandards )
        } else {
            const nonRateUpStandards = processedSupply.dolls.standards.filter( d => !currentRateUps.includes( d ) )
            return getRandomElement( nonRateUpStandards )
        }
    } else {
        pulls.setStandardPity( pulls.standardPity + 1 )

        // Blue trash is "Retired" + any random standard weapon
        return "Retired " + getRandomElement( processedSupply.weapons.standards )
    }
}

/**
 * Hides the video modal.
 * @param time The time in milliseconds to wait before hiding the video.
 */
function hideVideo ( time: number ) {
    if ( modalVideoTimeout ) clearTimeout( modalVideoTimeout )

    modalVideoTimeout = setTimeout( () => {
        const videoModal = Modal.getInstance( "#full-screen-video-modal" )

        if ( videoModal ) videoModal.hide()

        modalVideoType.value = 0
    }, time )
}

/**
 * Determines whether the given pull is of elite quality.
 * @param name The name of the pull result to check.
 */
function isElite ( name: string ) {
    return processedSupply.dolls.elites.includes( name ) || processedSupply.weapons.elites.includes( name )
}

/**
 * Determines whether the given pull is of standard quality.
 * @param name The name of the pull result to check.
 */
function isStandard ( name: string ) {
    return processedSupply.dolls.standards.includes( name ) || processedSupply.weapons.standards.includes( name )
}

/**
 * Determines whether the given pull is visible in the results list.
 * @param name The name of the pull result to check.
 */
function isVisible ( name: string ): boolean {
    return !!name &&
        (
            ( isElite( name ) && showElites.value ) ||
            ( isStandard( name ) && showStandards.value ) ||
            ( name.startsWith( 'Retired' ) && showRetired.value )
        )
}

/**
 * Displays the given video in the video modal.
 * @param type The type of video to show in the modal.
 */
function showVideo ( type: number ) {
    const videoModal = Modal.getInstance( "#full-screen-video-modal" )

    if ( videoModal ) {
        modalVideoType.value = type
        videoModal.show()
    }
}

/**
 * Resets the saved pulls and pity counter.
 */
function resetPulls () {
    pulls.$reset()
    localStorage.removeItem( 'hobodrip.gachaPulls' )
    localStorage.removeItem( 'hobodrip.gachaPityCounter' )
}

// Event handlers
/**
 * Handles a single pull.
 */
function handleSingle () {
    const result = doSinglePull()
    const pity = pulls.count + 1

    pulls.increaseCount()

    if ( currentRateUps.includes( result ) && isElite( result ) ) {
        pulls.setPity( false )
        pulls.increaseElites()
        pulls.resetCount()
    } else if ( isElite( result ) ) {
        pulls.setPity( true )
        pulls.increaseElites()
        pulls.resetCount()
    } else if ( isStandard( result ) ) {
        pulls.increaseStandards()
    }

    checkFirstTime( [ result ] )
    pulls.addPulls( { name: result, pity: pity } )
    shiftPullsIfNeeded() // Shift pulls if needed
    localStorage.setItem( 'hobodrip.gachaPulls', JSON.stringify( pulls.pulls ) ) // Save to localStorage
}

/**
 * Handles a 10 pull.
 */
function handleMulti () {
    const results = Array( 10 ).fill( 0 ).map( () => {
        const result = doSinglePull()
        const pity = pulls.count + 1

        pulls.increaseCount()

        if ( currentRateUps.includes( result ) && isElite( result ) ) {
            pulls.setPity( false )
            pulls.increaseElites()
            pulls.resetCount()
        } else if ( isElite( result ) ) {
            pulls.setPity( true )
            pulls.increaseElites()
            pulls.resetCount()
        } else if ( isStandard( result ) ) {
            pulls.increaseStandards()
        }

        return { name: result, pity: pity }
    } )

    checkFirstTime( results.map( r => r.name ) )
    pulls.addPulls( results )
    shiftPullsIfNeeded() // Shift pulls if needed
    localStorage.setItem( 'hobodrip.gachaPulls', JSON.stringify( pulls.pulls ) ) // Save to localStorage
}

const pieData = computed( () => {
    return {
        labels: [ 'Elites', 'Standards', 'Retired' ],
        datasets: [
            {
                data: [ pulls.elites, pulls.standards, pulls.total - pulls.elites - pulls.standards ],
                backgroundColor: [ '#ffb348', '#7028e4', '#36A2EB' ],
                hoverBackgroundColor: [ '#ffb348', '#7028e4', '#36A2EB' ]
            }
        ]
    }
} )

const pieOptions = {
    plugins: {
        legend: {
            display: false
        },
        tooltips: {
            enabled: true,
        }
    },
    interaction: {
        mode: "dataset" as InteractionMode,
    }
}
</script>

<template>
    <FullScreenVideoModal :type="modalVideoType" @hideVideo="hideVideo( 0 )"></FullScreenVideoModal>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4 p-0 border border-secondary overflow-y-scroll pull-log order-1 order-md-0">
                <div class="d-flex flex-column h-100">
                    <div
                        class="container-fluid py-2 position-sticky bottom-0 bg-light d-flex justify-content-center border-secondary border">
                        <button class="btn bg-elite" :class="showElites ? 'bg-elite' : 'bg-secondary'"
                            @click="showElites = !showElites">
                            Elites
                        </button>
                        <button class="btn ms-2 bg-standard" :class="showStandards ? 'bg-standard' : 'bg-secondary'"
                            @click="showStandards = !showStandards">
                            Standards
                        </button>
                        <button class="btn ms-2" :class="showRetired ? 'bg-primary' : 'bg-secondary'"
                            @click="showRetired = !showRetired">
                            Retired
                        </button>
                    </div>
                    <div class="container-fluid h-100 p-0">
                        <div class="container-fluid" v-for=" ( pull, i ) in pulls.pulls.toReversed() "
                            :key="`pull-${i}`">
                            <div v-if=" isVisible( pull.name ) " :class="[ 'row border-bottom border-secondary py-1',
                                isElite( pull.name ) ? 'bg-elite' : '',
                                isStandard( pull.name ) ? 'bg-standard' : '' ]">
                                <div class="col-3">{{ pulls.pulls.length - i }}</div>
                                <div class="col-6">{{ pull.name }}</div>
                                <div class="col-3" v-if=" isElite( pull.name ) ">Pity: {{ pull.pity }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-8 p-0 border border-secondary order-0 order-md-1">
                <div class="position-relative">
                    <img class="img-fluid" src="/hobodrip/images/banner.jpg" alt="Current banner">
                    <button class="btn btn-danger m-2 position-absolute bottom-0 start-0" @click="resetPulls"
                        style="width: 80px;">Reset</button>
                </div>
                <div class="container-fluid d-flex flex-column flex-md-row">
                    <div class="container-fluid d-flex justify-content-around justify-content-md-end py-2">
                        <div class="container-fluid">
                            <div class="container d-flex justify-content-between">
                                <span>Total: </span>
                                <span>{{ pulls.total }}</span>
                            </div>
                            <div class="container d-flex justify-content-between">
                                <span>Elites: </span>
                                <span>{{ pulls.elites }} ({{ ( pulls.elites / pulls.total * 100 || 0 ).toFixed( 2 )
                                    }}%)</span>
                            </div>
                            <div class="container d-flex justify-content-between">
                                <span>Standards: </span>
                                <span>{{ pulls.standards }} ({{ ( pulls.standards / pulls.total * 100 || 0 ).toFixed( 2
                                )
                                    }}%)</span>
                            </div>
                            <div class="container d-flex justify-content-between">
                                <span>Current Pity: </span>
                                <span>{{ pulls.count }} (Pity: {{ pulls.pity ? "✓" : "✘" }})</span>
                            </div>
                        </div>
                        <div class="container-fluid" style="max-width: 120px; margin: auto;">
                            <Pie :data="pieData" :options="pieOptions" />
                        </div>
                    </div>
                    <div class="container-fluid d-flex justify-content-around justify-content-md-end py-2 height-100">
                        <button class="btn btn-secondary one-pull" @click="handleSingle">Pull</button>
                        <button class="btn btn-secondary ms-2 ten-pull" @click="handleMulti">Pull x10</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
button {
    width: 150px;
    border-radius: 2px;
    height: 40px;
}

.one-pull {
    background-color: #c0b4bc;
}

.ten-pull {
    background-color: #e04414;
}

.pull-log {
    max-height: calc(100vh - 4rem);
}
</style>
