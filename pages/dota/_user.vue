<template>
  <main class="container mx-auto px-6">
    <div class="w-full md:w-5/6 mx-auto">
      <user-info
        :fullname="user.profile.name"
        :image-url="user.profile.avatarfull"
        :location="currentCountry.name"
        :profile-url="user.profile.profileurl"
        profile-text="Visit Steam"
      />

      <div class="flex -mx-2">
        <article class="w-full lg:w-2/3 px-2">
          <div class="bg-white py-3 px-4">
            <h2 class="mb-4 uppercase text-blue-dark">Heroes</h2>
            <div class="overflow-auto" v-show="heroes.length > 0">
              <table class="w-full">
                <thead>
                  <tr>
                    <th class="table-head">Name</th>
                    <th class="table-head">Win Rate</th>
                    <th class="table-head">Attack Type</th>
                    <th class="table-head">Primary Attr</th>
                  </tr>
                </thead>

                <tbody>
                  <row-hero
                    v-for="(hero, index) in userHeroes"
                    v-if="index <= 20"
                    :hero="hero"
                    :key="hero.hero_id"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </article>

        <div class="lg:w-1/3 px-2 lg:block hidden">
          <div class=" bg-white py-3 px-4" >
            <h2 class="mb-4 uppercase text-blue-dark">Winrate</h2>
            <span v-show="winLose">{{winRate}}</span>
            <div class="bar bar-win">
              <div class="bar-progress" :style="{width: winRate}"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import {countries} from 'country-data'
import {mapGetters, mapActions} from 'vuex'
import RowHero from '~/components/RowHero'
import UserInfo from '~/components/UserInfo'

export default {
  layout: 'landing',
  components: {RowHero, UserInfo},
  data () {
    return {
      user: false,
      userHeroes: [],
      winLose: false
    }
  },

  async asyncData ({ params, error }) {
    return axios.get(`https://api.opendota.com/api/players/${params.user}`)
      .then(({data}) => {
        if (data.profile) {
          return { user: data }
        }
        error({ statusCode: 404, message: 'User not found' })
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'User not found' })
      })
  },

  computed: {
    ...mapGetters([
      'heroes'
    ]),

    currentCountry () {
      return this.user ? countries[this.user.profile.loccountrycode] : false
    },

    winRate () {
      const gamesTotal = this.winLose.win + this.winLose.lose
      const rate = Math.round((this.winLose.win * 100) / gamesTotal)
      return `${rate}%`
    }
  },

  methods: {
    ...mapActions([
      'getAllHeroes'
    ]),

    getWinLose () {
      axios.get(`https://api.opendota.com/api/players/${this.$route.params.user}/wl`)
        .then(({data}) => {
          this.winLose = data
        })
    },

    getHeroes () {
      axios.get(`https://api.opendota.com/api/players/${this.$route.params.user}/heroes`)
        .then(({data}) => {
          this.userHeroes = data
        })
    }
  },

  filters: {
    date (data) {
      const date = new Date(data)
      return data ? `${date.getDate() < 10 ? 0 : ''}${date.getDate()}/${date.getMonth() < 10 ? 0 : ''}${date.getMonth()}/${date.getFullYear()}` : ''
    }
  },

  created () {
    this.getAllHeroes()
    this.getWinLose()
    this.getHeroes()
  },

  head () {
    return {
      title: `${this.user.profile.name}'s profile`,
      meta: [
        { hid: 'description', name: 'description', content: `${this.user.profile.name}'s profile`},
        { hid: 'og:image', property: 'og:image', content: this.user.profile.avatarfull}
      ]
    }
  }
}
</script>
