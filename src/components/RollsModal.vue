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
              <!-- Loop through rolledItems and display each item -->
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

// List of doll names that include hyphens
const hyphenatedDollNames = [
    "Mosin-Nagant"
]

// Import all doll images from the specified directory
const files: Record<string, string> = import.meta.glob(
    "@/assets/images/dolls/*.png",
    { eager: true, import: "default" },
)

// Extract paths of the imported images
const paths = Object.values(files)

// Extract doll names from the image paths
const dolls = paths.map((path: string) => {
    let doll = path.replace(/^.*[\\/](.+).png$/, "$1")

    // Check if the doll name includes any hyphenated names
    for (let i = 0; i < hyphenatedDollNames.length; i++) {
        if (doll.includes(hyphenatedDollNames[i])) return hyphenatedDollNames[i]
    }

    // Remove any suffix after a hyphen
    doll = doll.replace(/-.*/, "")

    return doll
})

// Create a mapping of doll names to their image paths
const dollsToPaths = dolls.reduce((accumulator, doll, i) => {
    return Object.assign(accumulator, {
        [doll]: paths[i]
    })
}, {})

// Access the pulls store
const pulls = usePullsStore()

// Compute the rolled items from the pulls store
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
