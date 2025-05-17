<script setup lang="ts">
import untypedMembers from '@/assets/data/members.json'

interface Member {
    ign: string
    inactive?: boolean
    notes?: string
    uid: string
    username: string
}

const members: Member[] = untypedMembers
const tableData = [
    {
        title: "Current",
        data: members.filter( m => !m.inactive )
    },
    {
        title: "Former",
        data: members.filter( m => m.inactive )
    }
]
</script>

<template>
    <template v-for=" ( memberList, a ) in tableData " :key="a">
        <h1>{{ memberList.title }}</h1>
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
                <tr v-for=" ( member, i ) in memberList.data " :key="member.username">
                    <td>{{ i + 1 }}</td>
                    <td>{{ member.ign }}</td>
                    <td>{{ member.uid }}</td>
                    <td>{{ member.username }}</td>
                    <td>{{ member.notes }}</td>
                </tr>
            </tbody>
        </table>
    </template>
</template>
