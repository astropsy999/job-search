<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flax-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>
        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            :to="{
              name: 'JobResults',
              query: {
                page: previousPage
              }
            }"
            role="link"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Previous</router-link
          >
          <router-link
            v-if="nextPage"
            role="link"
            :to="{
              name: 'JobResults',
              query: {
                page: nextPage
              }
            }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import JobListing from '@/components/JobResults/JobListing.vue'
import { useJobsStore } from '@/stores/jobs'
import { useDegreesStore } from '@/stores/degrees'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import usePreviousAndNextPages from '@/composables/usePreviousAndNextPages'

const jobStore = useJobsStore()
onMounted(jobStore.FETCH_JOBS)
const degreesStore = useDegreesStore()
onMounted(degreesStore.FETCH_DEGREES)

const route = useRoute()

const currentPage = computed(() => Number.parseInt((route.query.page as string) || '1'))
const FILTERED_JOBS = computed(() => jobStore.FILTERED_JOBS)
const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10))

const { previousPage, nextPage } = usePreviousAndNextPages(currentPage, maxPage)

const displayedJobs = computed(() => {
  const pageNumber = currentPage.value
  const firstJobIndex = (pageNumber - 1) * 10
  const lastJobIndex = pageNumber * 10
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex)
})
</script>
