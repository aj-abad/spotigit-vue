<template>
  <v-sheet outlined class="pa-6 outlined rounded-lg" style="width: 32rem">
    <div v-if="addedSongs.length || deletedSongs.length">
      <p class="text-h5 font-weight-semibold">Staged changes</p>
      <div class="mb-4">
        <form @submit.prevent="commit()">
          <v-textarea
            v-model.trim="commitMessage"
            hide-details=""
            rows="2"
            no-resize
            label="Add a commit message"
            outlined
            dense
            class="mb-2"
          />
          <v-btn
            :disabled="!commitMessage"
            color="primary"
            type="submit"
            elevation="0"
            block
          >
            Commit
          </v-btn>
        </form>
      </div>
      <div v-for="(item, i) in addedSongs" :key="i" class="d-flex mb-4">
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
        <div class="ml-auto d-flex align-center">
          <span class="green--text font-weight-bold">U</span>
          <v-btn class="ml-2" icon small @click="$emit('removeadd', item)">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </div>
      </div>
      <div
        v-for="(item, i) in deletedSongs"
        :key="i"
        class="d-flex mb-4 deleted"
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
        <div class="ml-auto d-flex align-center">
          <span class="red--text font-weight-bold">D</span>
          <v-btn class="ml-2" icon small @click="$emit('removeadd', item)">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <div v-else>
      <h3>No changes to commit.</h3>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: "StagedChanges",
  data() {
    return {
      commitMessage: "",
    };
  },
  props: {
    id: Number,
    addedSongs: Array,
    deletedSongs: Array,
  },
  methods: {
    commit() {
      const payload = {
        id: this.id,
        commitMessage: this.commitMessage,
        addedSongs: this.addedSongs.map((song) => song.id),
        deletedSongs: this.deletedSongs.map((song) => song.id),
      };

      this.$http
        .post("/playlists/commit", payload)
        .then(() => window.location.reload())
        .catch((err) => alert(err));
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>