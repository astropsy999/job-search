<template>
  <collapsible-accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li class="h-8 w-1/2">
            <input id="VueTube" type="checkbox" class="mr-3" /><label for="VueTube">VueTube</label>
          </li>
          <li class="h-8 w-1/2">
            <input id="Between vue" type="checkbox" class="mr-3" /><label for="Between vue"
              >Between vue</label
            >
          </li>
          <li class="h-8 w-1/2">
            <input id="Et Vue Brute" type="checkbox" class="mr-3" /><label for="Et Vue Brute"
              >Et Vue Brute</label
            >
          </li>
          <li class="h-8 w-1/2">
            <input id="Vue And a Half" type="checkbox" class="mr-3" /><label for="Vue And a Half"
              >Vue And a Half</label
            >
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

export default {
  name: 'JobFilterSidebarOrganizations',
  components: { CollapsibleAccordion }
}
</script>

<style></style>
