<template>
  <div class="vh-100 d-flex">
    <main-nav v-if="$store.getters.isLoggedIn" />
    <router-view class="main-page" />
  </div>
</template>

<script>
import MainNav from "./MainNav.vue";
export default {
  components: { MainNav },
  name: "ViewContainer",
};
</script>

<style lang="stylus" scoped>
.main-page {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  flex-grow: 1;
}
</style>