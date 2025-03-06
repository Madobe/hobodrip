<script setup lang="ts">
import type { Doll } from "@/models/doll";

import { computed } from "vue";

const props = defineProps<{
    addedDolls: string[],
    allDolls: Doll[],
    limitToGlobal?: boolean
}>()

const dolls = computed( () => props.allDolls.filter( d => !props.addedDolls.includes( d.name ) ) )

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
                            <div class="col-4 col-md-2" v-for=" doll in dolls " v-bind:key="doll.name">
                                <figure class="figure w-100 p-2" @click="$emit( 'selectDoll', doll )">
                                    <img :class="[ 'w-100 rounded', doll.rarity === 0 ? 'bg-standard' : 'bg-elite' ]"
                                        :alt="doll.name" :src="toSrc( doll.img_path )">
                                    <figcaption class="d-none d-md-block figure-caption text-center user-select-none">
                                        {{ doll.name }}
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
