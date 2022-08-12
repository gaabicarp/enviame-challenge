import Vue from 'vue'
import Vuex from 'vuex'
import { public_key, hash_key } from "../keys";
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    characters: [],
    page: 1
  },
  mutations: {
    getCharacters(state, payload){
      console.log(payload.nameCharacter)
      axios
        .get(
          `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${public_key}&hash=${hash_key}&offset=${state.characters.length}${payload.nameCharacter ? `&nameStartsWith=${payload.nameCharacter}`: ''}`
        )
        .then((res) => {
          // console.log(res);
          res.data.data.results.forEach((item) => {
            state.characters.push(item);
          });
          if(payload.infiniteLoaderContext){
            payload.infiniteLoaderContext.loaded()
          }
        })
        .catch((err) => {
          console.log(err);
          if(payload.infiniteLoaderContext){
            payload.infiniteLoaderContext?.complete()
          }
        });
    },
    clearCharacters(state){
      state.characters = [];
    },
    editCharacter(state, payload){
      let index = state.characters.findIndex(ch => ch.id == payload.character.id)
      state.characters[index] = payload.character
    },
    createCharacter(state, payload){
      let index = state.characters.findIndex(ch => ch.name == payload.character.name)
      if(index === -1){
        state.characters.unshift(payload.character)
      } else {
        console.error('Personaje existente')
      }
    }
  },
  actions: {
    getCharacters({ commit }, payload) {
      commit('getCharacters', {
        infiniteLoaderContext: payload.infiniteLoaderContext,
        nameCharacter: payload.nameCharacter
      })
    },
    clearCharacters({commit}){
      commit('clearCharacters')
    },
    editCharacter({ commit }, payload) {
      commit('editCharacter', {
        character: payload.character
      })
    },
    createCharacter({ commit }, payload) {
      commit('createCharacter', {
        character: payload.character
      })
    },
  },
  modules: {
  }
})
