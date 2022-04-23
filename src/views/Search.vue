<template>
  <div class="pa-6">
    <h1 class="text-h4">
      Search results for '<span class="font-weight-bold">{{
        this.$route.query.q
      }}</span
      >'
    </h1>
    <div v-if="searchResults">
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab> Playlists ({{ searchResults.playlists.length }}) </v-tab>
        <v-tab> Users ({{ searchResults.users.length }}) </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item class="pa-6">
          <div class="row">
            <v-col
              cols="12"
              sm="6"
              lg="4"
              xl="3"
              v-for="playlist in searchResults.playlists"
              :key="playlist.id"
            >
              <v-card
                outlined
                :to="`/playlist/${playlist.id}`"
                draggable="false"
              >
                <div class="primarylighter">
                  <img
                    src="https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-playlist-icon-image_1128352.jpg"
                    alt="Empty playlist"
                    class="w-100"
                    draggable="false"
                  />
                  <v-card-title>
                    <div class="headline">
                      {{ playlist.name }}
                      <br />
                      <small class="grey--text text--darken-1">
                        {{ playlist.username }}
                      </small>
                    </div>
                  </v-card-title>
                </div>
              </v-card>
            </v-col>
          </div>
        </v-tab-item>
        <v-tab-item class="pa-6">
          <div class="row">
            <v-col
              cols="12"
              sm="6"
              lg="4"
              xl="3"
              v-for="user in searchResults.users"
              :key="user.id"
            >
              <v-card outlined :to="`/user/${user.id}`" draggable="false">
                <div>
                  <v-card-title>
                    <div class="headline">
                      {{ user.username }}
                    </div>
                  </v-card-title>
                </div>
              </v-card>
            </v-col>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchResults: null,
      tab: null,
    };
  },
  created() {
    this.$http
      .get("/search?q=" + this.keyword)
      .then((response) => {
        this.searchResults = response.data;
      })
      .catch((error) => {
        alert(error);
      });
  },
  computed: {
    keyword() {
      return this.$route.query.q;
    },
  },
  watch: {
    keyword() {
      this.$http
        .get("/search?q=" + this.keyword)
        .then((response) => {
          this.searchResults = response.data;
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>