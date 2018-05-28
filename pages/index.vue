<template>
  <main class="container mx-auto px-4  lg:w-3/4">
    <h1 class="text-blue-darker text-center mb-4 md:mt-4">GitHub Users</h1>
    <section class="flex flex-wrap  w-full">
      <div class="lg:w-1/4 md:w-1/2 w-full px-3 mb-4" v-for="(user, index) in users" :key="user.id">
        <github-user
          :user="user"
          :delay="index"
        />
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios'
import GithubUser from '~/components/GithubUser'

export default {
  layout: 'landing',
  components: {GithubUser},
  async asyncData ({ params, error }) {
    return axios.get(`https://api.github.com/users`)
      .then(({data}) => {
        return { users: data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Users not found' })
      })
  },

  head () {
    return {
      title: 'GitHub Users',
      meta: [
        { hid: 'description', name: 'description', content: 'GitHub Users'}
      ]
    }
  }
}
</script>

