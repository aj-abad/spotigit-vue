<template>
  <div>
    <auth-setup />
    <v-app>
      <view-container />
    </v-app>
  </div>
</template>

<script>
import ViewContainer from "@/components/ViewContainer";
import AuthSetup from "./components/AuthSetup.vue";
export default {
  name: "App",
  components: {
    ViewContainer,
    AuthSetup,
  },
};
</script>