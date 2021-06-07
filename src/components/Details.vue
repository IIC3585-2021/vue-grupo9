<template>
<div>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="674"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      :src="imageUrl"
    ></v-img>


    <v-card-title>{{author}}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          color="primary"
          dense
          length="1"
          half-increments
          readonly
          size="24"
        ></v-rating>

        <div class="grey--text ms-4">
          {{likes}}
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        {{updatedAt}}
      </div>

      <div>{{bio}}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
  

      <v-item-group>
        <v-container mb-6 class="grupo-pais">
          <v-row>
              <v-col>
              <v-item>
              <v-card-title>{{country}}</v-card-title>
              </v-item>
              </v-col>
              <v-col>
              <v-item>
              <v-img id="country-flag"
                    lazy-src="https://picsum.photos/id/11/10/6"
                    max-height="100"
                    max-width="71"
                    :src="countryFlagLink"
                  ></v-img>
              </v-item>
              </v-col>
              <v-col>
              <v-item>
              <template>
                <div class="text-center">
                  <v-btn
                    rounded
                    color="primary"
                    dark
                  >
                    Ver fotos del mismo país
                  </v-btn>
                </div>
              </template>
              </v-item>
              </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    


    <v-card-text>
    </v-card-text>

    <v-card-actions>
      <v-tooltip v-if="favorite" left>
      <template v-slot:activator="{ on, attrs }">
      <v-btn
       class="mx-2"
        fab
        dark
        small
        color="pink"
        @click="removeFromFavorites"
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
        @click="addToFavorites"
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
    </v-card-actions>
  </v-card>
  <v-snackbar
      v-model="snackbar"
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</div>
</template>

<script>
import { getPhotoById } from "@/services/unsplash.js";
import store from '../store/store';
import * as types from '../store/types'
import flags from '../assets/countriesDict'


  export default {
    data: () => ({
      loading: false,
      selection: 1,
      unsplashData: null,
      favorite: false,
      snackbar: false,
      snackbarText: '',
      countryflag: ''
    }),
    created() {
      this.searchPhoto()
      this.isFavorite()
      },
    computed: {
    imageUrl() {
      if (this.unsplashData) return this.unsplashData["urls"]["regular"];
      return null;
    },
    updatedAt() {
      if (this.unsplashData) return this.unsplashData["updated_at"].slice(0, 10);
      return null;
    },
    author() {
      if (this.unsplashData) return this.unsplashData["user"]["name"];
      return null;
    },
    likes() {
      if (this.unsplashData) return this.unsplashData["likes"];
      return null;
    }
    ,
    bio() {
      if (this.unsplashData) return this.unsplashData["user"]["bio"];
      return null;
    }
    ,
    country() {
      if (this.unsplashData){
        return this.unsplashData["user"]["location"]
        } else {
          return null
          }
    },
    countryFlagLink() {
      if (this.unsplashData){
        return `https://flagcdn.com/w80/${flags[this.unsplashData["user"]["location"]]}.png`
        } else {
          return null
          }
    }
    
    },

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
      searchPhoto() {
      const param = {
        featured: true,
      };
      this.dataLoading = true;
      getPhotoById(param, this.$route.params.photoId).then(res => {
        this.unsplashData = res;
        this.dataLoading = false;
      });
    },
    addToFavorites() {
      store.dispatch({
            type: types.addPhoto,
            photoId: this.$route.params.photoId
          })
          this.favorite = true
          this.snackbarText = "Agregado a Favoritos"
          this.snackbar = true;
          setTimeout(() => { this.removeSnackbar(); }, 3000);
    },
    removeFromFavorites() {
      store.dispatch({
            type: types.removePhoto,
            photoId: this.$route.params.photoId
          })
          this.favorite = false;
          this.snackbarText = "Eliminado de Favoritos"
          this.snackbar = true;
          setTimeout(() => { this.removeSnackbar(); }, 3000);
    },
    isFavorite() {
      if (store.getters.photosSet.has(this.$route.params.photoId) ){
        this.favorite = true
        } else {
          this.favorite = false
      }
    },
    removeSnackbar() {
      this.snackbar = false
    }
    
  
    },
  }
</script>
<style>

#country-flag {
 border: 1px solid gray;
}

.grupo-pais {
  padding-top: 5%;
}

</style>

