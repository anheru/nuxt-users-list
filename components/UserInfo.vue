<template>
  <div class="bg-blue-light md:flex py-4 px-6 items-center mb-4">
    <div class="md:mr-6 center">
      <img
        :src="imageUrl"
        class="circle block w-32 h-32 border-4 rounded-full border-white mx-auto mb-4 md:mb-0"
        :alt="fullname"
      >
    </div>

    <div class="text-white flex-1 text-center md:text-left">
      <h1 class="text-2xl md:text-3xl mb-3 leading-none">{{fullname}}</h1>
      <div class="flex items-center justify-center md:justify-start">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path fill="white" d="M12 .3C7.47.3 3.8 3.96 3.8 8.5c0 6.13 8.2 15.2 8.2 15.2s8.2-9.07 8.2-15.2c0-4.54-3.67-8.2-8.2-8.2zm0 11.12c-1.6 0-2.92-1.3-2.92-2.93s1.3-2.93 2.92-2.93 2.92 1.3 2.92 2.92-1.3 2.92-2.92 2.92z"></path>
        </svg>
        <p>{{location}}</p>
      </div>
    </div>

    <a v-if="profileUrl" :href="profileUrl" class="ml-6 btn btn-white lg:block hidden" target="_blank">{{profileText}}</a>
  </div>
</template>

<script>
export default {
  props: {
    fullname: String,
    country: String,
    imageUrl: String,
    location: String,
    profileUrl: String,
    profileText: {
      type: String,
      default: 'Go Profile'
    }
  }
}
</script>
