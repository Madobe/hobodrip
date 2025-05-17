<script setup lang="ts">
import { Modal, Toast } from 'bootstrap';
import { storeToRefs } from 'pinia';
import { createWorker } from 'tesseract.js';
import { reactive } from 'vue';

import type { Doll } from "@/models/doll";
import type { Attachment, Stat, Weapon } from '@/types/attachments';

import AttachmentViewerModal from '@/components/AttachmentViewerModal.vue';
import DollSelectorModal from '@/components/DollSelectorModal.vue';
import { Weapons } from '@/models/weapon';
import { useDollsStore } from '@/stores/active-dolls';
import { useAttachmentsStore } from '@/stores/attachments';
import { ATTACHMENT_SETS, ATTACHMENT_TYPES, AVAILABLE_STATS, WeaponTypes } from '@/utils/defs';
import AttachmentCreatorModal from '@/components/AttachmentCreatorModal.vue';

const weaponsByType = Object.groupBy( Weapons, weapon => weapon.type )

const toasts: {
    id: string,
    message: string
}[] = [
        {
            id: "image-attachment-cannot-determine-type",
            message: "Cannot determine attachment type (eg. AR Muzzle). Try shrinking the screenshot area."
        },
        {
            id: "image-muzzle-not-enough-stats",
            message: "Could not determine 4 stats for muzzle attachment. Try shrinking the screenshot area."
        },
        {
            id: "image-attachment-not-enough-stats",
            message: "Could not determine 3 stats for the attachment. Try shrinking the screenshot area."
        },
        {
            id: "image-attachment-no-set",
            message: "Could not determine a set for the attachment. Is the set name in the screenshot?"
        },
        {
            id: "file-paste-detected",
            message: "Image paste detected."
        },
        {
            id: "image-processing-success",
            message: "Image successfully processed. New attachment available."
        },
        {
            id: "attachment-deleted",
            message: "Attachment removed."
        }
    ]

const attachments = useAttachmentsStore()
const attachmentsByRefs = storeToRefs( attachments ).data
const addedDolls = useDollsStore()
const dollsByRefs = storeToRefs( addedDolls ).data
const attachmentViewer = reactive( {
    name: "",
    slot: 0 as 0 | 1 | 2 | 3,
    weaponType: WeaponTypes.AR
} )

/**
 * Adds the given doll.
 * @param doll The doll to add.
 */
function addDoll ( doll: Doll ) {
    addedDolls.addDoll( doll )
    Modal.getOrCreateInstance( "#doll-selector-modal" ).hide()
}

/**
 * Creates the attachment specified by data from the modal.
 * @param data The data for the attachment.
 */
function createAttachment ( data: { set: string, stats: { stat: string, value: number }[], type: string } ) {
    attachments.addAttachment( ATTACHMENT_TYPES[ data.type ], data.set, data.stats )
}

/**
 * Deletes the given attachment from the store.
 * @param attachment The attachment to delete.
 */
function deleteAttachment ( weaponType: WeaponTypes, slot: number, attachment: Attachment ) {
    const index = attachmentsByRefs.value[ weaponType ][ slot ].findIndex( a => a === attachment )
    attachmentsByRefs.value[ weaponType ][ slot ].splice( index, 1 )
    attachments.saveStore()
    showToast( "attachment-deleted" )
}

/**
 * Processes the given text (could be random output from OCR) and returns the matching attachment
 * type number.
 * @returns The attachment type number, or -1 if no matches could be made.
 */
function getAttachmentTypeFromText ( text: string ) {
    for ( const type in ATTACHMENT_TYPES ) {
        if ( RegExp( `\\b${type}\\b` ).test( text ) ) {
            return Object.assign( ATTACHMENT_TYPES[ type ], {
                name: type
            } )
        }
    }

    return -1
}

/**
 * Opens a modal to manually create an attachment.
 */
