<script setup lang="ts">
import { Modal } from "bootstrap"
import { ref } from "vue"

import banner from "@/assets/images/banner.jpg"
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

let modalVideoType = ref(0)
let modalVideoTimeout = 0

const currentRateUps = [
    "Dushevnaya",
    "Littara",
    "Krolik"
]

const processedSupply = supply.data.reduce<GachaSupply>((accumulator, value) => {
    switch (value.category) {
        case 0:
            return {
                dolls: { elites: [...accumulator.dolls.elites, value.name], standards: accumulator.dolls.standards },
                weapons: accumulator.weapons
            }
        case 1:
            return {
                dolls: { elites: accumulator.dolls.elites, standards: [...accumulator.dolls.standards, value.name] },
                weapons: accumulator.weapons
            }
        case 2:
            return {
                dolls: accumulator.dolls,
                weapons: { elites: [...accumulator.weapons.elites, value.name], standards: accumulator.weapons.standards }
            }
        case 3:
            return {
                dolls: accumulator.dolls,
                weapons: { elites: accumulator.weapons.elites, standards: [...accumulator.weapons.standards, value.name] }
            }
        default:
            return {
                dolls: accumulator.dolls,
                weapons: { elites: accumulator.weapons.elites, standards: [...accumulator.weapons.standards, value.name] }
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
} as GachaSupply)
const splashes = supply.data.reduce((accumulator, value) => {
    return Object.assign(accumulator, { [value.name]: value.splash })
}, {})
const allElites = processedSupply.dolls.elites.concat(processedSupply.weapons.elites)
const allStandards = processedSupply.dolls.standards.concat(processedSupply.weapons.standards)
const pulls = usePullsStore()

// Methods
/**
 * Determines whether it's the first time any of the given results have been pulled. If so, get the
 * rarity and play the corresponding movie file in an overlay.
 */
function checkFirstTime(results: string[]) {
    results.forEach(item => {
        if (!pulls.firstTimes[item]) {
            if (allElites.includes(item)) {
                showVideo(1)
                hideVideo(13000)
            } else if (allStandards.includes(item)) {
                showVideo(2)
                hideVideo(12000)
            }
        }
    })
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
function doSinglePull() {
    let eliteRate = 0.6 + (5.788 * Math.max(0, pulls.count + 1 - 58))

    // These rates are just arbitrary assumptions based on the 2 million pulls data on exilium.moe
    if (pulls.count === 74) eliteRate = 99
    else if (pulls.count === 75) eliteRate = 99.9
    else if (pulls.count === 76) eliteRate = 99.99
    else if (pulls.count === 77) eliteRate = 99.999
    else if (pulls.count === 78) eliteRate = 99.9999
    else if (pulls.count === 79) eliteRate = 99.99999
    else if (pulls.count === 80) eliteRate = 100

    const roll = Math.random() * 100

    if (roll < eliteRate) {
        // There's no elite weapon in the doll banner anyway
        if (Math.random() * 100 < 50) {
            // Figure out which doll in the elite pool is in the rate up (it is assumed this exists
            // and only one exists)
            return currentRateUps.filter(d => processedSupply.dolls.elites.includes(d))[0]
        } else {
            return getRandomElement(processedSupply.dolls.elites.filter(d => !currentRateUps.includes(d)))
        }
    } else if (roll < 6 + eliteRate || pulls.standardPity + 1 >= 10) {
        if (pulls.standardPity + 1 >= 10) pulls.setStandardPity(0)
        else pulls.setStandardPity(pulls.standardPity + 1)

        if (Math.random() * 100 < 50) {
            const rateUpStandards = currentRateUps.filter(d => processedSupply.dolls.standards.includes(d))
            return getRandomElement(rateUpStandards)
        } else {
            const nonRateUpStandards = processedSupply.dolls.standards.filter(d => !currentRateUps.includes(d))
            return getRandomElement(nonRateUpStandards)
        }
    } else {
        pulls.setStandardPity(pulls.standardPity + 1)

        // Blue trash is "Retired" + any random standard weapon
        return "Retired " + getRandomElement(processedSupply.weapons.standards)
    }
}

/**
 * Hides the video modal.
 * @param time {number} The time in milliseconds to wait before hiding the video.
 */
function hideVideo(time: number) {
    if (modalVideoTimeout) clearTimeout(modalVideoTimeout)

    modalVideoTimeout = setTimeout(() => {
        const videoModal = Modal.getInstance("#full-screen-video-modal")

        if (videoModal) videoModal.hide()

        modalVideoType.value = 0
    }, time)
}

/**
 * Determines whether the given pull is of elite quality.
 * @param name {string} The name of the pull result to check.
 */
function isElite(name: string) {
    return processedSupply.dolls.elites.includes(name) || processedSupply.weapons.elites.includes(name)
}

/**
 * Determines whether the given pull is of standard quality.
 * @param name {string} The name of the pull result to check.
 */
function isStandard(name: string) {
    return processedSupply.dolls.standards.includes(name) || processedSupply.weapons.standards.includes(name)
}

/**
 * Displays the given video in the video modal.
 * @param type {number} The type of video to show in the modal.
 */
function showVideo(type: number) {
    const videoModal = Modal.getInstance("#full-screen-video-modal")

    if (videoModal) {
        modalVideoType.value = type
        videoModal.show()
    }
}

// Event handlers
/**
 * Handles a single pull.
 */
function handleSingle() {
    const result = doSinglePull()

    pulls.increaseCount()

    if (currentRateUps.includes(result) && isElite(result)) {
        pulls.setPity(false)
        pulls.increaseElites()
        pulls.resetCount()
    } else if (isElite(result)) {
        pulls.setPity(true)
        pulls.increaseElites()
        pulls.resetCount()
    } else if (isStandard(result)) {
        pulls.increaseStandards()
    }

    checkFirstTime([result])
    pulls.addPulls(result)
}

/**
 * Handles a 10 pull.
 */
function handleMulti() {
    const results = Array(10).fill(0).map(() => {
        const result = doSinglePull()

        pulls.increaseCount()

        if (currentRateUps.includes(result) && isElite(result)) {
            pulls.setPity(false)
            pulls.increaseElites()
            pulls.resetCount()
        } else if (isElite(result)) {
            pulls.setPity(true)
            pulls.increaseElites()
            pulls.resetCount()
        } else if (isStandard(result)) {
            pulls.increaseStandards()
        }

        return result
    })

    checkFirstTime(results)
    pulls.addPulls(results.flat())
}
</script>

<template>
    <FullScreenVideoModal :type="modalVideoType" @hideVideo="hideVideo(0)"></FullScreenVideoModal>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4 p-0 border border-secondary overflow-y-scroll pull-log order-1 order-md-0">
                <div class="d-flex flex-column h-100">
                    <div
                        class="container-fluid d-flex justify-space-between text-bg-success py-2 border-bottom border-secondary">
                        <span>Current: {{ pulls.count }} (Pity: {{ pulls.pity ? "✓" : "✘" }})</span>
                        <span class="ms-auto">Total: {{ pulls.total }}</span>
                    </div>
                    <div class="container-fluid h-100 p-0">
                        <div class="container-fluid" v-for="(pull, i) in [...pulls.pulls].reverse()">
                            <div :class="['row border-bottom border-secondary py-1',
                                isElite(pull) ? 'bg-elite' : '',
                                isStandard(pull) ? 'bg-standard' : '']">
                                <div class="col-3">{{ pulls.pulls.length - i }}</div>
                                <div class="col-9">{{ pull }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-8 p-0 border border-secondary order-0 order-md-1">
                <img class="img-fluid" :src="banner" alt="Current banner">
                <div class="container-fluid d-flex flex-md-row">
                    <div class="container-fluid">
                        <div class="container d-flex justify-content-between">
                            <span>Elites: {{ pulls.elites }}</span>
                            <span>{{ (pulls.elites / pulls.total * 100 || 0).toFixed(2) }}% of total pulls</span>
                        </div>
                        <div class="container d-flex justify-content-between">
                            <span>Standards: {{ pulls.standards }}</span>
                            <span>{{ (pulls.standards / pulls.total * 100 || 0).toFixed(2) }}% of total pulls</span>
                        </div>
                    </div>
                    <div class="container-fluid d-flex justify-content-end py-2">
                        <button class="btn btn-secondary" @click="handleSingle">Pull</button>
                        <button class="btn btn-secondary ms-2" @click="handleMulti">Pull x10</button>
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
}

button:first-child {
    background-color: #c0b4bc;
}

button:nth-child(2) {
    background-color: #e04414;
}

.bg-elite {
    background-color: #ffb348;
    color: black;
    font-weight: bold;
}

.bg-standard {
    background-color: #7028e4;
    color: white;
    font-weight: bold;
}

.pull-log {
    max-height: calc(100vh - 4rem);
}
</style>