<script setup lang="ts">
import { RouterLink } from "vue-router"
import NavLink from "./NavLink.vue"
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/">Hobo Drip</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <NavLink to="/">Member List</NavLink>
                    <NavLink to="daily-checklist">Daily Checklist</NavLink>
                    <NavLink to="team-builder">Team Builder</NavLink>
                    <NavLink to="attachment-optimizer">Optimizer</NavLink>
                    <NavLink to="gacha-simulator">Simulator</NavLink>
                    <NavLink to="gift-boxes">Gift Boxes</NavLink>
                    <li class="nav-item">
                        <a class="nav-link" target="_blank" href="https://ko-fi.com/sakatamakita">Donate</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>
