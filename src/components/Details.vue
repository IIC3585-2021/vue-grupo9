<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
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

    <v-card-title>{{country}}</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip
        class="ma-2">5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
      >
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { getPhotoById } from "@/services/unsplash.js";


  export default {
    data: () => ({
      loading: false,
      selection: 1,
      unsplashData: null
    }),
    created() {this.searchPhoto()},
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
      if (this.unsplashData) return this.unsplashData["user"]["location"];
      return null;
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
        console.log(res);
        this.dataLoading = false;
      });
    }
  
    },
  }
</script>


