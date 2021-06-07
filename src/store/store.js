import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    count: 0,
    favoritePhotos: new Set(JSON.parse(localStorage.getItem('favorites'))),
    imageFeed: new Set(JSON.parse(localStorage.getItem('image'))),
  },
  mutations: {
    increment (state) {
      state.count++
    },
    addPhoto (state, payload){
        state.favoritePhotos.add(payload.photoId)
        localStorage.setItem("favorites", JSON.stringify(Array.from(state.favoritePhotos)))
        return state.favoritePhotos;
      },
    removePhoto (state, payload){
        state.favoritePhotos.delete(payload.photoId)
        localStorage.setItem("favorites", JSON.stringify(Array.from(state.favoritePhotos)))
        return state.favoritePhotos.delete(payload.photoId);
      },
    addCardsList (state, payload){
      console.log(state.imageFeed);
        state.imageFeed.add(payload.photoId)
        localStorage.setItem("image", JSON.stringify(Array.from(state.imageFeed)))
        return state.imageFeed;
      },


  },
  actions: {
    addPhoto (context, payload) {
        context.commit('addPhoto', payload)
      },
    removePhoto (context, payload) {
        context.commit('removePhoto', payload)
      },
    addCardsList (context, payload) {
      context.commit('addCardsList', payload)
    },
  },
  getters: {
      photosSet (state) {
          return state.favoritePhotos
      },
      cardsList (state) {
        return state.imageFeed
    }
  }
})

export default store;