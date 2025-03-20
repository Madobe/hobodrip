<script setup lang="ts">
import { computed, reactive } from "vue"

import placeholderImg from "@/assets/images/placeholder.png"

const emit = defineEmits( [ "dollDeselect", "dollSelect" ] )
const props = withDefaults(
    defineProps<{
        doll: string
        dollsToPaths: { [ x: string ]: string },
        index?: number
        isSupport?: boolean
        select?: boolean
        selectedTeam?: number
        supportTeams?: number[]
        teams?: number[]
    }>(),
    {
        select: false,
        selectedTeam: 0,
        supportTeams: () => [],
        teams: () => [],
    },
)

const greyedOut = reactive( new Set<string> )

const selectDoll = () => {
    if ( !greyedOut.has( props.doll ) ) {
        if ( props.select ) emit( "dollSelect", props.doll )
        else emit( "dollDeselect", props.index )
    }
}

const src = computed( () => {
    const key = props.doll as keyof typeof props.dollsToPaths
    const path = props.dollsToPaths[ key ]

    return path || placeholderImg
} )

const supportBadgeClasses = computed( () => {
    if ( props.supportTeams.includes( props.selectedTeam ) ) {
        return "text-bg-primary"
    }

    return ""
} )

const toggleGreyedOut = ( doll: string ) => {
    if ( props.select ) {
        if ( greyedOut.has( doll ) ) greyedOut.delete( doll )
        else greyedOut.add( doll )
    }
    debugger
}
</script>

<template>
    <figure class="figure position-relative" @click.exact="selectDoll()" @click.shift="toggleGreyedOut( doll )">
        <img :class="[ 'img-fluid rounded mx-auto d-block user-select-none',
<<<<<<< Updated upstream
            select ? 'bg-secondary' : '', !!teams.length ? 'opacity-25' : '', greyedOut.has( doll ) ? 'opacity-25' : '' ]"
            :src="src" :alt="doll" />
        <template v-for=" ( team, i ) in teams " v-bind:key="i">
=======
            select ? 'bg-secondary' : '', !!teams.length ? 'opacity-25' : '', greyedOut.has( doll.name ) ? 'opacity-25' : '' ]"
            :src="src" :alt="doll.name" />
        <template v-for=" ( team, i ) in teams " :key="i">
>>>>>>> Stashed changes
            <span v-if=" !!teams.length " :class="[ `badge rounded-pill position-absolute top-0`,
                selectedTeam === team - 1 ? 'text-bg-primary' : '' ]">
                {{ team }}
            </span>
        </template>
        <span v-if=" isSupport " :class="[ 'badge rounded-pill position-absolute top-0 end-0', supportBadgeClasses ]">
            S
        </span>
        <figcaption class="d-none d-md-block figure-caption text-center user-select-none">
            {{ doll || "&nbsp;" }}
        </figcaption>
    </figure>
</template>

<style scoped>
figure>img {
    aspect-ratio: 1/1;
    cursor: pointer;
    max-height: 90px;
    max-width: min(90px, 100%);
    object-fit: contain;
}

figure>figcaption {
    cursor: pointer;
}

.badge.rounded-circle {
    aspect-ratio: 1/1;
}
</style>
