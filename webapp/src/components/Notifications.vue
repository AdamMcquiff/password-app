<template>
    <div class="notifications">
        <h1>
            Notifications
        </h1>

        <h2>
            Recieve emails when...
        </h2>

			  <form v-on:submit.prevent="saveChanges">
            <label class="checkbox">
                <input type="checkbox" name="login" value="login">
                A succesful login attempt is made
            </label>

            <label class="checkbox">
                <input type="checkbox" name="failed-login" value="failed-login">
                A failed login attempt is made
            </label>
              
            <label class="checkbox">
                <input type="checkbox" name="profile-or-settings" value="profile-or-settings">
                Profile or settings have been changed
            </label>

            <hr>

            <label for="password" class="form-label">
                Password
                <input type="password" name="password" v-model="password.value" placeholder="Enter password" class="form-input form-input--block"
                       @input="validatePassword" v-bind:class="{ invalid: fields.password.isValid == false, valid: fields.password.isValid }">
                <span role="tooltip" class="error" v-if="fields.password.hint">
                  {{ fields.password.hint }}
                </span>
            </label>

            <label class="form-info"> 
                Please enter password to save changes.
                <input type="submit" value="Save changes" class="form-input form-input--block form-input--submit">
            </label>
        </form>
    </div>
</template>

<script>
import router from '../router'
import HttpHelper from '../common/http-common'
import { isJWTTokenValid } from '../common/auth'
import { getForenameFromName } from '../common/utils'

export default {
  name: 'Notifications',
  data: () => {
    return {
      fields: {
        password: { hint: '', isValid: null }
      },
      password: { value: '' }
    }
  },
  beforeCreate: function () {
    // Check if the user is signed in, if not, redirect to login
    if (!isJWTTokenValid()) router.push('/login')
  },
  methods: {
    validatePassword: function () {
      // Check password field is not empty
      this.fields.password.isValid = !!this.password.value
      this.fields.password.hint = this.fields.password.isValid ? '' : 'Please enter your password.'
    },
    saveChanges: function () {
      // Validate password before submission
      this.validatePassword()

      // NOTE: in the non-prototype system the web app would compare the
      // password against the users real password
      if (this.fields.password.isValid) alert('Profile updated')
    }
  }
}
</script>

<style scoped>
.notifications h1 {
    margin-top: 0;
}

.notifications h2 {
    font-size: 1.25em;
    font-weight: 500;
}

.notifications .checkbox {
    display: block;
    margin-bottom: 1em;
    user-select: none;
}

.notifications .form-label {
    display: block;
    width: 100%;
}

.notifications .form-input {
    width: auto;
    display: inline-block;
    padding: 0.5em 1em;
    margin-left: 2em;
}
</style>
