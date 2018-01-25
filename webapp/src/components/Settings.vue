<template>
    <div class="settings">
        <h1>
            Settings
        </h1>

        <h2>
            Update Profile
        </h2>

			  <form v-on:submit.prevent="saveChangesToProfile">
            <label class="form-label">
                Name
                <input type="text" name="name" v-model="user.name" placeholder="Enter name..." class="form-input"
                       @input="validateName" v-bind:class="{ invalid: fields.name.isValid == false, valid: fields.name.isValid }">
                <span role="tooltip" class="error" v-if="fields.name.hint">
                  {{ fields.name.hint }}
                </span>
            </label>

            <label class="form-label">
                Email
                <input type="email" name="email" v-model="user.email" placeholder="Enter email..." disabled="true" class="disabled form-input">
            </label>

            <h2>
                Change Password
            </h2>

            <label class="form-label">
					      New Password
				        <input type="password" v-model="passwords.newPassword" name="newPassword" placeholder="Enter new password..." class="form-input form-input--block" 
					             @input="validateNewPassword" v-bind:class="{ invalid: fields.newPassword.isValid == false, valid: fields.newPassword.isValid }">
                <span role="tooltip" class="error" v-if="fields.newPassword.hint">
						        {{ fields.newPassword.hint }}
					      </span>
				    </label>
            

				    <label for="confirm-password" class="form-label">
					      Confirm New Password
				        <input type="password" v-model="passwords.confirmNewPassword" name="confirm-password" placeholder="Confirm password..." class="form-input form-input--block"
				               @input="validateNewPassword" v-bind:class="{ invalid: fields.confirmNewPassword.isValid == false, valid: fields.confirmNewPassword.isValid }">
					      <span role="tooltip" class="error" v-if="fields.confirmNewPassword.hint">
						        {{ fields.confirmNewPassword.hint }}
					      </span>
            </label>
            <!--
            <h2>
                Change Security Questions
            </h2> -->

            <hr>

            <label class="form-label">
                Current Password
                <input type="password" name="password" v-model="passwords.originalPassword" placeholder="Enter password" class="form-input"
                      @input="validatePassword" v-bind:class="{ invalid: fields.originalPassword.isValid == false, valid: fields.originalPassword.isValid }">
                <span role="tooltip" class="error" v-if="fields.originalPassword.hint">
                  {{ fields.originalPassword.hint }}
                </span>
            </label>

            <label class="form-info"> 
                Please enter password to save changes.
                <input type="submit" value="Save changes" class="form-input form-input--submit">
            </label>
        </form>
    </div>
</template>

<script>
import router from '../router'
import HttpHelper from '../common/http-common'
import { isJWTTokenValid } from '../common/auth'

export default {
  name: 'Settings',
  data: () => {
    return {
      httpHelper: null,
      user: {},
      fields: {
        name: { hint: '', isValid: null },
        email: { hint: '', isValid: null },
        originalPassword: { hint: '', isValid: null },
        newPassword: { hint: '', isValid: null },
        confirmNewPassword: { hint: '', isValid: null }
      },
      passwords: {
        progress: null,
        newPassword: '',
        confirmNewPassword: '',
        originalPassword: ''
      },
    }
  },
  beforeCreate: function () {
    // Check if the user is signed in, if not, redirect to login
    if (!isJWTTokenValid()) router.push('/login')

    this.httpHelper = new HttpHelper()

    this.httpHelper.httpAuth.get('profile')
      .then(response => {
        // Store user data locally for manipulation
        this.user = response.data

        // Remove fields that we do not want to update in the database
        delete this.user.id
        delete this.user.Logins
        delete this.user.createdAt
        delete this.user.updatedAt
      })
      .catch(e => {})
  },
  methods: {
    validateName: function () {
      this.fields.name.isValid = !!this.user.name
      this.fields.name.hint = this.fields.name.isValid ? '' : 'Please enter a name.'
    },
    validatePassword: function () {
      this.fields.originalPassword.isValid = !!this.passwords.originalPassword
      this.fields.originalPassword.hint = this.fields.originalPassword.isValid ? '' : 'Please enter your password.'
    },
    validateNewPassword: function () {
      if (
        this.passwords.newPassword == '' &&
        this.passwords.confirmNewPassword == ''
      ) {
        this.fields.newPassword.isValid = null
        this.fields.newPassword.hint = ''
        this.fields.confirmNewPassword.isValid = null
        this.fields.confirmNewPassword.hint = ''
        return
      }

      if (this.passwords.confirmNewPassword != '') {
        this.fields.newPassword.isValid = !!this.passwords.newPassword
        this.fields.newPassword.hint = this.fields.newPassword.isValid ? '' : 'Please enter a password.'
      } 

      if (this.passwords.newPassword != '') {
        this.fields.confirmNewPassword.isValid = !!this.passwords.confirmNewPassword
        this.fields.confirmNewPassword.hint = this.fields.confirmNewPassword.isValid ? '' : 'Please enter a password.'
      }
    },
    saveChangesToProfile: function () {
      this.validatePassword()

      if (
        (this.fields.name.isValid || this.fields.name.isValid == null) &&
        (this.fields.email.isValid || this.fields.email.isValid == null) &&
        (this.fields.newPassword.isValid || this.fields.newPassword.isValid == null) &&
        (this.fields.confirmNewPassword.isValid || this.fields.confirmNewPassword.isValid == null) &&
        this.fields.originalPassword.isValid
      ) {
        // NOTE: in the non-prototype system the web app would compare the
        // password against the users real password
        alert('Profile updated')
      }
    },
  }
}
</script>

<style scoped>
.settings h1 {
    margin-top: 0;
}

.settings h2 {
    font-size: 1.25em;
    font-weight: 500;
}

.settings .form-label {
    display: block;
    width: 100%;
}

.settings .form-input {
    width: auto;
    display: inline-block;
    padding: 0.5em 1em;
    margin-left: 2em;
}

.settings .form-input[disabled="disabled"] {
    background-color: #B1B1B1;
    color: #E3E3E3;
}

.settings input[type="text"],
.settings input[type="email"],
.settings input[type="password"] {
    min-width: 18em;
}
</style>
