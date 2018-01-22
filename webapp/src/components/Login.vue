<template>
   <main class="signin">
        <div class="aligncenter">
            <img src="" alt="" class="">
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
                <a href="" class="form-forgotten-password">
                    Forgot password?
                </a>
                <input type="password" name="password" placeholder="Enter password" class="form-input form-input--block">

                <input type="submit" value="Sign in" class="form-input form-input--block form-input--submit">
            </form>
        </div>

        <div class="form aligncenter">
            <p>
                New user?
                <a href="">
                    Create an account
                </a>
                .
            </p>
        </div>
    </main>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      //
    };
  },
  methods: {
    login: function(event) {
      let email = event.target.elements.email.value;
      let password = event.target.elements.password.value;

      if (this.isEmailValid(email) && password) {
        axios.post("http://localhost:8000/api/login", {
            email: email,
            password: password
        }).then(response => {
            console.log(response)
          })
          .catch(e => {
            this.errors.push(e);
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
  min-height: 100vh;
  overflow: hidden;

  background: #f09819; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #edde5d,
    #f09819
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #edde5d,
    #f09819
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

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
