<template>
  <div class="vh-100">
    <router-view class="main-page" />
  </div>
</template>

<script>
export default {
  name: "ViewContainer",
};
</script>

<style lang="stylus" scoped>
.main-page {
  height: 100vh
  overflow-y: auto;
  overflow-x hidden;
}
</style>