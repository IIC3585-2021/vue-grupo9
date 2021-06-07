<template>
  <v-app>
    <v-main>
        <v-toolbar color="orange" dark>
      <v-toolbar-title class="mx-6">PhotoBook</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn v-if="routeIsDetail" @click="goToFeed">
        Volver al Feed
      </v-btn>
      <v-toolbar-title class="mx-6">Grupo9</v-toolbar-title>
    </v-toolbar>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  

  data: () => ({
    //
  }),
  computed: {
    routeIsDetail() {
        return this.$route.name == "Detail";
    }
  },
  methods: {
    
    goToFeed() {
      location.href = "/feed";
    },
  }
};
</script>
