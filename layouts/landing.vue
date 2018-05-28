<template>
  <div class="bg-grey-light">
    <app-header/>
    <nuxt class="min-h-screen mt-8 py-6"/>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue'

export default {
  components: {
    AppHeader
  }
}
</script>
