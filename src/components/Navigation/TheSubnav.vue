<template>
  <div class="w-full border-b h-16 border-solid border-brand-gray-1 bg-white">
    <div v-if="onJobResultsPage" class="flex h-full items-center px-8">
      <div>
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
      </div>
      <span><span class="text-brand-green-1">1653</span> jobes matched</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheSubnav',
  data() {
    return {
      onJobResultsPage: true
    }
  }
}
</script>
