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

<script lang="ts" setup>
import { useJobsStore } from '@/stores/jobs'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const onJobResultsPage = computed(() => route.name === 'JobResults')
const jobStore = useJobsStore()
const FILTERED_JOBS = computed(() => jobStore.FILTERED_JOBS)
</script>
