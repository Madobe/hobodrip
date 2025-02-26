<script setup lang="ts">
import { computed } from "vue"

import placeholderImg from "@/assets/images/placeholder.png"

const props = withDefaults(
    defineProps<{
        doll: string
        dollsToPaths: { [x: string]: string },
        dupe?:number
        index?: number
        isSupport?: boolean
        select?: boolean
        selectedTeam?: number
        supportTeams?: number[]
        teams?: number[]
        displayText?: boolean
    }>(),
    {
        select: false,
        selectedTeam: 0,
        supportTeams: () => [],
        teams: () => [],
        displayText: true,
    },
)

const src = computed(() => {
    const key = props.doll as keyof typeof props.dollsToPaths
    const path = props.dollsToPaths[key]

    return path || placeholderImg
})

const supportBadgeClasses = computed(() => {
    if (props.supportTeams.includes(props.selectedTeam)) {
        return "text-bg-primary"
    }

    return ""
})
</script>

<template>
    <figure class="figure position-relative" @click="select ? $emit('dollSelect', doll) : $emit('dollDeselect', index)">
        <img :class="['img-fluid rounded mx-auto d-block user-select-none',
            select ? 'bg-secondary' : '', !!teams.length ? 'opacity-25' : '']" :src="src" :alt="doll" />
        <span v-if="!!teams.length" v-for="(team, i) in teams" :class="[`badge rounded-pill position-absolute top-0`,
            selectedTeam === team - 1 ? 'text-bg-primary' : '']">
            {{ team }}
        </span>
        <span v-if="isSupport" :class="['badge rounded-pill position-absolute top-0 end-0', supportBadgeClasses]">
            S
        </span>
        <span v-if="dupe" :class="['badge rounded-pill position-absolute top-0 end-0', supportBadgeClasses]">
            V {{ dupe }}
        </span>
        <figcaption v-if="displayText" class="figure-caption text-center user-select-none text-wrap w-100">
            {{ doll || "\u00A0" }}
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
    font-size: clamp(0.7em, 2vw, 1em);
}

.badge.rounded-circle {
    aspect-ratio: 1/1;
}
</style>
