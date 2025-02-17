<script setup lang="ts">
import type { Account } from "@/types/team-builder"

const props = defineProps<{
    sets: Account[]
}>()

/**
 * Programmatically closes the modal. This has to be done via plain JS because wrapping the modal
 * with the import from the Bootstrap library complains about the modal returning null.
 */
function closeModal() {
    const modalEl = document.getElementById("import-export-modal")

    if (modalEl) {
        const buttonEl = modalEl.querySelector(".btn-close")

        if (buttonEl) buttonEl.dispatchEvent(new Event("click"))
    }
}

/**
 * Copies the current value of the textarea input to the clipboard.
 */
function copyToClipboard() {
    navigator.clipboard.writeText(JSON.stringify(props.sets))
}

/**
 * Gets the value of the textarea input.
 */
function getTextareaValue() {
    const modalEl = document.getElementById("import-export-modal")

    if (modalEl) {
        const textareaEl = modalEl.querySelector("textarea")

        if (textareaEl) return textareaEl.value
    }

    return ""
}
</script>

<template>
    <div class="modal" id="import-export-modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">JSON Import/Export</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <textarea
                        class="w-100"
                        :value="JSON.stringify(sets)"
                    ></textarea>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        @click="copyToClipboard"
                    >
                        Copy to Clipboard
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="
                            () => {
                                $emit(
                                    'loadSets',
                                    JSON.parse(getTextareaValue()),
                                )
                                closeModal()
                            }
                        "
                    >
                        Load JSON
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
textarea {
    min-height: 20vh;
}
</style>
