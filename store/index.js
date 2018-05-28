import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      heroes: []
    },

    mutations: {
      addHeroes(state, data) {
        state.heroes = state.heroes.concat(data)
      }
    },

    getters: {
      heroes: (state) => state.heroes
    },

    actions: {
      getAllHeroes({commit, state}) {
        if (state.heroes.length === 0) {
          axios.get(`https://api.opendota.com/api/heroStats`)
            .then(({data}) => {
              commit('addHeroes', data)
            })
        }
      }
    }
  })
}

export default createStore
