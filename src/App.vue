<template>
  <v-app>
    <div class="container" :style="computedStyles">
      <Header v-if="showHeader" :tabs="tabs"/>
      <router-view class="pa-4 router-class"></router-view>
    </div>
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue';

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
        { name: 'Orders', route: '/orders'}
      ],
    };
  },
  computed: {
    computedStyles() {
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
  watch: {
    getUser: {
        immediate: true, // Trigger the watcher immediately on component mount
        handler(newUserValue) {
              if (!newUserValue) {
                this.$route.push
              }
            },
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
  .router-class {
    overflow-y: auto;
    max-height: calc(100vh - 64px);
  }
</style>
