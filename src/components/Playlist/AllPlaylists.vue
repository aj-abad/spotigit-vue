<template>
  <div>
    <div class="row" v-if="playlists">
      <v-col cols="12" sm="6" lg="4" xl="3" v-for="playlist in playlists" :key="playlist.id">
        <v-card outlined :to="`/playlist/${playlist.id}`" draggable="false">
          <div class="primarylighter">
            <img
              src="https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-playlist-icon-image_1128352.jpg"
              alt="Empty playlist"
              class="w-100"
              draggable="false"
            />
            <v-card-title>
              <v-card-title-text>
                <div class="headline">{{ playlist.name }}</div>
              </v-card-title-text>
            </v-card-title>
          </div>
        </v-card>
      </v-col>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllPlaylists",
  data() {
    return {
      playlists: null,
    };
  },
  created() {
    this.$http
      .get("/playlists")
      .then(({ data }) => {
        this.playlists = data;
      })
      .catch((err) => alert(err));
  },
};
</script>