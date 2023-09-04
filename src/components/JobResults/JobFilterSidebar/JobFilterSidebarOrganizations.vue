<template>
  <job-filter-sidebar-checkbox-group
    :unique-values="UNIQUE_ORGANIZATIONS"
    :action="userStore.ADD_SELECTED_ORGANIZATIONS"
  />
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import JobFilterSidebarCheckboxGroup from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarCheckboxGroup.vue'

const UNIQUE_ORGANIZATIONS = computed(() => jobStore.UNIQUE_ORGANIZATIONS)

const jobStore = useJobsStore()
const userStore = useUserStore()
</script>
