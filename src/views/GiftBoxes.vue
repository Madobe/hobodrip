<script setup lang="ts">
const dolls = [
    ["Andoris", 0, 3, 2, 0, 1],
    ["Belka", 0, 2, 0, 3, 1],
    ["Centaraussi", 1, 0, 3, 0, 2],
    ["Cheeta", 3, 0, 2, 0, 1],
    ["Colphne", 0, 1, 3, 2, 0],
    ["Daiyan", 0, 3, 2, 1, 0],
    ["Dushevnaya", 2, 3, 0, 1, 0],
    ["Faye", 0, 3, 2, 0, 1],
    ["Groza", 0, 2, 3, 0, 1],
    ["Jiangyu", 2, 3, 0, 1, 0],
    ["Klukay", 3, 0, 0, 2, 1],
    ["Krolik", 2, 1, 0, 0, 3],
    ["Ksenia", 3, 1, 2, 0, 0],
    ["Lenna", 3, 0, 1, 2, 0],
    ["Littara", 0, 3, 2, 0, 1],
    ["Lotta", 0, 0, 3, 1, 2],
    ["Macchiato", 2, 0, 1, 0, 3],
    ["Mechty", 3, 0, 2, 0, 1],
    ["Mosin-Nagant", 0, 1, 2, 3, 0],
    ["Nagant", 0, 0, 1, 3, 2],
    ["Nemesis", 1, 3, 0, 2, 0],
    ["Papasha", 2, 3, 0, 1, 0],
    ["Peri", 0, 0, 2, 1, 3],
    ["Peritya", 3, 0, 0, 2, 1],
    ["Qiongjiu", 0, 1, 0, 2, 3],
    ["Sabrina", 1, 3, 2, 0, 0],
    ["Sharkry", 0, 1, 0, 3, 2],
    ["Springfield", 0, 2, 3, 0, 1],
    ["Suomi", 1, 2, 3, 0, 0],
    ["Tololo", 3, 0, 0, 1, 2],
    ["Ullrid", 0, 2, 1, 0, 3],
    ["Vector", 1, 0, 2, 0, 3],
    ["Vepley", 0, 2, 0, 3, 1],
    ["Zhaohui", 1, 0, 3, 0, 2],
]

function fieldClasses(data: string | number) {
    if (data === 1) return "text-white-50"
    else if (data === 3) return "table-success"
    else return ""
}

function formatField(data: string | number) {
    if (typeof data === "string") return data
    else if (!data) return ""
    else if (data === 1) return "+25%"
    else if (data === 2) return "+50%"
    else if (data === 3) return "+75%"
    else return ""
}
</script>

<template>
    <div class="col-md-10 offset-md-1">
        <table class="table" data-toggle="table" data-search="true">
            <thead>
                <tr>
                    <th scope="col">Doll</th>
                    <th scope="col">Gift Box 1</th>
                    <th scope="col">Gift Box 2</th>
                    <th scope="col">Gift Box 3</th>
                    <th scope="col">Gift Box 4</th>
                    <th scope="col">Gift Box 5</th>
                </tr>
            </thead>
            <tbody id="gift-box-table" class="table-group-divider">
                <tr v-for="doll in dolls">
                    <td v-for="data in doll" :class="fieldClasses(data)">
                        {{ formatField(data) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
