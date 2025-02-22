import { createRouter, createWebHashHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import DailyChecklist from "@/views/DailyChecklist.vue"
import TeamBuilder from "@/views/TeamBuilder.vue"
import GiftBoxes from "@/views/GiftBoxes.vue"
import GachaSimulator from "@/views/GachaSimulator.vue"
import AttachmentComparer from "@/views/AttachmentAppraiser.vue"

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/daily-checklist",
            name: "daily-checklist",
            component: DailyChecklist,
        },
        {
            path: "/team-builder",
            name: "team-builder",
            component: TeamBuilder,
        },
        {
            path: "/gift-boxes",
            name: "gift-boxes",
            component: GiftBoxes,
        },
        {
            path: "/gacha-simulator",
            name: "gacha-simulator",
            component: GachaSimulator,
        },
        {
            path: "/attachment-appraiser",
            name: "attachment-appraiser",
            component: AttachmentComparer,
        },
    ],
})

export default router
