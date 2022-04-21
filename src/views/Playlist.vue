<template>
  <div class="pa-6">
    <div v-if="playlist">
      <div class="d-flex align-center">
        <div class="playlist-img"></div>
        <div class="d-flex flex-column">
          <h1 class="text-h3 font-weight-bold mb-4">{{ playlist.name }}</h1>
          <h2 class="text-h4 grey--text text--darken-2">
            <router-link :to="`user/${playlist.user_id}`">{{playlist.username}}</router-link>
          </h2>
        </div>
      </div>
      <div v-if="playlist.user_id === $store.getters.userId">
        <v-text-field outlined dense label="Search songs" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Playlist",
  data() {
    return {
      playlist: null,
    };
  },
  created() {
    this.$http
      .get("/playlists/" + this.$route.params.id)
      .then((response) => {
        this.playlist = response.data;
      })
      .catch((error) => {
        alert(error);
        this.$router.replace("/home");
      });
  },
};
</script>

<style lang="stylus" scoped>
.playlist-img {
  height: 256px;
  width: @height
  background-color: #eee;
  margin-right: 10px;
}
</style>