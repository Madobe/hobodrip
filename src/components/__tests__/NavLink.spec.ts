import { describe, it, expect } from "vitest"

import { shallowMount } from "@vue/test-utils"
import NavLink from "@/components/NavLink.vue"
import { RouterLink } from "vue-router"

describe("NavLink", () => {
    it("renders properly", () => {
        const wrapper = shallowMount(NavLink, {
            props: {
                to: "test",
            },
        })
        expect(wrapper.findComponent(RouterLink).props("to")).toEqual("test")
    })
})
