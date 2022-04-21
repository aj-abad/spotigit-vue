<template>
  <div class="d-flex flex-column align-center primarylighter">
    <div class="text-center mb-4 pt-6 pt-lg-16">
      <logo style="width: 4rem" />
      <h1 class="text-h5 text-center font-weight-semibold">
        Create a SpotiGit account
      </h1>
    </div>
    <v-sheet class="main-form pa-6 rounded-lg" outlined>
      <form @submit.prevent="signUp">
        <v-alert color="error darken-3" v-if="errorMessage">
          <span class="font-weight-semibold white--text">
            {{ errorMessage }}
          </span>
        </v-alert>
        <div class="mb-4">
          <label for="email" class="font-weight-semibold">Username</label>
          <v-text-field
            id="username"
            dense
            outlined
            hide-details="auto"
            v-model.trim="username"
            :error-messages="usernameErrors"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="font-weight-semibold">Password</label>
          <v-text-field
            id="password"
            :type="showPassword ? 'text' : 'password'"
            dense
            outlined
            hide-details
            v-model="password"
            :append-icon="!showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="showPassword = !showPassword"
          />
        </div>
        <v-btn
          :disabled="!canSignUp"
          type="submit"
          color="primary"
          block
          class="py-6"
          elevation="0"
        >
          <span v-if="!isLoading">Create an account</span>
          <v-progress-circular v-else size="24" width="2" indeterminate />
        </v-btn>
        <v-sheet
          outlined
          class="pa-4 rounded-lg mt-4"
          style="background: var(--v-primarylightest-base)"
        >
          <span class="font-weight-medium">
            Already have an account? Sign in
            <router-link to="/">here</router-link>.
          </span>
        </v-sheet>
      </form>
    </v-sheet>
  </div>
</template>

<script>
import Logo from "@/components/SVG/Logo";
export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      password: "",
      showPassword: true,
      isLoading: false,
      errorDialog: false,
      errorMessage: "",
    };
  },
  computed: {
    usernameErrors() {
      if (!this.username) return null;
      if (!this.username.match(/^[a-zA-Z0-9-_]+$/))
        return ["Username must be alphanumeric and dashes only."];
      return null;
    },
    canSignUp() {
      return (
        !this.usernameErrors &&
        !!this.username &&
        !!this.password &&
        this.password.length >= 6
      );
    },
  },
  methods: {
    signUp() {
      if (this.isLoading) return null;
      this.isLoading = true;
      const { username, password } = this;
      this.$http
        .post("/auth/signup", { username, password })
        .then(({ data }) => {
          const { token } = data;
          const { username, id: userId } = data.user;
          this.$store.dispatch("signIn", { token, username, userId });
          this.$router.replace("/home");
        })
        .catch((err) => {
          this.errorDialog = true;
          const error =
            err?.response?.data?.error ??
            err?.response?.data?.[Object.keys(err?.response?.data)[0]][0] ??
            "An unknown error occurred.";
          this.errorMessage = error;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  components: { Logo },
};
</script>

<style lang="stylus" scoped>
.main-form {
  width: 32rem;
  position: relative;
}

@media (max-width: 768px) {
  .main-form {
    width: 100%;
    height: 100%;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>