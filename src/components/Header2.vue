<template>
    <v-app-bar>
      <v-toolbar-title class="header-title">Hello {{ getUser.email }}!</v-toolbar-title>
      <v-tabs v-model="activeTab" grow>
        <v-tab v-for="(tab, index) in tabs" :key="index" @click="navigate(tab.route)">
          {{ tab.name }}
        </v-tab>
      </v-tabs>
      <v-avatar class="mx-2" color="blue" size="32">{{ initials }}</v-avatar>
      <v-btn icon @click="triggerLogout">
        <v-icon>{{ logoutIcon }}</v-icon>
      </v-btn>
    </v-app-bar>
  </template>
  
  <script>
  import { mdiBell, mdiLogout } from '@mdi/js';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    // eslint-disable-next-line 
    name: "Header2",
    props: {
      tabs: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        activeTab: null,
      };
    },
    computed: {
      ...mapGetters('auth', ['getUser']),
      bellIcon() {
        return mdiBell;
      },
      logoutIcon() {
        return mdiLogout;
      },
      initials() {
        const words = this.getUser.email.split(' ');
        let initial = '';
        words.forEach(word => {
            // Ensure the word is not empty before extracting the initial
            if (word) {
                initial += word[0].toUpperCase(); // Append the first letter (capitalized) to the initials
            }
        })
        return initial;
      },
    },
    methods: {
      ...mapActions('auth', ['logout']),
      triggerLogout() {
        this.logout()
        this.navigate("/login")
      },
      navigate(route) {
        // Navigate to the specified route
        if (this.$route.path == route)
            return;
        console.log('Navigating to:', route);
        this.$router.push(route);
      },
    },
  };
  </script>
  
<style>
.header-title {
    margin-right: 16px !important;
    overflow: inherit !important;
    font-size: large;
    font-family: "Times New Roman, Times, serif";
    font-weight: 600;

}
</style>