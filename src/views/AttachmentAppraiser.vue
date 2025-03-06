<script setup lang="ts">
import { Modal, Toast } from 'bootstrap';
import { storeToRefs } from 'pinia';
import { createWorker } from 'tesseract.js';

import helix1 from '@/assets/images/helix1.png'
import helix2 from '@/assets/images/helix2.png'
import helix3 from '@/assets/images/helix3.png'
import helix4 from '@/assets/images/helix4.png'
import helix5 from '@/assets/images/helix5.png'
import helix6 from '@/assets/images/helix6.png'

import type { Doll } from "@/models/doll";
import type { Attachment, Stat, Weapon } from '@/types/attachments';

import { useAttachmentsStore } from '@/stores/attachments';
import { Andoris, Tololo } from "@/models/dolls/dolls-list"
import { Weapons } from '@/models/weapon';
import { useDollsStore } from '@/stores/active-dolls';
import {
    ATTACHMENT_SETS,
    ATTACHMENT_TYPES,
    AVAILABLE_STATS,
    getAttachmentTypeFromText
} from '@/utils/stats';
import DollSelectorModal from '@/components/DollSelectorModal.vue';

const helixImgs = [ "", helix1, helix2, helix3, helix4, helix5, helix6 ]
const weaponsByType = Object.groupBy( Weapons, weapon => weapon.type )

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

const attachments = useAttachmentsStore()
const attachmentsByRefs = storeToRefs( attachments ).data
const addedDolls = useDollsStore()
const dolls: Doll[] = [
    Andoris,
    Tololo
]


/**
 * Adds the given doll.
 * @param doll The doll to add.
 */
function addDoll ( doll: Doll ) {
    addedDolls.addDoll( doll )
    Modal.getOrCreateInstance( "#doll-selector-modal" ).hide()
}

/**
 * Goes through each doll and calculates which set of attachments gives her the best average damage.
 */
function optimizeAttachments () {
    addedDolls.resetAttachments()
    attachments.resetEquipped()

    // We'll calculate attachment value off the recommended stats for the each doll by weighting
    // them by incidence in the array. This needs to be done for both the best set (in the doll's
    // info) and the Phase Strike set, because that's the second best set for everything.
    addedDolls.data.forEach( doll => {
        const attachmentsMatchingWeaponType = attachmentsByRefs.value[ doll.weapon.type ]
        const attachmentsBestSet = [ [], [], [], [] ] as Attachment[][]
        const attachmentsPhaseStrike = [ [], [], [], [] ] as Attachment[][]

        for ( let slot = 0; slot < 4; slot++ ) {
            attachmentsMatchingWeaponType[ slot ].forEach( attachment => {
                if ( attachment.equipped ) return
                if ( !slot ) {
                    attachmentsBestSet[ slot ].push( attachment )
                    attachmentsPhaseStrike[ slot ].push( attachment )
                    return
                }
                if ( attachment.set === doll.best_set ) attachmentsBestSet[ slot ].push( attachment )
                if ( attachment.set === "Phase Strike" ) attachmentsPhaseStrike[ slot ].push( attachment )
            } )
        }

        // Check whether there's an attachment for every slot in either set. If the best_set doesn't
        // have a full set but Phase Strike does, then that's automatically the best set. If neither
        // does, then we'll just pick Phase Strike because it's likely to get the most additions in
        // the future.
        const attachmentList = attachmentsBestSet.filter( attachment => !!attachment.length ).length === 4 ?
            attachmentsBestSet :
            attachmentsPhaseStrike

        console.log( attachmentList )

        // Sort every single attachment type by how suitable it is for the current doll, then pick
        // the highest compatibility
        // const bestAttachments = attachmentList.map( attachmentType => {
        //     return attachmentType.sort( ( a, b ) => {
        //         return calculateAttachmentValue( doll, a ) - calculateAttachmentValue( doll, b )
        //     } ).at( 0 )
        // } )

        // for ( let slot = 0; slot < 4; slot++ ) {
        //     const attachment = bestAttachments.at( slot )

        //     if ( attachment ) {
        //         attachment.equipped = true
        //         doll.weapon.attachments[ slot ] = attachment
        //     } else {
        //         delete doll.weapon.attachments[ slot ]
        //     }
        // }
    } )
}

