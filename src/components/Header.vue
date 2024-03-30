<template>
    <div class="header">
      <div class="tabs">
        <div v-for="tab in tabs" :key="tab.name" @click="goToRoute(tab.route)">
          {{ tab.name }}
        </div>
      </div>
      <div class="user" v-if="username">
        <div class="user-icon" @click="handleLogout">
          {{ initials }}
        </div>
        <button @click="handleLogout">Logout</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // eslint-disable-next-line
    name: "Header",
    props: {
      tabs: Array,
      username: String,
    },
    computed: {
      initials() {
        if (!this.username) return '';
        const nameParts = this.username.split(' ');
        return nameParts.map(part => part[0].toUpperCase()).join('');
      },
    },
    methods: {
      goToRoute(route) {
        // Navigate to the specified route
        if (this.$route.path == route)
            return;
        this.$router.push(route);
      },
      handleLogout() {
        // Emit the logout event to the parent component
        this.$emit('logout');
      },
    },
  };
  </script>
  
  <style scoped>
  .user-icon {
    display: inline-block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #ccc;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
  }
  </style>
  