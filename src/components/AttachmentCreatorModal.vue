<script setup lang="ts">
import { ATTACHMENT_SETS, ATTACHMENT_TYPES, AVAILABLE_STATS } from '@/utils/defs';
import { Modal } from 'bootstrap';
import { computed, reactive, toRaw } from 'vue';

const emit = defineEmits( [ "createAttachment" ] )

const formValues = reactive( {
    set: "Phase Strike",
    stats: Array.from( Array( 4 ) ).map( () => ( { stat: "", value: 0 } ) ),
    type: Object.keys( ATTACHMENT_TYPES )[ 0 ]
} )

const statCount = computed( () => {
    return !!ATTACHMENT_TYPES[ formValues.type ].slot ? 3 : 4
} )

function handleCreate () {
    const requiredCount = ATTACHMENT_TYPES[ formValues.type ].slot ? 3 : 4
    const filledStats = formValues.stats.slice( 0, requiredCount ).filter( stat => !!stat.stat ).length
    const filledValues = formValues.stats.slice( 0, requiredCount ).filter( stat => !!stat.value ).length

    if ( filledStats >= requiredCount && filledValues >= requiredCount ) {
        if ( requiredCount === 4 ) {
            formValues.set = ""
        } else {
            formValues.stats[ 3 ].stat = ""
            formValues.stats[ 3 ].value = 0
        }

        emit( "createAttachment", toRaw( formValues ) )
        Modal.getOrCreateInstance( "#attachment-creator-modal" ).hide()
    }
}

function updateStat ( event: Event, slot: number ) {
    formValues.stats[ slot ].stat = ( event.target as HTMLSelectElement ).value
}

function updateValue ( event: Event, slot: number ) {
    formValues.stats[ slot ].value = parseFloat( ( event.target as HTMLInputElement ).value ?? "0" )
}
</script>

<template>
    <div class="modal" id="attachment-creator-modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Create attachment</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="row g-3">
                        <div class="col-12">
                            <label for="create-attachment-type-select" class="form-label">Type</label>
                            <select id="create-attachment-type-select" class="form-select"
                                aria-label="Attachment type select" v-model="formValues.type" required>
                                <option v-for=" type in Object.keys( ATTACHMENT_TYPES ) " :key="type">
                                    {{ type }}
                                </option>
                            </select>
                        </div>
                        <div class="col-12">
                            <label for="create-attachment-set-select" class="form-label">Set</label>
                            <select id="create-attachment-set-select" class="form-select"
                                aria-label="Attachment set select" v-model="formValues.set" required>
                                <option v-for=" set in [ '' ].concat( ATTACHMENT_SETS ) " :key="set">
                                    {{ set }}
                                </option>
                            </select>
                        </div>
<<<<<<< Updated upstream
                        <template v-for=" n in statCount " v-bind:key="`stat-${n}`">
                            <div class="col-12">
=======
                        <template v-for=" n in statCount " :key="`stat-${n}`">
                            <div class="col-6">
>>>>>>> Stashed changes
                                <label class="form-label">Stat {{ n }}</label>
                                <select class="form-select" @change="updateStat( $event, n - 1 )" required>
                                    <option v-for=" stat in [ '' ].concat( AVAILABLE_STATS ) " :value="stat"
                                        :key="`${stat}-${n}`">
                                        {{ stat }}
                                    </option>
                                </select>
                                <input class="form-control mt-3" type="number" :value="0"
                                    @input="updateValue( $event, n - 1 )" min="1">
                            </div>
                        </template>
                        <div class="col-12 d-flex justify-content-end">
                            <button class="btn btn-primary" @click="handleCreate">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
