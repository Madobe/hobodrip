<script setup lang="ts">
import type { Attachment } from '@/types/attachments';
import type { WeaponTypes } from '@/utils/defs';

defineProps<{
    attachments: {
        [ weaponType: number ]: {
            [ slot: number ]: Attachment[]
        }
    }
    attachmentSlot: 0 | 1 | 2 | 3
    name: string
    weaponType: WeaponTypes
}>()
</script>

<template>
    <div class="modal modal-fullscreen" id="attachment-viewer-modal">
        <div class="modal-dialog modal-fullscreen-sm-down modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ name }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-6 col-md-3 mb-3"
                                v-for=" ( attachment, i ) in attachments[ weaponType ][ attachmentSlot ] "
                                v-bind:key="`${weaponType}-${attachmentSlot}-${i}`">
                                <div class="card">
                                    <div class="card-body d-flex flex-column justify-content-between">
                                        <div class="card-title d-flex flex-row justify-content-between">
                                            <h5>{{ attachment.set }}</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"
                                                @click="$emit( 'deleteAttachment', weaponType, attachmentSlot, attachment )">
                                            </button>
                                        </div>
                                        <div class="d-flex flex-row justify-content-between"
                                            v-for=" stat in attachment.stats " v-bind:key="`${i}-${stat.stat}`">
                                            <span>{{ stat.stat }}</span>
                                            <span>{{ stat.value.toFixed( 1 ) }}</span>
                                        </div>
                                        <hr>
                                        <div class="d-flex flex-row justify-content-between">
                                            <span>Equipped</span>
                                            <span>{{ attachment.equipped ? "Yes" : "No" }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
