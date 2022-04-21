<template>
  <div style="display: none"></div>
</template>
<script>
export default {
  name: "AuthSetup",
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    username() {
      return this.$store.getters.username;
    },
    token() {
      return this.$store.getters.token;
    },
  },
  methods: {
    checkToken() {
      this.$http
        .get("me")
        .catch(() => {
          this.$store.dispatch("signOut");
        });
    },
    setToken() {
      this.$http.defaults.headers.common["Authorization"] = this.token
        ? `Bearer ${this.token}`
        : null;
    },
  },
  watch: {
    token() {
      this.setToken();
    },
  },
  created() {},
};
</script>