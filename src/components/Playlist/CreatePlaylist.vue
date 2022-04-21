<template>
  <div>
    <v-dialog width="32rem" v-model="dialog">
      <v-sheet class="pa-4 rounded-lg">
        <h1 class="text-h5 font-weight-semibold mb-4">Create a playlist</h1>
        <form @submit.prevent="createPlaylist">
          <div class="mb-4">
            <v-text-field
              v-model="playlist.name"
              outlined
              dense
              label="Name"
              hide-details
            />
          </div>
          <div class="mb-4">
            <v-textarea
              rows="5"
              no-resize
              outlined
              dense
              label="Description"
              hide-details
              v-model.trim="playlist.description"
            />
          </div>
          <v-btn
            :disabled="!canCreate"
            type="submit"
            elevation="0"
            color="primary"
            class="py-6"
            width="160px"
          >
            <span v-if="!isLoading">
              <v-icon left>mdi-plus</v-icon> Create playlist
            </span>
            <v-progress-circular v-else size="24" width="2" indeterminate />
          </v-btn>
        </form>
      </v-sheet>
    </v-dialog>
    <v-btn
      color="primary"
      elevation="0"
      class="py-6 px-8"
      @click="dialog = true"
    >
      <v-icon left>mdi-plus</v-icon>
      Create new
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "CreatePlaylist",
  data() {
    return {
      dialog: false,
      isLoading: false,
      playlist: {
        name: "",
        description: "",
      },
    };
  },
  computed: {
    canCreate() {
      return !!this.playlist.name;
    },
  },
  methods: {
    createPlaylist() {
      if (this.isLoading) return;
      this.isLoading = true;

      const { playlist } = this;
      this.$http
        .post("/playlists/create", playlist)
        .then(({ data }) => {
          this.$router.push(`/playlist/${data.id}`);
          this.dialog = false;
          this.playlist = {
            name: "",
            description: "",
          };
        })
        .catch((err) => alert(err))
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>