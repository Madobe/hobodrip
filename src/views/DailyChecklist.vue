<script setup lang="ts">
import DailyCommissionCategory from "../components/DailyCommissionCategory.vue"
</script>

<template>
    <div class="container-fluid">
        <div class="col-12 col-md-10 offset-md-1">
            <div class="accordion mt-3">
                <DailyCommissionCategory
                    category="General"
                    group="1"
                    :items="[
                        'Daily commissions',
                        'Battle pass tasks',
                        'Claim Peak Value Assessment rewards',
                        'Do Expansion Drills',
                        'Boss Fight',
                        'Claim Daily Supply Box (Shop > Quality Selection > Standard Package)',
                        'Burn remaining stamina',
                    ]"
                >
                </DailyCommissionCategory>
                <DailyCommissionCategory
                    category="Event"
                    group="2"
                    :items="[
                        'Spend supply mission tickets',
                        'Complete event commissions',
                        'Events without lobby banners (eg. Endless Projections)',
                    ]"
                ></DailyCommissionCategory>
                <DailyCommissionCategory
                    category="Platoon"
                    group="3"
                    :items="[
                        'Claim supply boxes',
                        'Do essential task daily mission',
                        'Do Gunsmoke Frontline missions',
                        'Check for inactive members',
                    ]"
                ></DailyCommissionCategory>
            </div>
        </div>
    </div>
</template>
