import { defineStore } from "pinia"

import type { ActiveDoll, Doll, Weapon } from "@/types/attachments"

import _dolls from "@/assets/data/doll-db.json"
import _weapons from "@/assets/data/weapon-db.json"

const dolls: { [name: string]: Doll } = _dolls
const weapons: { [name: string]: Weapon } = _weapons

export const useDollsStore = defineStore("dolls", {
    state: () => ({
        data: [] as ActiveDoll[],
    }),
    getters: {
        ordered: state => state.data.sort((a, b) => a.order - b.order),
    },
    actions: {
        addDoll(name: string) {
            const doll = dolls[name]

            this.data.push({
                info: doll,
                name,
                neuralHelix: 6,
                fortifications: !!doll.rarity ? 0 : 6,
                order: this.data.length + 1,
                type: doll.type,
                weapon: {
                    attachments: {},
                    info: weapons[doll.defaultWeapon],
                    name: doll.defaultWeapon,
                },
            } as ActiveDoll)
        },
        changeWeapon(doll: ActiveDoll, name: string) {
            const record = this.data.find(d => d.name === doll.name)

            if (record) {
                record.weapon.name = name
                record.weapon.info.attack = weapons[name].attack
            }
        },
        removeDoll(name: string) {
            this.data.splice(
                this.data.findIndex(doll => doll.name === name),
                1
            )
        },
        swapOrder(doll: ActiveDoll, event: Event) {
            let newOrder = parseInt((event.target as HTMLInputElement).value)
            const otherDoll = this.data.find(d => d.order === newOrder)

            if (newOrder > this.data.length) newOrder = this.data.length
            if (otherDoll) otherDoll.order = doll.order

            doll.order = newOrder
        },
    },
})
