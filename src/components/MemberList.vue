<script setup lang="ts">
const members = [
    {
        ign: "Fives",
        uid: "16253",
        username: "_5am_",
    },
    {
        ign: "Nanamin",
        uid: "301209",
        username: "nanamin",
    },
    {
        ign: "Zniper",
        uid: "146910",
        username: "zniper20",
    },
    {
        ign: "Jyubei",
        uid: "66055",
        username: "jyubei",
    },
    {
        ign: "Z",
        uid: "28381",
        username: "Zlare",
    },
    {
        ign: "DeltaReckoner",
        uid: "421412",
        username: "deltareckoner",
    },
    {
        ign: "ClownHeli",
        uid: "488121",
        username: "sneaky6540",
    },
    {
        ign: "Shuvi",
        uid: "775390",
        username: "exshuvi",
    },
    {
        ign: "Nataly",
        uid: "727922",
        username: "nathin1",
    },
    {
        ign: "SHIDONī",
        uid: "79276",
        username: "shidoni0216",
    },
    {
        ign: "Vyntusius",
        uid: "809631",
        username: "vyntusius",
    },
    {
        ign: "Ain",
        uid: "280464",
        username: "clockworkfigure",
    },
    {
        ign: "RUBEIDO",
        uid: "41218",
        username: "rubeido",
    },
    {
        ign: "Kairu",
        uid: "466557",
        username: "xdkairu",
    },
    {
        ign: "cupkate",
        uid: "1470046",
        username: "cupkate",
    },
    {
        ign: "Kelvin",
        uid: "471754",
        username: "kelvinkhant",
    },
    {
        ign: "Kayo",
        uid: "456185",
        username: "_henkayo_",
    },
    {
        ign: "mak0s",
        uid: "16996",
        username: "mk0i",
    },
    {
        ign: "Rooi",
        uid: "53801",
        username: ".texastheomertosa",
    },
    {
        ign: "Kuu Aro",
        uid: "29548",
        username: "kuuaro",
    },
    {
        ign: "UnJ",
        uid: "137630",
        username: "",
        notes: "Kuu Aro's friend",
    },
    {
        ign: "Khanwan00",
        uid: "820342",
        username: "khanwan",
    },
    {
        ign: "Aorinji",
        uid: "981945",
        username: "aorinji",
    },
    {
        ign: "Chin Chin",
        uid: "51138",
        username: "chievic2030",
    },
    {
        ign: "John Frontline",
        uid: "2231453",
        username: "",
        notes: "Random",
    },
    {
        ign: "Stasia",
        uid: "1454158",
        username: "",
        notes: "Random",
    },
    {
        ign: "Bacharuchuba",
        uid: "1349456",
        username: "",
        notes: "Random"
    },
    {
        ign: "Makoto",
        uid: "2247726",
        username: "jwuihuissusshsushwhw"
    },
    {
        ign: "Lapsniffer",
        uid: "399006",
        username: "abeiros."
    },
    {
        ign: "Lemon",
        uid: "28105",
        username: "lemonblock"
    },
    {
        ign: "GUSU",
        uid: "11739",
        username: "gusu"
    },
    {
        ign: "Max",
        uid: "22926",
        username: "maxxxymooo"
    },
    {
        ign: "Zero",
        uid: "63206",
        username: "",
        notes: "Random"
    },
    {
        ign: "Magnets",
        uid: "270852",
        username: "magnetsfgc"
    },
    {
        ign: "Cylnoir",
        uid: "23800",
        username: "cylnoir"
    },
    {
        ign: "gerryg2t",
        uid: "251911",
        username: ""
    }
]
</script>

<template>
    <table class="table" data-toggle="table" data-search="true">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">IGN</th>
                <th scope="col">UID</th>
                <th scope="col">Discord Username</th>
                <th scope="col">Notes</th>
            </tr>
        </thead>
        <tbody id="member-list-table" class="table-group-divider">
            <tr v-for=" ( member, i ) in members " v-bind:key="member.username">
                <td>{{ i + 1 }}</td>
                <td>{{ member.ign }}</td>
                <td>{{ member.uid }}</td>
                <td>{{ member.username }}</td>
                <td>{{ member.notes }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped></style>
