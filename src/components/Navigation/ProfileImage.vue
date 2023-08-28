<template>
  <img :src="imageLink" class="h-8 w-8 rounded-3xl object-containl" alt="User profile image" />
</template>

<script>
export default {
  name: 'ProfileImage',
  data() {
    return {
      imageLink: 'https://stuzhuk.online/assets/img/me.png'
    }
  }
}
</script>
