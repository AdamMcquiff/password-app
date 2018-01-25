<template>
   <main class="signin">
        <div class="aligncenter">
            <h1 class="signin-title">Sign into your account</h1>
        </div>

        <div class="form signin-form">
            <form v-on:submit.prevent="login">
                <label for="email" class="form-label">
                    Email address
                </label>
                <input type="email" name="email" placeholder="Enter email..." class="form-input form-input--block">

                <label for="password" class="form-label">
                    Password
                </label>
                <router-link to="/forgotten-password" class="form-forgotten-password">
                    Forgot password?
                </router-link>
                <input type="password" name="password" placeholder="Enter password" class="form-input form-input--block">

                <input type="submit" value="Sign in" class="form-input form-input--block form-input--submit">
            </form>
        </div>

        <div class="form aligncenter">
            <p>
                New user?
                <router-link to="/signup">Create an account</router-link>.
            </p>
        </div>
    </main>
</template>

<script>
import router from "../router";
import { http, httpAuth } from "../common/http-common";
import { getClientData } from "../common/utils"

export default {
  name: "Login",
  created: function() {
    // Check if the user is signed in, if so, redirect to the dashboard
    if (localStorage.getItem('token') != null) router.push("dashboard")
  },
  methods: {
    login: function(event) {
      let email = event.target.elements.email.value;
      let password = event.target.elements.password.value;

      if (this.isEmailValid(email) && password) {
        http
          .post("login", {
            email: email,
            password: password
          })
          .then(response => {
            // Store JWT Auth token in the local storage
            localStorage.setItem("token", response.data.token);

            getClientData().then(data => {
              // Log the login event to the API
              httpAuth
                .post("log-signin", {
                  ip: data.ip,
                  hostname: "2001:630:a4:e3:80b7:91d9:713a:c0f5",
                  datetime: new Date()
                })
                .then(response => {})
                .catch(e => {});
            })
            

            // Redirect user to the dashboard
            router.push("dashboard");
          })
          .catch(e => {
            alert("Login unsucessful; your email or password is incorrect");
          });
      }
    },
    isEmailValid: function(email) {
      return true;
    }
  }
};
</script>

<style scoped>
.signin {
  min-height: 150vh;
  overflow: hidden;

  background: #f09819; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #edde5d, #f09819);
  background: linear-gradient(to right, #edde5d, #f09819);

  padding-top: 8em;
}

.signin-title {
  color: #fff;
  font-weight: 300;
}

.signin-form {
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  margin-top: 2em;
}
</style>
