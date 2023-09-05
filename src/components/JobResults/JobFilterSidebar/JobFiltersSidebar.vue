<template>
  <div class="flex flex-col border-r border-brand-gray-1 bg-white p-4">
    <section class="pb-5">
      <job-filter-sidebar-prompt />
      <job-filter-sidebar-skills />
      <collapsible-accordion header="Job Types">
        <job-filter-sidebar-job-types />
      </collapsible-accordion>

      <collapsible-accordion header="Organizations">
        <job-filter-sidebar-organizations />
      </collapsible-accordion>

      <collapsible-accordion header="Degrees">
        <job-filter-sidebar-degrees />
      </collapsible-accordion>
    </section>
  </div>
</template>

<script lang="ts" setup>
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
import JobFilterSidebarJobTypes from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarJobTypes.vue'
import JobFilterSidebarOrganizations from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarOrganizations.vue'
import JobFilterSidebarDegrees from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarDegrees.vue'
import JobFilterSidebarPrompt from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarPrompt.vue'
import JobFilterSidebarSkills from './JobFilterSidebarSkills.vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'

const route = useRoute()
const userStore = useUserStore()

const parseSkillsSearchTerm = () => {
  const role = (route.query.role as string) || ''
  userStore.UPDATE_SKILLS_SEARCH_TERM(role)
}
onMounted(parseSkillsSearchTerm)
</script>
