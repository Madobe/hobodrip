<script setup lang="ts">
import type { Doll } from '@/models/doll';
import { ref } from 'vue'

const props = defineProps<{
    doll: Doll
}>()
const emit = defineEmits( [ "changeAffinity" ] )

const affinity = ref( 1 )
const covenant = ref( false )

function increaseAffinity () {
    if ( affinity.value === 5 && covenant.value === false ) {
        covenant.value = true
        emit( "changeAffinity", props.doll, affinity.value, covenant.value )
        return
    }

    affinity.value++

    if ( affinity.value > 8 ) {
        affinity.value = 1
        covenant.value = false
    }

    emit( "changeAffinity", props.doll, affinity.value, covenant.value )
}
</script>

<template>
    <div class="position-relative">
        <slot></slot>
        <div :class="[ 'position-absolute top-0 left-0 user-select-none', covenant ? 'covenant-affinity-label' : 'affinity-label' ]"
            @click="increaseAffinity">
            {{ "0" + affinity }}
        </div>
    </div>
</template>

<style lang="css" scoped>
.affinity-label,
.covenant-affinity-label {
    color: black;
    height: 35px;
    line-height: 35px;
    text-align: center;
    width: 35px;
}

.affinity-label {
    background: transparent url('/hobodrip/images/affinity_level.png') 0px 0px/contain no-repeat;
}

.covenant-affinity-label {
    background: transparent url('/hobodrip/images/covenant_affinity_level.png') 0px 0px/contain no-repeat;
}
</style>
