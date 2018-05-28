<template>
  <tr class="hover:bg-blue-lightest">
    <td class="table-data">
      <div class="flex items-center">
        <figure class="bg-grey-darker my-0 ml-0 mr-4" v-if="currentHero">
          <img
            :src="`${apiUrl}${currentHero.icon}`"
            class="block"
            width="32" height="32"
            :alt="currentHero.localized_name"
          />
        </figure>
        <span
          class="text-blue hover:text-blue-darker">{{currentHero.localized_name}}
        </span>
      </div>
    </td>

    <td class="table-data text-center">{{winRate}}</td>
    <td class="table-data text-center">{{currentHero.attack_type}}</td>
    <td class="table-data text-center uppercase">{{currentHero.primary_attr}}</td>
  </tr>
</template>

<script>
import {countries} from 'country-data'
import {mapGetters} from 'vuex'

export default {
  props: {
    hero: {
      required: true,
      type: Object
    }
  },

  data () {
    return {
      apiUrl: 'https://api.opendota.com'
    }
  },

  computed: {
    ...mapGetters([
      'heroes'
    ]),

    winRate () {
      const rate = Math.round((this.hero.win * 100) / this.hero.games)
      return `${rate}%`
    },

    currentHero () {
      return this.heroes.length ? this.heroes.find((h) => h.hero_id == this.hero.hero_id) : false
    }
  }
}
</script>