/**
 * Parses the random gibberish that Tesseract spits out and figures out what the stats for the
 * attachment that was pasted are. This also adds them to the store if it manages to find the
 * appropriate amount of stats given the attachment type (determined by the attachment's name).
 * @param text The output from Tesseract.
 */
function processOCROutput ( text: string ) {
    const attachmentType = getAttachmentTypeFromText( text )
    console.log( text )

    if ( attachmentType === -1 ) return showToast( "image-processing-failed" )

    const stats = [] as Stat[]

    AVAILABLE_STATS.forEach( stat => {
        const match = RegExp( `${stat}.+?([0-9.]+)` ).exec( text )

        if ( match ) {
            stats.push( {
                stat: stat,
                value: parseFloat( match[ 1 ] )
            } )
        }
    } )

    const attachmentSet = ATTACHMENT_SETS.find( set => text.includes( set ) )

    if ( ( attachmentType.slot === 0 && stats.length < 4 ) || stats.length < 3 || ( stats.length < 3 && !attachmentSet ) ) {
        return showToast( "image-processing-failed" )
    }

    attachments.addAttachment( attachmentType, attachmentSet, stats )
    showToast( "image-processing-success" )
}

/**
 * Displays the doll selector modal.
 */
function showDollSelector () {
    Modal.getOrCreateInstance( "#doll-selector-modal" ).show()
}

/**
 * Displays the toast indicating the file could not be processed.
 * @param id The ID of the toast to show.
 */
function showToast ( id: string ) {
    Toast.getOrCreateInstance( `#${id}`, {
        autohide: true,
        delay: 5000
    } ).show()
}

/**
 * Retrieves all stats to be displayed for the given doll.
 * @param doll The doll to generate stats for.
 */
function statsToShow ( doll: Doll ) {
    return [
        [ "Attack", doll.totalAttack ],
        [ "Defense", doll.totalDefense ],
        [ "Health", doll.totalHealth ],
        [ "Crit Rate", doll.totalCritRate ],
        [ "Crit DMG", doll.totalCritDmg ]
    ]
}

// Events
document.onpaste = function ( event ) {
    if ( event.clipboardData ) {
        for ( const i in event.clipboardData.items ) {
            const item = event.clipboardData.items[ i ]

            if ( item.kind === "file" ) {
                showToast( "file-paste-detected" )

                const blob = item.getAsFile()
                const reader = new FileReader()

                reader.onload = async function ( event ) {
                    if ( event.target ) {
                        const target = event.target
                        const worker = await createWorker( "eng" )
                        const ret = await worker.recognize( target.result )
                        processOCROutput( ret.data.text )
                        worker.terminate()
                    }
                };

                if ( blob ) reader.readAsDataURL( blob )
            }
        }
    }
}
</script>

