<script setup lang="ts">
import { computed } from "vue"
import DailyCommissionCheckbox from "./DailyCommissionCheckbox.vue"

const props = defineProps<{
    category: string
    group: string
    items: Array<string>
}>()

const formattedItems = computed(() => {
    return props.items.map(item => {
        return {
            id: item.replace(" ", "-"),
            text: item,
        }
    })
})
</script>

<template>
    <div class="accordion-item">
        <h2 class="accordion-header" :id="`dailies-group-${group}-header`">
            <button
                class="accordion-button"
                data-bs-toggle="collapse"
                :data-bs-target="`#dailies-group-${group}`"
                aria-expanded="true"
                :aria-controls="`dailies-group-${group}`"
            >
                {{ category }}
            </button>
        </h2>
        <div
            class="accordion-collapse collapse show"
            :id="`dailies-group-${group}`"
            :aria-labelledby="`dailies-group-${group}-header`"
        >
            <div class="accordion-body">
                <template v-for="item in formattedItems">
                    <DailyCommissionCheckbox
                        :id="item.id"
                        :text="item.text"
                    ></DailyCommissionCheckbox>
                </template>
            </div>
        </div>
    </div>
</template>
