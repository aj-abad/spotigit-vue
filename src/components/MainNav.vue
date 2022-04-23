<template>
  <nav class="main-nav">
    <v-list color="primarylighter">
      <form class="pa-4" @submit.prevent="search()">
        <div class="d-flex">
          <v-text-field
            filled
            label="Search for playlists and users"
            outlined
            dense
            v-model.trim="keyword"
          />
          <v-btn
            type="submit"
            style="height: 40px"
            elevation="0"
            color="primary"
          >
            Search
          </v-btn>
        </div>
      </form>
      <v-list-item-group color="primary">
        <v-list-item to="/home">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOut");
      this.$router.replace("/");
    },
    search() {
      this.$router.push("/")
      this.$router.push(`/search?q=${this.keyword}`);
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
  flex-shrink: 0;
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