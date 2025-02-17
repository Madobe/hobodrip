<script setup lang="ts">
import type { Account } from "@/types/team-builder"

defineProps<{
    selectedAccount: number
    sets: Account[]
}>()
</script>

<template>
    <div class="modal" id="set-change-modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Choose a team set</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <div
                        v-for="(account, i) in sets"
                        :class="[
                            'container-fluid p-3 rounded',
                            selectedAccount === i
                                ? 'bg-primary'
                                : 'bg-secondary',
                            !!i ? 'mt-2' : '',
                        ]"
                        @click="$emit('selectAccount', i)"
                    >
                        <div class="form-floating">
                            <input
                                type=" text"
                                class="form-control"
                                :id="`account-name-input-${i}`"
                                :placeholder="`Account ${i + 1}`"
                                :value="account.name"
                                @input="
                                    (event: Event) =>
                                        $emit(
                                            'renameAccount',
                                            i,
                                            (event.target as HTMLInputElement)
                                                .value,
                                        )
                                "
                            />
                            <label :for="`account-name-input-${i}`"
                                >Set {{ i + 1 }}</label
                            >
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-light"
                        @click="$emit('removeSet')"
                    >
                        Remove last set
                    </button>
                    <button
                        type="button"
                        class="btn btn-light"
                        @click="$emit('addSet')"
                    >
                        Add new set
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
