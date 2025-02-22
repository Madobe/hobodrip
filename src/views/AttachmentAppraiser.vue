<script setup lang="ts">
import { Modal, Toast } from 'bootstrap';
import { createWorker } from 'tesseract.js';

import type { Attachment, Doll, Stat, Weapon } from '@/types/attachments';

import { useAttachmentsStore } from '@/stores/attachments';
import { AVAILABLE_STATS, calculateCombatEffectiveness, getAttachmentTypeFromText, getAttachmentTypes, getWeaponsByType } from '@/utils/stats';
import _dolls from '@/assets/data/doll-db.json'
import _weapons from '@/assets/data/weapon-db.json'
import DollSelectorModal from '@/components/DollSelectorModal.vue';
import { reactive } from 'vue';

const dolls: { [name: string]: Doll } = _dolls
const weapons: { [name: string]: Weapon } = _weapons
const weaponsByType = getWeaponsByType()

const toasts: {
    id: string,
    message: string
}[] = [
        {
            id: "image-processing-failed",
            message: "Failed to process image."
        },
        {
            id: "file-paste-detected",
            message: "Image paste detected."
        },
        {
            id: "image-processing-success",
            message: "Image successfully processed. New attachment available."
        }
    ]

const attachmentTypes = getAttachmentTypes()
const attachments = useAttachmentsStore()

const addedDolls: {
    name: string
    neuralHelix: number
    fortifications: number
    type: number
    attachments: Attachment[]
}[] = reactive([])

/**
 * Adds the given doll.
 * @param name The name of the doll to add.
 */
function addDoll(name: string) {
    const doll = dolls[name]

    addedDolls.push({
        name,
        neuralHelix: 6,
        fortifications: 0,
        type: doll.type,
        attachments: [] as Attachment[]
    })
    Modal.getOrCreateInstance("#doll-selector-modal").hide()
}

/**
 * Parses the random gibberish that Tesseract spits out and figures out what the stats for the
 * attachment that was pasted are. This also adds them to the store if it manages to find the 
 * appropriate amount of stats given the attachment type (determined by the attachment's name).
 * @param text The output from Tesseract.
 */
function processOCROutput(text: string) {
    const attachmentType = getAttachmentTypeFromText(text)

    if (attachmentType === -1) return showToast("image-processing-failed")

    let stats = [] as Stat[]

    AVAILABLE_STATS.forEach(stat => {
        const match = RegExp(`${stat}.+?([0-9.]+)`).exec(text)

        if (match) {
            stats.push({
                stat: stat,
                value: parseFloat(match[1])
            })
        }
    })

    if ((attachmentType.slot === 0 && stats.length < 4) || stats.length < 3) {
        return showToast("image-processing-failed")
    }

    attachments.addAttachment(attachmentType, stats)
    showToast("image-processing-success")
}

/**
 * Removes the given doll.
 * @param name The doll to remove.
 */
function removeDoll(name: string) {
    addedDolls.splice(addedDolls.findIndex(doll => doll.name === name), 1)
}

/**
 * Displays the doll selector modal.
 */
function showDollSelector() {
    Modal.getOrCreateInstance("#doll-selector-modal").show()
}

/**
 * Displays the toast indicating the file could not be processed.
 * @param id The ID of the toast to show.
 */
function showToast(id: string) {
    Toast.getOrCreateInstance(`#${id}`, {
        autohide: true,
        delay: 5000
    }).show()
}

// Events
document.onpaste = function (event) {
    if (event.clipboardData) {
        for (const i in event.clipboardData.items) {
            const item = event.clipboardData.items[i]

            if (item.kind === "file") {
                showToast("file-paste-detected")

                const blob = item.getAsFile()
                const reader = new FileReader()

                reader.onload = async function (event) {
                    if (event.target) {
                        const target = event.target
                        const worker = await createWorker("eng")
                        const ret = await worker.recognize(target.result)
                        processOCROutput(ret.data.text)
                        worker.terminate()
                    }
                };

                if (blob) reader.readAsDataURL(blob)
            }
        }
    }
}
</script>

<template>
    <DollSelectorModal :addedDolls="addedDolls.map(d => d.name)" @selectDoll="addDoll"></DollSelectorModal>
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true"
            v-for="toast in toasts" :id="toast.id">
            <div class="d-flex">
                <div class="toast-body">{{ toast.message }}</div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>
    <div class="container-fluid h-100 flex-grow-1 attachment-list">
        <div class="row">
            <div class="col-12 col-md-3 d-flex flex-column my-3">
                <div>
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center"
                            v-for="(attachmentType, i) in attachmentTypes">
                            {{ attachmentType }}
                            <span class="badge text-bg-primary rounded-pill">
                                {{ attachments.data[Math.floor(i / 4)][i % 4].length }}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-12 col-md-9 py-3 doll-boxes">
                <template v-for="addedDoll in addedDolls">
                    <div class="border border-3 border-secondary-subtle text-secondary-emphasis d-flex flex-row mb-3">
                        <div class="d-flex flex-column justify-content-center align-items-center m-3">
                            <img :src="`/src/assets/images/dolls/${addedDoll.name}.png`" :alt="addedDoll.name"
                                class="rounded-top bg-elite">
                            <div
                                class="container-fluid text-bg-light rounded-bottom text-align-center d-flex justify-content-center">
                                {{ calculateCombatEffectiveness(dolls[addedDoll.name], addedDoll.neuralHelix,
                                    addedDoll.fortifications, addedDoll.attachments.flat()) }}
                            </div>
                            <button class="w-100 btn btn-danger mt-1"
                                @click="removeDoll(addedDoll.name)">Remove</button>
                        </div>
                        <div class="container-fluid my-3">
                            <div class="row">
                                <div class="h-100 col-12 col-md-6 d-flex flex-column justify-content-around"
                                    v-for="attachment in addedDoll.attachments">
                                    <div class="border-bottom my-1">
                                        {{ attachment.type }}
                                    </div>
                                    <div class="d-flex justify-content-between" v-for="stat in attachment.stats">
                                        <span>{{ stat.stat }}</span>
                                        <span class="text-white">{{ stat.value.toFixed(1) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container-fluid my-3 me-3">
                            <div class="h-100 d-flex flex-column justify-content-around">
                                <div class="d-flex justify-content-between">
                                    <span>Attack</span>
                                    <span class="text-white">1000</span>
                                </div>
                                <div class="d-flex justify-content-between">
                                    Defense <span class="ms-auto text-white">1000</span>
                                </div>
                                <div class="d-flex justify-content-between">
                                    Health <span class="ms-auto text-white">1000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <div class="border border-3 border-secondary-subtle d-flex justify-content-center align-items-center text-secondary-emphasis pt-2"
                    @click="showDollSelector">
                    Add Doll
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
@font-face {
    font-family: 'Noto Sans';
    src: url('@/src/fonts/NotoSans_Condensed-Regular.ttf') format('ttf');
}

.attachment-list {
    max-height: calc(100vh - 3.5rem);
}

.doll-boxes>div {
    border-radius: 0.5rem;
    font-family: "Noto Sans";
}

.doll-boxes>div:last-child {
    border-style: dashed !important;
    cursor: pointer;
    font: 400 3rem "Noto Sans";
    height: 7rem;
}

.doll-boxes img {
    aspect-ratio: 1/1;
    width: 150px;
}
</style>