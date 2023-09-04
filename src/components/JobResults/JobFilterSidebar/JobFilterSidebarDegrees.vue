<template>
  <job-filter-sidebar-checkbox-group
    :unique-values="UNIQUE_DEGREES"
    :action="userStore.ADD_SELECTED_DEGREES"
  />
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { useDegreesStore } from '@/stores/degrees'
import JobFilterSidebarCheckboxGroup from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarCheckboxGroup.vue'

import { computed } from 'vue'
const userStore = useUserStore()

const degreesStore = useDegreesStore()

const UNIQUE_DEGREES = computed(() => degreesStore.UNIQUE_DEGREES)
</script>
