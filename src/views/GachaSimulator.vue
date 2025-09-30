<script setup lang="ts">
import type { InteractionMode } from "chart.js"

import { Modal } from "bootstrap"
import { ref, computed } from "vue"
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

import FullScreenVideoModal from "@/components/FullScreenVideoModal.vue"
import { useGacha, type PullRecord } from "@/utils/gacha"
import { Category, useGachaItems } from "@/data-providers/gacha"

const {
    getItems
} = useGachaItems()
const {
    doMulti,
    doSingle,
    hasGuarantee,
    pity,
    pullCount,
    pulls,
    resetPullHistory,
    totalElites,
    totalStandards
} = useGacha( {
    id: 'limited-doll',
    rateUp: getItems( [ "Jiangyu", "Littara", "Ksenia" ] ),
    onFirstFn: onFirstTime
} )

ChartJS.register( Title, Tooltip, Legend, ArcElement, CategoryScale )

const modalVideoType = ref( 0 )
let modalVideoTimeout = 0

const showElites = ref( true )
const showStandards = ref( true )
const showRetired = ref( true )

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
 * Determines whether the given pull is visible in the results list.
 * @param name The name of the pull result to check.
 */
function isVisible ( item: PullRecord ): boolean {
    return !!( item.category & Category.ELITE && showElites.value ) ||
        !!( item.category & Category.STANDARD && showStandards.value ) ||
        !!( item.category & Category.RETIRED && showRetired.value )
}

/**
 * Callback handler for when an item that has never appeared before is pulled.
 * @param category The category of the pull.
 */
function onFirstTime ( category: Category ) {
    if ( category & Category.ELITE ) {
        showVideo( 1 )
        hideVideo( 13000 )
    } else if ( category & Category.STANDARD ) {
        showVideo( 2 )
        hideVideo( 12000 )
    }
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

// Configurations for the pie chart
const pieData = computed( () => {
    return {
        labels: [ 'Elites', 'Standards', 'Retired' ],
        datasets: [
            {
                data: [ totalElites.value, totalStandards.value, pullCount.value - totalElites.value - totalStandards.value ],
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
                        <div class="container-fluid" v-for=" ( pull, i ) in pulls.toReversed() " :key="`pull-${i}`">
                            <div v-if=" isVisible( pull ) " :class="[ 'row border-bottom border-secondary py-1',
                                pull.category & Category.ELITE ? 'bg-elite' : '',
                                pull.category & Category.STANDARD ? 'bg-standard' : '' ]">
                                <div class="col-3">{{ pulls.length - i }}</div>
                                <div class="col-6">{{ pull.name }}</div>
                                <div class="col-3" v-if=" pull.category & Category.ELITE ">Pity: {{ pull.pity }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-8 p-0 border border-secondary order-0 order-md-1">
                <div class="position-relative">
                    <img class="img-fluid" src="/hobodrip/images/banner.jpg" alt="Current banner">
                    <button class="btn btn-danger m-2 position-absolute bottom-0 start-0" @click="resetPullHistory"
                        style="width: 80px;">Reset</button>
                </div>
                <div class="container-fluid d-flex flex-column flex-md-row">
                    <div class="container-fluid d-flex justify-content-around justify-content-md-end py-2">
                        <div class="container-fluid">
                            <div class="container d-flex justify-content-between">
                                <span>Total: </span>
                                <span>{{ pullCount }}</span>
                            </div>
                            <div class="container d-flex justify-content-between">
                                <span>Elites: </span>
                                <span>{{ totalElites }} ({{ ( totalElites / pullCount * 100 || 0 ).toFixed( 2 )
                                    }}%)</span>
                            </div>
                            <div class="container d-flex justify-content-between">
                                <span>Standards: </span>
                                <span>{{ totalStandards }} ({{ ( totalStandards / pullCount * 100 || 0 ).toFixed( 2 )
                                }}%)</span>
                            </div>
                            <div class="container d-flex justify-content-between">
                                <span>Current Pity: </span>
                                <span>{{ pity }} (Pity: {{ hasGuarantee ? "✓" : "✘" }})</span>
                            </div>
                        </div>
                        <div class="container-fluid" style="max-width: 120px; margin: auto;">
                            <Pie :data="pieData" :options="pieOptions" />
                        </div>
                    </div>
                    <div class="container-fluid d-flex justify-content-around justify-content-md-end py-2 height-100">
                        <button class="btn btn-secondary one-pull" @click="doSingle">Pull</button>
                        <button class="btn btn-secondary ms-2 ten-pull" @click="doMulti( 10 )">Pull x10</button>
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
