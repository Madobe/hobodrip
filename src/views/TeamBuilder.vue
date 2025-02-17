<script setup lang="ts">
import { Validator } from "jsonschema"

import { useTeamsStore } from "@/stores/teams"

import DollFigure from "@/components/DollFigure.vue"
import SetChangeModal from "@/components/SetChangeModal.vue"
import JSONModal from "@/components/JSONModal.vue"

const hyphenatedDollNames = [
    "Mosin-Nagant"
]
const teams = useTeamsStore()

const files: Record<string, string> = import.meta.glob(
    "@/assets/images/dolls/*.png",
    { eager: true, import: "default" },
)
const paths = Object.values(files)
const dolls = paths.map((path: string) => {
    let doll = path.replace(/^.*[\\/](.+).png$/, "$1")

    for (let i = 0; i < hyphenatedDollNames.length; i++) {
        if (doll.includes(hyphenatedDollNames[i])) return hyphenatedDollNames[i]
    }

    doll = doll.replace(/-.*/, "")

    return doll
})
const dollsToPaths = dolls.reduce((accumulator, doll, i) => {
    return Object.assign(accumulator, {
        [doll]: paths[i]
    })
}, {})

const dollsPerRow = 4
let dollsByFours: string[][] = []
for (let i = 0; i < dolls.length; i += dollsPerRow) {
    dollsByFours.push(dolls.slice(i, i + dollsPerRow))
}

// Initialize the store's saved teams from the local storage
const validator = new Validator()
const schema = {
    id: "/Sets",
    type: "array",
    items: {
        type: "object",
        properties: {
            name: { "type": "string" },
            teams: {
                type: "array",
                items: {
                    type: "string"
                }
            }
        }
    }
}
const data = localStorage.getItem("hobodrip.teambuilder")

if (data) {
    const parsedData = JSON.parse(data)

    if (validator.validate(parsedData, schema).valid) {
        teams.loadSets(parsedData)
    } else {
        teams.addSet()
    }
} else {
    teams.addSet()
}

// Methods
/**
 * Determines what positions in the selection array the doll occupies. This does not distinguish
 * between core team and support.
 * @param doll {string} The doll name being checked.
 * @return {number[]} The indices that the doll occupies in the teams array.
 */
function getDollIndices(doll: string) {
    return teams.selectedDolls.reduce((arr, val, i) => {
        if (val === doll) arr.push(i)
        return arr
    }, [] as number[])
}
/**
 * Determines what teams a doll that is not a support is on.
 * @param doll {string} The doll name being checked.
 * @return {number[]} The teams that the doll is on.
 */
function getMainTeams(doll: string) {
    return getDollIndices(doll)
        .filter(i => i % 5 !== 4)
        .map(i => Math.floor(i / 5) + 1)
}

/**
 * Determines what teams a doll is supporting.
 * @param doll {string} The doll name being checked.
 * @return {number[]} The teams that the doll is supporting.
 */
function getSupportTeams(doll: string) {
    return getDollIndices(doll)
        .filter(i => i % 5 === 4)
        .map(i => Math.floor(i / 5))
}

/**
 * Determines whether the given doll is in a support slot.
 * @param doll {string} The doll name being checked.
 */
function isSupport(doll: string) {
    return !!getDollIndices(doll).filter(i => i % 5 === 4).length
}
</script>

<template>
    <SetChangeModal :selectedAccount="teams.selectedAccount" :sets="teams.teams" @addSet="teams.addSet"
        @removeSet="teams.removeSet" @renameAccount="teams.renameAccount" @selectAccount="teams.selectAccount">
    </SetChangeModal>
    <JSONModal :sets="teams.teams" @loadSets="teams.loadSets"></JSONModal>

    <div class="container-fluid d-flex flex-column team-roster">
        <div class="row py-3" style="min-height: 0">
            <div class="col-3 col-md-4 mh-100 overflow-x-hidden overflow-y-scroll">
                <div class="row" v-for="dolls in dollsByFours">
                    <div class="col-12 col-md-3" v-for="doll in dolls">
                        <DollFigure :doll="doll" :dollsToPaths="dollsToPaths" :isSupport="isSupport(doll)" select
                            :selectedTeam="teams.selectedTeam" :supportTeams="getSupportTeams(doll)"
                            :teams="getMainTeams(doll)" @dollSelect="teams.selectDoll(doll)"></DollFigure>
                    </div>
                </div>
            </div>

            <div class="col-9 col-md-8 row d-flex flex-column justify-content-center">
                <template v-for="(team, a) in 3">
                    <div :class="[
                        'container-fluid col-md-10 d-flex justify-content-evenly rounded mt-2 pt-4 pe-md-4',
                        a === teams.selectedTeam
                            ? 'bg-primary'
                            : 'bg-secondary',
                    ]" @click="teams.selectTeam(a)">
                        <div class="d-none d-md-flex justify-content-center align-items-center">
                            <span class="text-center fw-bold pb-3 user-select-none">Team {{ team }}</span>
                        </div>
                        <div v-for="(slot, b) in 5">
                            <DollFigure :doll="teams.selectedDolls[a * 5 + b]" :dollsToPaths="dollsToPaths"
                                :index="a * 5 + b" @dollDeselect="teams.deselectDoll">
                            </DollFigure>
                        </div>
                    </div>
                </template>

                <div
                    class="container-fluid col-md-10 mt-2 mt-md-3 grid gap-2 d-md-flex flex-md-row justify-content-end">
                    <button class="btn btn-danger me-md-auto" @click="teams.resetSelections">
                        Reset
                    </button>
                    <button class="btn btn-light" data-bs-target="#set-change-modal" data-bs-toggle="modal">
                        Change Set
                    </button>
                    <button class="btn btn-light ms-md-2" data-bs-target="#import-export-modal" data-bs-toggle="modal">
                        Import/Export
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#import-export-modal textarea {
    min-height: 20vh;
}

.team-roster {
    height: calc(100vh - 4rem);
    min-height: 100%;
}

@media (max-width: 767.98px) {
    figure>figcaption {
        display: none;
    }

    .team-roster button {
        width: 100%;
    }

    .team-roster button:not(:first-child) {
        margin-top: 0.5rem;
    }
}
</style>
