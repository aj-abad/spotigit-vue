<template>
  <nav class="main-nav">
    <v-list color="primarylighter">
      <v-list-item-group color="primary">
        <v-list-item @click="signOut">
          <v-list-item-icon>
            <v-icon>mdi-door</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sign out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </nav>
</template>

<script>
export default {
  name: "MainNav",
  methods: {
    signOut() {
      this.$store.dispatch("signOut");
      this.$router.replace("/")
    },
  },
};
</script>

<style lang="stylus" scoped>
.main-nav {
  width: 24rem;
  height: 100%;
  border-right: 1px solid var(--v-primarylight-base);
  background: var(--v-primarylighter-base);
  flex-shrink: 0
}

@media (max-width: 960px) {
  .main-nav {
    width: 100%;
    height: 4rem;
    border-right: unset;
    border-top: 1px solid var(--v-primarylight-base);
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>