function manuallyAddAttachment () {
    Modal.getOrCreateInstance( "#attachment-creator-modal" ).show()
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
    dollsByRefs.value.forEach( doll => {
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
        const attachmentList = attachmentsBestSet.filter( slot => !!slot.length ).length === 4 ?
            attachmentsBestSet :
            attachmentsPhaseStrike.filter( slot => slot.length )
        const bestAttachments = doll.calculateBestAttachments( [], attachmentList )

        bestAttachments.forEach( attachment => attachment.equipped = true )
        Object.assign( doll.weapon.attachments, bestAttachments )
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

    if ( attachmentType === -1 ) return showToast( "image-attachment-cannot-determine-type" )

    let stats = [] as Stat[]

    AVAILABLE_STATS.forEach( stat => {
        const match = RegExp( `${stat}[^a-zA-Z0-9]+([0-9]+[0-9.]+)` ).exec( text )

        if ( match ) {
            stats.push( {
                stat: stat,
                value: parseFloat( match[ 1 ] )
            } )
        }
    } )

    stats = stats.filter( stat => !isNaN( stat.value ) )

    const attachmentSet = ATTACHMENT_SETS.find( set => text.includes( set ) )

    if ( attachmentType.slot === 0 && stats.length < 4 ) return showToast( "image-muzzle-not-enough-stats" )
    if ( stats.length < 3 ) return showToast( "image-attachment-not-enough-stats" )
    if ( attachmentType.slot !== 0 && !attachmentSet ) return showToast( "image-attachment-no-set" )

    attachments.addAttachment( attachmentType, attachmentSet, stats )
    showToast( "image-processing-success" )
}

/**
 * Reveals the attachment viewer modal after updating which types of attachments should be visible
 * in it.
 * @param text The type of attachments that will be displayed in the modal.
 */
function showAttachmentViewer ( text: string ) {
    const attachmentType = getAttachmentTypeFromText( text )

    if ( attachmentType !== -1 ) {
        Object.assign( attachmentViewer, {
            name: text,
            slot: attachmentType.slot as 0 | 1 | 2 | 3,
            weaponType: attachmentType.type
        } )

        Modal.getOrCreateInstance( "#attachment-viewer-modal" ).show()
    }
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
    <AttachmentViewerModal :attachments="attachmentsByRefs" :attachmentSlot="attachmentViewer.slot"
        :name="attachmentViewer.name" :weapon-type="attachmentViewer.weaponType" @deleteAttachment="deleteAttachment">
    </AttachmentViewerModal>
    <AttachmentCreatorModal @createAttachment="createAttachment"></AttachmentCreatorModal>
    <DollSelectorModal :addedDolls="addedDolls.data.map( d => d.name )" @selectDoll="addDoll">
    </DollSelectorModal>
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true"
            v-for=" toast in toasts " :id="toast.id" :key="toast.id">
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
                            <div class="btn-group" role="group" aria-label="Attachment buttons">
                                <button class="btn btn-primary" @click="optimizeAttachments">Optimize
                                    Attachment</button>
                                <button class="btn btn-secondary" @click="manuallyAddAttachment">Manual Add</button>
                            </div>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center attachment-category"
                            v-for=" ( attachmentType, i ) in Object.keys( ATTACHMENT_TYPES ) "
                            :key="`${attachmentType}-${i}`" @click="showAttachmentViewer( attachmentType )">
                            {{ attachmentType }}
                            <span class="badge text-bg-primary rounded-pill">
                                {{ attachments.data[ Math.floor( i / 4 ) ][ i % 4 ].length }}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-12 col-md-9 py-3 doll-boxes">
                <template v-for=" addedDoll in addedDolls.ordered " :key="addedDoll.name">
                    <div class="border border-3 border-secondary-subtle text-secondary-emphasis d-flex flex-row mb-3">
                        <div
                            class="d-flex justify-content-center justify-content-md-around flex-column flex-md-row ms-md-3">
                            <div class="d-flex justify-content-center align-items-center">
                                <input class="text-center" type="text" :value="addedDoll.order"
                                    @input="addedDolls.swapOrder( addedDoll, $event )" min="1"
                                    :max="addedDolls.data.length">
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
                                    :key="`${addedDoll.name}-${i}`">
                                    <div class="border-bottom my-1" v-if=" !!addedDoll.weapon.attachments[ i - 1 ] ">
                                        {{ addedDoll.weapon.attachments[ i - 1 ].name }}
                                    </div>
                                    <template v-if=" !!addedDoll.weapon.attachments[ i - 1 ] ">
                                        <div class="d-flex justify-content-between"
                                            v-for=" stat in addedDoll.weapon.attachments[ i - 1 ].stats "
                                            :key="`${i}-${stat.stat}`">
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
                                        <img class="img-fluid" :src="`helix${addedDoll.neural_helix}.png`">
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
                                            :key="`${addedDoll.name}-${weapon.name}`">
                                            {{ ( weapon as unknown as Weapon ).name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="d-flex justify-content-between" v-for=" stat in statsToShow( addedDoll ) "
                                    :key="`${addedDoll.name}-${stat[ 0 ]}`">
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
    src: url('/fonts/NotoSans_Condensed-Regular.ttf') format('truetype');
}

input[type="text"] {
    width: 2rem;
}

.attachment-list {
    max-height: calc(100vh - 3.5rem);
}

.attachment-category {
    cursor: pointer;
}

.attachment-category:hover {
    filter: brightness(1.5);
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
