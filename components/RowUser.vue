<template>
  <tr class="hover:bg-blue-lightest">
    <td class="table-data">
      <div class="flex items-center">
        <figure class="bg-grey my-0 ml-0 mr-4 w-6 h-6">
          <img :src="user.avatar" v-if="user.avatar" class="block w-6 h-6" />
        </figure>
        <nuxt-link
          :to="`/dota/${user.account_id}`"
          class="text-blue hover:text-blue-darker">{{user.name}}
        </nuxt-link>
      </div>
    </td>

    <td class="table-data text-center">
      <p class="text-blue-dark font-semibold">{{user.team_name}}</p>
      <span class="text-xs">{{user.team_tag}}</span>
    </td>

    <td class="table-data text-center">{{currentCountry ? currentCountry.name : ''}}</td>
    <td class="table-data text-center">{{user.last_match_time | date}}</td>
  </tr>
</template>

<script>
import {countries} from 'country-data'

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  computed: {
    currentCountry () {
      return this.user ? countries[this.user.loccountrycode] : false
    }
  },

  filters: {
    date (data) {
      const date = new Date(data)
      return data ? `${date.getDate() < 10 ? 0 : ''}${date.getDate()}/${date.getMonth() + 1 < 10 ? 0 : ''}${date.getMonth() + 1}/${date.getFullYear()}` : ''
    }
  }
}
</script>
