<template>
  <v-app>
    <div class="container" :style="computedStyles">
      <Header v-if="showHeader" :tabs="tabs"/>
      <router-view class="pa-4"></router-view>
    </div>
  </v-app>
</template>

<script>
import Header from './components/Header2.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
  data() {
    return {
      tabs: [
        { name: 'Products', route: '/' },
        { name: 'Cart', route: '/cart' },
        // Add more tabs as needed
      ],
    };
  },
  computed: {
    computedStyles() {
      console.log(this.showHeader)
      if(this.showHeader) {
        return {};
      }
      return {
        backgroundImage: `url(${require('@/assets/background.jpg')})`
      };
    },
    showHeader() {
      return this.$route.name != "Login"
    },
  },
};
</script>

<style>
  /* CSS for the container */
  .container {
    position: relative;
    margin: 0px !important;
    width: 100% !important;
    max-width: 100% !important;
    padding: 0px !important;
    height: 100vh;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    backdrop-filter: blur(10px);
  }
</style>
