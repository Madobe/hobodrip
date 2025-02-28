<script setup lang="ts">
import { Modal } from 'bootstrap';
import { computed, onMounted } from 'vue';

import eliteVideo from "@/assets/videos/elite-gacha.mp4"
import standardVideo from "@/assets/videos/standard-gacha.mp4"

const props = defineProps<{
    type: number
}>()

const src = computed( () => {
    switch ( props.type ) {
        case 1: return eliteVideo
        case 2: return standardVideo
        default: return ""
    }
} )

onMounted( () => {
    new Modal( "#full-screen-video-modal" )
} )
</script>

<template>
    <div class="modal modal-fullscreen" id="full-screen-video-modal" @click="$emit('hideVideo')">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-body">
                    <video class="ratio ratio-16x9" :src="src" autoplay></video>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.modal-body {
    overflow-y: hidden;
}
</style>