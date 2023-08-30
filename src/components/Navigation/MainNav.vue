<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div class="flex flex-nowrap h-full border-b border-solid border-brand-gray-1 px-8">
        <router-link :to="{ name: 'Home' }" class="flex h-full items-center text-xl"
          >Get Job</router-link
        >
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li v-for="menuItem in menuItems" :key="menuItem.text" class="h-full ml-9 first:ml-0">
              <router-link :to="menuItem.url" class="flex h-full items-center py-2.5">{{
                menuItem.text
              }}</router-link>
            </li>
          </ul>
        </nav>
        <div class="flex ml-auto items-center h-full">
          <ProfileImage v-if="isLoggedIn" />
          <ActionButton v-else text="Sign In" @click="loginUser" />
        </div>
      </div>
      <the-subnav v-if="isLoggedIn" />
    </div>
  </header>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import ActionButton from '@/components/Shared/ActionButton.vue'
import ProfileImage from '@/components/Navigation/ProfileImage.vue'
import TheSubnav from '@/components/Navigation/TheSubnav.vue'

export default {
  name: 'MainNav',
  components: {
    ActionButton,
    ProfileImage,
    TheSubnav
  },
  data() {
    return {
      menuItems: [
        { text: 'Teams', url: '/' },
        { text: 'Locations', url: '/' },
        { text: 'Life at Job', url: '/' },
        { text: 'How We Hire', url: '/' },
        { text: 'Students', url: '/' },
        { text: 'Jobs', url: '/jobs/results/' }
      ]
    }
  },
  computed: {
    ...mapState(useUserStore, ['isLoggedIn']),
    headerHeightClass() {
      return {
        'h-16': !this.isLoggedIn,
        'h-32': this.isLoggedIn
      }
    }
  },
  methods: {
    ...mapActions(useUserStore, ['loginUser'])
  }
}
</script>
