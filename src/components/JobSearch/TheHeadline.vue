<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="actionClasses">{{ action }}</span
      ><br />
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job at Get Job</h2>
  </section>
</template>

<script lang="ts" setup>
import { nextElementInList } from '@/utils/nextElementInList'
import { ref, computed, onBeforeUnmount, onMounted } from 'vue'

const action = ref('Build')
const interval = ref<ReturnType<typeof setInterval>>()

const changeTitle = () => {
  interval.value = setInterval(() => {
    const actions = ['Build', 'Create', 'Design', 'Code']
    action.value = nextElementInList(actions, action.value)
  }, 3000)
}
onMounted(changeTitle)

onBeforeUnmount(() => clearInterval(interval.value))

const actionClasses = computed(() => {
  return { [action.value.toLowerCase()]: true }
})
</script>
<style scoped>
.build {
  color: #1a73e8;
}
.create {
  color: #34a853;
}
.design {
  color: #ffd000;
}
.code {
  color: #d93025;
}
</style>
