<template>
  <job-filter-sidebar-checkbox-group
    :unique-values="UNIQUE_JOB_TYPES"
    :action="userStore.ADD_SELECTED_JOB_TYPES"
  />
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { useJobsStore } from '@/stores/jobs'

import { computed } from 'vue'
import JobFilterSidebarCheckboxGroup from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarCheckboxGroup.vue'

const UNIQUE_JOB_TYPES = computed(() => jobStore.UNIQUE_JOB_TYPES)
const userStore = useUserStore()
const jobStore = useJobsStore()
</script>