<template>
    <DollSelectorModal :allDolls="dolls" :addedDolls="addedDolls.data.map( d => d.name )" @selectDoll="addDoll">
    </DollSelectorModal>
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true"
            v-for=" toast in toasts " :id="toast.id" v-bind:key="toast.id">
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
                        <li class="list-group-item d-flex justify-content-center align-items-center">
                            <button class="btn btn-primary" @click="optimizeAttachments">
                                Optimize Attachments
                            </button>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center"
                            v-for=" ( attachmentType, i ) in ATTACHMENT_TYPES " v-bind:key="`${attachmentType}-${i}`">
                            {{ attachmentType }}
                            <span class="badge text-bg-primary rounded-pill">
                                {{ attachments.data[ Math.floor( i / 4 ) ][ i % 4 ].length }}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-12 col-md-9 py-3 doll-boxes">
                <template v-for=" addedDoll in addedDolls.ordered " v-bind:key="addedDoll.name">
                    <div class="border border-3 border-secondary-subtle text-secondary-emphasis d-flex flex-row mb-3">
                        <div
                            class="d-flex justify-content-center justify-content-md-around flex-column flex-md-row ms-md-3">
                            <div class="d-flex justify-content-center align-items-center">
                                <input class="text-center" type="text" :value="( addedDoll as any ).order"
                                    @input="addedDolls.swapOrder( addedDoll, $event )" min="1" :max="addedDoll.order">
                            </div>
                            <div class="d-flex flex-column justify-content-center align-items-center m-3">
                                <img :src="addedDoll.img_path" :alt="addedDoll.name"
                                    :class="[ 'rounded-top', !!addedDoll.rarity ? 'bg-elite' : 'bg-standard' ]">
                                <div
                                    class="container-fluid text-bg-light rounded-bottom text-align-center d-flex justify-content-center">
                                    {{ addedDoll.combatEffectiveness }}
                                </div>
                                <button class="w-100 btn btn-danger mt-1"
                                    @click="addedDolls.removeDoll( addedDoll.name )">Remove</button>
                            </div>
                        </div>
                        <div class="container-fluid my-3">
                            <div class="h-100 d-grid gap-2">
                                <div class="w-100 d-flex flex-column justify-content-around" v-for=" i in 4 "
                                    v-bind:key="`${addedDoll.name}-${i}`">
                                    <div class="border-bottom my-1" v-if=" !!addedDoll.weapon.attachments[ i - 1 ] ">
                                        {{ addedDoll.weapon.attachments[ i - 1 ].type }}
                                    </div>
                                    <template v-if=" !!addedDoll.weapon.attachments[ i - 1 ] ">
                                        <div class="d-flex justify-content-between"
                                            v-for=" stat in addedDoll.weapon.attachments[ i - 1 ].stats "
                                            v-bind:key="`${i}-${stat.stat}`">
                                            <span>{{ stat.stat }}</span>
                                            <span class="d-flex align-items-center text-white">
                                                {{ stat.value.toFixed( 1 ) }}
                                            </span>
                                        </div>
                                    </template>
                                    <div class="d-flex justify-content-center align-items-center" v-else>
                                        No attachment
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container-fluid my-3 me-3">
                            <div class="h-100 d-flex flex-column justify-content-around">
                                <!-- Desktop setters -->
                                <div class="d-none d-md-flex flex-row">
                                    <div class="me-1" style="width: 25px;">
                                        <img class="img-fluid" :src="helixImgs[ addedDoll.neural_helix ]">
                                    </div>
                                    <input type="range" class="form-range" min="0" max="6"
                                        v-model.number="addedDoll.neural_helix">
                                </div>
                                <div class="container-fluid d-none d-md-flex flex-row">
                                    <label for="fortifications-range" class="me-2 text-nowrap">
                                        Fortifications ({{ addedDoll.fortifications }})
                                    </label>
                                    <input id="fortifications-range" type="range" class="form-range" min="0" max="6"
                                        v-model.number="addedDoll.fortifications">
                                </div>
                                <!-- Mobile setters -->
                                <div class="d-flex d-md-none form-floating">
                                    <input type="number" class="form-control" id="mobile-helix-input"
                                        v-model.number="addedDoll.neural_helix" min="0" max="6">
                                    <label for="mobile-helix-input">Neural Helix</label>
                                </div>
                                <div class="d-flex d-md-none form-floating">
                                    <input type="number" class="form-control" id="mobile-fortification-input"
                                        v-model.number="addedDoll.fortifications" min="0" max="6">
                                    <label for="mobile-helix-input">Fortifications</label>
                                </div>
                                <!-- End screen-based setters -->
                                <div class="d-flex justify-content-center my-1">
                                    <select class="form-select" :value="addedDoll.weapon.name"
                                        @change="addedDoll.changeWeapon( ( $event.target as HTMLSelectElement ).value )">
                                        <option v-for=" weapon in weaponsByType[ addedDoll.weapon.type ] "
                                            v-bind:key="`${addedDoll.name}-${weapon.name}`">
                                            {{ ( weapon as unknown as Weapon ).name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="d-flex justify-content-between" v-for=" stat in statsToShow( addedDoll ) "
                                    v-bind:key="`${addedDoll.name}-${stat[ 0 ]}`">
                                    <span>{{ stat[ 0 ] }}</span>
                                    <span class="text-white">
                                        {{ Math.floor( stat[ 1 ] as number ) }}
                                    </span>
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

input[type="text"] {
    width: 2rem;
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

.doll-boxes .bg-elite,
.doll-boxes .bg-standard {
    aspect-ratio: 1/1;
    width: 150px;
}

.d-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
}

@media (max-width: 767.98px) {
    .d-grid {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr;
    }

    .doll-boxes .bg-elite,
    .doll-boxes .bg-standard {
        width: 80px;
    }
}
</style>
