<script setup lang="ts">
defineProps<{
    id: string
    text: string
}>()
</script>

<template>
    <div class="form-check">
        <input type="checkbox" class="form-check-input" :id="`check-${id}`" />
        <label :for="`check-${id}`" class="form-check-label">{{ text }}</label>
    </div>
</template>
