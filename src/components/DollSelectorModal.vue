<script setup lang="ts">
import type { Doll } from "@/types/attachments";

import _dolls from "@/assets/data/doll-db.json"
import { computed } from "vue";

const props = defineProps<{
    addedDolls: string[]
}>()

const dolls = computed( () => {
    let _
    let tmp: { [ key: string ]: Doll } = Object.assign( {}, _dolls )

    for ( const key in tmp ) {
        if ( props.addedDolls.includes( key ) ) {
            /* eslint-disable @typescript-eslint/no-unused-vars */
            ( { [ key ]: _, ...tmp } = tmp )
        }
    }

    return tmp
} )

/**
 * Processes the given path into a valid src path.
 * @param path The string to convert to a URL object.
 */
function toSrc ( path: string ) {
    return new URL( path, import.meta.url ).toString()
}
</script>

<template>
    <div class="modal modal-fullscreen" id="doll-selector-modal">
        <div class="modal-dialog modal-fullscreen-sm-down modal-xl">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-4 col-md-2" v-for=" ( doll, key ) in dolls " v-bind:key="key">
                                <figure class="figure w-100 p-2" @click="$emit( 'selectDoll', key )">
                                    <img :class="[ 'w-100 rounded', doll.rarity === 0 ? 'bg-standard' : 'bg-elite' ]"
                                        :alt="key.toString()" :src="toSrc( doll.img_path )">
                                    <figcaption class="d-none d-md-block figure-caption text-center user-select-none">
                                        {{ key }}
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
img {
    aspect-ratio: 1/1;
}

figure {
    cursor: pointer;
}
</style>
