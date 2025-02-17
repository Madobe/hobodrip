import type { Account } from "@/types/team-builder"

import { defineStore } from "pinia"

export const useTeamsStore = defineStore("teams", {
    state: () => ({
        selectedAccount: 0,
        selectedTeam: 0,
        teams: [] as Account[],
    }),
    getters: {
        selectedDolls(): string[] {
            return this.teams[this.selectedAccount].teams
        },
    },
    actions: {
        addSet() {
            this.teams.push({
                name: `Account ${this.teams.length + 1}`,
                teams: Array(15).fill(""),
            })
            this.updateLocalStorage()
        },
        deselectDoll(index: number) {
            this.teams[this.selectedAccount].teams[index] = ""
            this.updateLocalStorage()
        },
        loadSets(sets: Account[]) {
            this.teams = sets
            // Don't need to update the localStorage here because this only gets called when
            // loading the localStorage
        },
        removeSet() {
            this.teams.pop()
            this.selectedAccount = 0
            this.updateLocalStorage()
        },
        renameAccount(index: number, name: string) {
            this.teams[index].name = name
            this.updateLocalStorage()
        },
        resetSelections() {
            this.teams[this.selectedAccount].teams = Array(15).fill("")
            this.updateLocalStorage()
        },
        selectAccount(newAccount: number) {
            this.selectedAccount = newAccount
        },
        selectDoll(doll: string) {
            const currentTeam = this.selectedDolls.slice(
                this.selectedTeam * 5,
                this.selectedTeam * 5 + 5,
            )

            if (currentTeam.includes(doll)) return

            const nextEmpty = currentTeam.indexOf("")

            if (nextEmpty !== -1) {
                this.teams[this.selectedAccount].teams[
                    this.selectedTeam * 5 + nextEmpty
                ] = doll
            }

            this.updateLocalStorage()
        },
        selectTeam(newTeam: number) {
            this.selectedTeam = newTeam
        },
        updateLocalStorage() {
            localStorage.setItem(
                "hobodrip.teambuilder",
                JSON.stringify(this.teams),
            )
        },
    },
})
