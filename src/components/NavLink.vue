<script setup lang="ts">
import { RouterLink } from "vue-router"

defineProps<{
    to: string
}>()
</script>

<template>
    <li class="nav-item">
        <RouterLink class="nav-link" :to="to">
            <slot></slot>
        </RouterLink>
    </li>
</template>
