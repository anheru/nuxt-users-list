<template>
  <article class="c-github-user slideInUp animated" v-show="!isLoading">
    <div class="h-48 lg:h-auto bg-white rounded-t lg:rounded-t-none lg:rounded-l overflow-hidden">
      <img
        class="c-github-user__image"
        :src="user.avatar_url"
        :alt="`${user.login}'s avart`"
      />
    </div>

    <div class="overflow-hidden bg-white border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
      <div>
        <nuxt-link :to="`/${user.login}`" class="text-black font-bold text-xl mb-2">{{user.login}}</nuxt-link>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    delay: {
      type: [String, Number],
      default: 0
    }
  },

  data () {
    return {
      isLoading: true
    }
  },

  created () {
    if (process.browser) {
      setTimeout(() => {
        this.isLoading = false
      }, this.delay * 225)
    }
  }
}
</script>

