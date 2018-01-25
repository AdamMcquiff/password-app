<template>
   <main class="signin">
        <div class="aligncenter">
            <h1 class="signin-title">Sign into your account</h1>
        </div>

        <div class="form signin-form">
            <form v-on:submit.prevent="login">
                <label for="email" class="form-label">
                    Email address
                    <span role="tooltip" class="error" v-if="email.hint">
                      {{ email.hint }}
                    </span>
                </label>
                <input type="email" name="email" v-model="email.value" placeholder="Enter email..." class="form-input form-input--block"
                       @input="validateEmail" v-bind:class="{ invalid: email.isValid == false, valid: email.isValid }">

                <label for="password" class="form-label">
                    Password
                    <span role="tooltip" class="error" v-if="password.hint">
                      {{ password.hint }}
                    </span>
                </label>
                <router-link to="/forgotten-password" class="form-forgotten-password">
                    Forgot password?
                </router-link>
                <input type="password" name="password" v-model="password.value" placeholder="Enter password" class="form-input form-input--block"
                       @input="validatePassword" v-bind:class="{ invalid: password.isValid == false, valid: password.isValid }">

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
import router from '../router'
import HttpHelper from '../common/http-common'
import { isEmailValid, getClientData } from '../common/utils'

export default {
  name: 'Login',
  data: () => {
      return {
        httpHelper: null,
        email: {
          value: "",
          isValid: null,
          hint: ""
        },
        password: {
          value: "",
          isValid: null,
          hint: ""
        }
      }
  },
  created: function() {
    // Check if the user is signed in, if so, redirect to the dashboard
    if (localStorage.getItem('token') != null) router.push('/')

    // Initialise the HttpHelper
    this.httpHelper = new HttpHelper()
  },
  methods: {
    login: function(event) {
      let email = event.target.elements.email.value;
      let password = event.target.elements.password.value;

      if (
        this.email.isValid && 
        this.password.isValid
      ) {
        this.httpHelper.http.post('login', {
            email: email,
            password: password
          })
          .then(response => {
            // Store JWT Auth token in the local storage
            localStorage.setItem('token', response.data.token);

            // Refresh the JWT token so that the HttpHelper can access protected API routes
            this.httpHelper.refreshToken()

            // Get user's client data (ip address, etc.) and log to the API
            getClientData().then(data => {
              this.httpHelper.httpAuth.post('log-signin', {
                  ip: data.ip,
                  hostname: '2001:630:a4:e3:80b7:91d9:713a:c0f5',
                  datetime: new Date()
                })
                .then(response => {})
                .catch(e => {});
            })

            // Redirect user to the dashboard
            router.push('/');
          })
          .catch(e => {});
      }
    },
    validateEmail: function(e) {
      // Check if the email field is not empty and is in a valid 
      // 'email' format via Regular Expression (regex)
      this.email.isValid = isEmailValid(this.email.value);
      this.email.hint = this.email.isValid ? '' : 'Please enter a valid email address.';
    },
    validatePassword: function(e) {
      this.password.isValid = this.password.value != '';
      this.password.hint = this.password.isValid ? '' : 'Please enter a password.';
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
