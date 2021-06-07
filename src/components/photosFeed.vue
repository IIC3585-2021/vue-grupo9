<template>
  <v-container fluid>
    <v-toolbar color="orange" dark>
      <v-toolbar-title class="mx-6">PhotoBook</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-title class="mx-6">Grupo9</v-toolbar-title>
    </v-toolbar>
    <v-row dense>
      <v-col v-for="card in cards" :key="card.title" cols="3">
        <v-card class="mx-auto my-3" max-width="344">
          <v-img :src="card.src" height="200px"></v-img>

          <v-card-actions>
            <v-tooltip v-if="card.favorite" left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="pink"
                  @click="removeFromFavorites(card)"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon dark>
                    mdi-heart
                  </v-icon>
                </v-btn>
              </template>
              <span>Eliminar de Favoritos</span>
            </v-tooltip>

            <v-tooltip v-else left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="gray"
                  @click="addToFavorites(card)"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon dark>
                    mdi-heart
                  </v-icon>
                </v-btn>
              </template>
              <span>Agregar a Favoritos</span>
            </v-tooltip>
            <v-spacer></v-spacer>

            <v-btn color="orange lighten-2" text @click="goToDetails(card.id)">
              Ver Detalles
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getRandomPhoto} from "@/services/unsplash.js";
import store from "../store/store";
import * as types from "../store/types";

export default {
  data: () => ({
    loading: false,
    selection: 1,
    unsplashData: null,
    favorite: false,
    snackbar: false,
    snackbarText: "",
    countryflag: "",
    cards: [],
    haveCards: false,
  }),
  created() {
    this.haveCardsList();
    this.searchPhotos();
  },
  computed: {
    imageUrl() {
      if (this.unsplashData) return this.unsplashData["urls"]["regular"];
      return null;
    },
  },

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },

    goToDetails(id) {
      location.href = "/detail/" + id;
    },

    createCardsList() {
      let i;
      for (i = 0; i < 28; i++) {
        this.cards.push({
          title: i,
          src: this.unsplashData[i]["urls"]["regular"],
          id: this.unsplashData[i]["id"],
          favorite: "false",
        });
        this.addFeedCardsList({
          title: i,
          src: this.unsplashData[i]["urls"]["regular"],
          id: this.unsplashData[i]["id"],
          favorite: "false",
        });
      }
    },
    searchPhotos() {
      const param = {
        featured: true,
      };
      this.dataLoading = true;
      if (!this.haveCards) {
        getRandomPhoto(param).then((res) => {
          this.unsplashData = res;
          this.dataLoading = false;
          this.createCardsList();
        });
      } else {
        store.getters.cardsList.forEach((element) => {
          this.isFavorite(element);
          this.cards.push(element);
        });
      }
    },
    addToFavorites(card) {
      store.dispatch({
        type: types.addPhoto,
        photoId: card.id,
      });
      card.favorite = true;
      this.snackbarText = "Agregado a Favoritos";
    },
    removeFromFavorites(card) {
      store.dispatch({
        type: types.removePhoto,
        photoId: card.id,
      });
      card.favorite = false;
      this.snackbarText = "Eliminado de Favoritos";
    },
    isFavorite(card) {
      if (store.getters.photosSet.has(card.id) ){
        card.favorite = true
        } else {
          card.favorite = false
      }
    },
    addFeedCardsList(card) {
      store.dispatch({
        type: types.addCardsList,
        photoId: card,
      });
    },
    haveCardsList() {
      console.log(store.getters.cardsList)
      if (store.getters.cardsList.size > 0) {
        this.haveCards = true;
      } else {
        this.haveCards = false;
      }
    },
  },
};
</script>
