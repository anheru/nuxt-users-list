<template>
  <main class="px-6 container mx-auto lg:w-4/5">
    <user-info
      :fullname="user.name"
      :image-url="user.avatar_url"
      :location="user.location"
      :profile-url="user.html_url"
      profile-text="Visit GitHub"
    />

    <div class="flex -mx-2">
      <article class="w-full lg:w-2/3 px-2">
        <div class="bg-white py-3 px-4">
          <h2 class="mb-4 uppercase text-blue-dark">Repos</h2>
          <div class="overflow-auto">
            <table class="w-full">
              <thead>
                <tr>
                  <th class="table-head">Name</th>
                  <th class="table-head">Forks</th>
                  <th class="table-head">Stars</th>
                  <th class="table-head">Created</th>
                  <th class="table-head">Url</th>
                </tr>
              </thead>
                <tr v-for="repo in repos" :key="repo.id">
                  <td class="table-data">{{repo.name}}</td>
                  <td class="table-data text-center">{{repo.forks}}</td>
                  <td class="table-data text-center">{{repo.stargazers_count}}</td>
                  <td class="table-data text-center">{{repo.created_at | momentDate}}</td>
                  <td class="table-data text-center">
                    <a :href="repo.html_url" target="_blank">
                      <img src="~/static/github.svg" class="w-6">
                    </a>
                  </td>
                </tr>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      </article>

      <div class="lg:w-1/3 px-2 lg:block hidden">
        <div class=" bg-white py-3 px-4" >
          <h2 class="mb-3 uppercase text-blue-dark" v-if="user.bio">Biography</h2>
          <p>{{user.bio}}</p>
          <h2 class="mb-3 uppercase text-blue-dark" :class="{'mt-4' : user.bio}">Followers</h2>
          <p>{{user.followers}}</p>
          <h2 class="mb-3 mt-4 uppercase text-blue-dark">Following</h2>
          <p>{{user.following}}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import UserInfo from '~/components/UserInfo'
import moment from 'moment'

export default {
  layout: 'landing',
  components: {UserInfo},

  data () {
    return {
      user: false,
      repos: []
    }
  },

  async asyncData ({ params, error }) {
    return axios.get(`https://api.github.com/users/${params.username}`)
      .then(({data}) => {
        return { user: data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'User not found' })
      })
  },

  methods: {
    getRepos () {
      axios.get(this.user.repos_url)
        .then(({data}) => {
          this.repos = data
        })
    }
  },

  filters: {
    momentDate (date) {
      return moment(date).fromNow()
    }
  },

  created () {
    this.getRepos()
  },

  head () {
    return {
      title: this.user.name,
      meta: [
        { hid: 'description', name: 'description', content: this.user.bio ? this.user.bio : `${this.user.name}'s profile`},
        { hid: 'og:image', property: 'og:image', content: this.user.avatar_url}
      ]
    }
  }
}
</script>
