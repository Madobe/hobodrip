<template>
  <div class="modal fade" id="rolls-modal" tabindex="-1" aria-labelledby="rollsModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="rollsModalLabel">Rolled Items</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row">
              <div v-for="(count, item) in rolledItems" :key="item" class="col-4 text-center">
                <DollFigure :doll="item.toString()" :dollsToPaths="dollsToPaths" :dupe="count - 1"></DollFigure>
              </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePullsStore } from '@/stores/pulls'
import DollFigure from "@/components/DollFigure.vue"

const hyphenatedDollNames = [
    "Mosin-Nagant"
]

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

const pulls = usePullsStore()

const rolledItems = computed(() => {
  return pulls.pulls.reduce((acc: { [x: string]: any }, pull: { name: string | string[] }) => {
    if (Array.isArray(pull.name)) {
      pull.name.forEach(name => {
        if (!name.includes("Retired")) {
          acc[name] = (acc[name] || 0) + 1
        }
      })
    } else {
      if (!pull.name.includes("Retired")) {
        acc[pull.name] = (acc[pull.name] || 0) + 1
      }
    }
    return acc
  }, {} as Record<string, number>)
})
</script>

<style scoped>
.modal-body {
  max-height: 400px;
  overflow-y: auto;
}
</style>
