<template>
  <main class=" container mx-auto  px-6">
    <div class="w-full md:w-5/6 mx-auto">
      <h1 class="text-center mb-4 uppercase">Pro gamers</h1>
      <div class="overflow-auto">
        <table class="bg-white w-full" >
          <thead>
            <tr>
              <th class="table-head">Name</th>
              <th class="table-head">Team</th>
              <th class="table-head">Country</th>
              <th class="table-head">Last Match</th>
            </tr>
          </thead>

          <tbody>
            <row-user
              v-for="user in allUsers"
              :user="user"
              :key="user.account_id"
            />
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import RowUser from '~/components/RowUser'

export default {
  layout: 'landing',
  components: {
    RowUser
  },

  data () {
    return {
      users: [],
      usersCount: 10
    }
  },

  async asyncData ({ params, error }) {
    return axios.get(`https://api.opendota.com/api/proPlayers`)
      .then(({data}) => {
        return { users: data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Users not found' })
      })
  },

  computed: {
    allUsers () {
      return this.users.slice(0, 10)
    }
  }
}
</script>
