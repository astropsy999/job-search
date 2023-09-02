<template>
  <div class="w-full border-b h-16 border-solid border-brand-gray-1 bg-white">
    <div v-if="onJobResultsPage" class="flex h-full items-center px-8">
      <div>
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
      </div>
      <span
        ><span class="text-brand-green-1">{{ FILTERED_JOBS.length }}</span> jobs matched</span
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useJobsStore, FILTERED_JOBS } from '@/stores/jobs'
export default {
  name: 'TheSubnav',

  computed: {
    onJobResultsPage() {
      return this.$route.name === 'JobResults'
    },
    ...mapState(useJobsStore, [FILTERED_JOBS])
  }
}
</script>
