<template>
  <div class="pa-6">
    <h1>Playlist details</h1>
    <div v-if="playlist">
      <div v-if="playlist.user"></div>
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