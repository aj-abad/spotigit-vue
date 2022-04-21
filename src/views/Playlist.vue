<template>
  <div class="pa-6">
    <div v-if="playlist">
      <div class="d-flex align-center mb-8">
        <div class="playlist-img flex-shrink-0"></div>
        <div class="d-flex flex-column">
          <h1 class="text-h3 font-weight-bold mb-4">{{ playlist.name }}</h1>
          <h2 class="text-h4 grey--text text--darken-2">
            <router-link :to="`user/${playlist.user_id}`">
              {{ playlist.username }}
            </router-link>
          </h2>
          <div v-if="playlist?.commits?.length" class="mt-4">
            <v-icon> mdi-history </v-icon>
            {{ playlist.commits.length }} commits
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-4">
          <div v-if="playlist.user_id === $store.getters.userId">
            <div class="mb-4">
              <v-btn color="primary" elevation="0" @click="exportPlaylist()">
                Export this playlist
              </v-btn>
            </div>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  @input="searchSongs()"
                  hide-details
                  outlined
                  dense
                  v-bind:attrs="attrs"
                  v-on="on"
                  v-model.trim="keyword"
                  label="Search songs"
                >
                  Dropdown
                </v-text-field>
              </template>
              <v-list>
                <v-list-item
                  style="height: 64px"
                  v-for="(item, i) in menuItems"
                  :key="i"
                  @click="addSong(item)"
                >
                  <img
                    style="height: 48px; width: 48px"
                    :src="item.photo"
                    :alt="item.name"
                    class="mr-4"
                  />
                  <div>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <small class="grey--text text--darken-1">
                      {{ item.artist }}
                    </small>
                  </div>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
      </div>
      <div class="mt-6 d-flex">
        <div class="flex-grow-1 mr-4">
          <v-sheet
            class="pa-6 blue-grey lighten-5 rounded-lg"
            outlined
            v-if="!currentSongs?.length"
          >
            <h2>There are no songs in this playlist yet.</h2>
          </v-sheet>
          <div v-else>
            <v-list dense>
              <v-list-item
                class="mb-4"
                v-for="(song, i) in currentSongs"
                :key="i"
                :class="{ deleted: deletedSongs.includes(song) }"
              >
                <img
                  style="height: 128px; width: 128px"
                  :src="song.photo"
                  :alt="song.name"
                  class="mr-4"
                />
                <div class="d-block">
                  <p class="mb-0 text-h5 font-weight-semibold">
                    {{ song.name }}
                  </p>
                  <span class="text-h6 grey--text text--darken-2">
                    {{ song.artist }}
                  </span>
                </div>
                <div class="ml-auto d-flex align-items-center">
                  <v-btn icon @click="deleteSong(song)">
                    <v-icon> mdi-close </v-icon>
                  </v-btn>
                </div>
              </v-list-item>
            </v-list>
          </div>
        </div>
        <staged-changes
          :id="playlist.id"
          :addedSongs="addedSongs"
          :deletedSongs="deletedSongs"
          @removeadd="addedSongs = addedSongs.filter((song) => song !== $event)"
          @removedelete="
            deletedSongs = deletedSongs.filter((song) => song !== $event)
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import StagedChanges from "../components/Playlist/StagedChanges.vue";
export default {
  name: "Playlist",
  components: {
    StagedChanges,
  },
  data() {
    return {
      menu: true,
      playlist: null,
      keyword: "",
      searchSuggestions: [],
      isLoading: false,
      addedSongs: [],
      deletedSongs: [],
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
  methods: {
    exportPlaylist() {
      this.$http
        .post("playlists/export", {
          id: this.playlist.id,
          name: this.playlist.name,
          description: this.playlist.description ?? "",
        })
        .then(({data}) => {
          //open in new tab
          window.open(data, "_blank");
          alert("Playlist exported successfully!");
        });
    },

    searchSongs() {
      if (this.isLoading || this.keyword.length <= 3) return;
      this.isLoading = true;
      this.$http
        .get("/tracks/search?keyword=" + this.keyword)
        .then((response) => {
          console.log(response.data);
          this.searchSuggestions = response.data?.tracks?.items ?? [];
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => (this.isLoading = false));
    },
    addSong(item) {
      this.keyword = "";
      this.searchSuggestions = [];
      this.addedSongs.push(item);
    },
    deleteSong(song) {
      if (this.deletedSongs.includes(song)) {
        this.deletedSongs = this.deletedSongs.filter((s) => s !== song);
      } else {
        this.deletedSongs.push(song);
      }
    },
  },
  computed: {
    currentSongs() {
      if (!this.playlist?.songs?.tracks) return null;
      return this.playlist.songs?.tracks?.map((song) => {
        return {
          id: song.id,
          name: song.name,
          artist: song.artists[0].name,
          photo: song?.album?.images?.[0]?.url ?? null,
        };
      });
    },
    menuItems() {
      if (!this.searchSuggestions) return [];

      return this.searchSuggestions.map((item) => ({
        name: item.name,
        artist: item.artists[0].name,
        photo: item?.album?.images?.[item.album.images.length - 1]?.url ?? null,
        id: item.id,
      }));
    },
  },
};
</script>

<style lang="stylus" scoped>
.playlist-img {
  height: 256px;
  width: @height;
  background-color: #eee;
  margin-right: 10px;
}

.deleted {

  .d-block *{
    text-decoration: line-through
  }
  
}
</style>