<template>
  <div class="d-flex">
    <div class="main-display flex-grow-1 pa-6">
      <div class="d-flex">
        {{ $store.getters.getUsername }}
      </div>
      <h1 class="mb-4">My playlists</h1>
      <create-playlist />

      <all-playlists class="mt-8" />
    </div>
  </div>
</template>

<script>
import CreatePlaylist from "@/components/Playlist/CreatePlaylist";
import AllPlaylists from "../components/Playlist/AllPlaylists.vue";
export default {
  components: { CreatePlaylist,   AllPlaylists },
  name: "Home",
};
</script>
