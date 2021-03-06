<template>
	<main class="signup">
		<div class="aligncenter">
			<h1 class="signup-title">Register your account</h1>
		</div>
	
		<div class="form signup-form">
			<form v-on:submit.prevent="signup">
				<label for="name" class="form-label">
					Full Name 
					<span role="tooltip" class="error" v-if="name.hint">
						{{ name.hint }}
					</span>
				</label>
				<input type="text" v-model="name.value" name="name" placeholder="Enter name..." class="form-input form-input--block" 
					   @input="validateName" v-bind:class="{ invalid: name.isValid == false, valid: name.isValid }">
	
				<label for="email" class="form-label">
					Email address
					<span role="tooltip" class="error" v-if="email.hint">
						{{ email.hint }}
					</span>
				</label>
				<input type="email" v-model="email.value" name="email" placeholder="Enter email..." class="form-input form-input--block" 
					   @input="validateEmail" v-bind:class="{ invalid: email.isValid == false, valid: email.isValid }">
	
				<div class="password-hints" v-if="password.isValid !== null">
					<b>Password Feedback</b>
					<ul>
						<li v-for="hint in password.hints" :key="hint">{{ hint }}</li>
						<li v-if="password.hints.length == 0">Well done!</li>
					</ul>
	
					<b :class="password.rating.colour">
						Rating: <span class="colour">{{ this.password.rating.title }}</span>
					</b>
					<div class="arrow" aria-hidden="true"></div>
				</div>
	
				<label for="password" class="form-label">
					Password
				</label>
				<input type="password" v-model="password.value" name="password" placeholder="Enter password..." class="form-input form-input--block" 
					   @input="validatePassword" v-bind:class="{ invalid: password.isValid == false, valid: password.isValid }">
				<progress max="5" v-bind:value="password.progress" class="progress"></progress>

				<label for="confirm-password" class="form-label">
					Confirm Password
					<span role="tooltip" class="error" v-if="confirmPassword.hint">
						{{ confirmPassword.hint }}
					</span>
				</label>
				<input type="password" v-model="confirmPassword.value" name="confirm-password" placeholder="Confirm password..." class="form-input form-input--block"
				       @input="validateConfirmPassword" v-bind:class="{ invalid: confirmPassword.isValid == false, valid: confirmPassword.isValid }">
	
				<input type="submit" value="Sign up" class="form-input form-input--block form-input--submit">

				<p class="aligncenter notice">
					Already have an account?
					<router-link to="/login">Sign in</router-link>.
				</p>
			</form>
		</div>
	</main>
</template>

<script>
import router from '../router'
import HttpHelper, { commonPasswordsApi } from '../common/http-common'
import { isEmailValid, getClientData } from '../common/utils'

export default {
  name: 'Signup',
  data: () => {
    return {
      name: {
        value: '',
        isValid: null,
        hint: ''
      },
      email: {
        value: '',
        isValid: null,
        hint: ''
      },
      password: {
        value: '',			// Store password
        isValid: null,		// Boolean to check if the password is valid
        hints: [],			// Array of text hints to be presented to the user
        progress: 0, 		// The progress made on addressing all password tips. Scale: 0-5
        rating: '', 		// the text label rating of the password; e.g. "Very Good", "Poor", etc
        commonality: 0 		// the amount of times the password appears in 'lists' across the web
      },
      confirmPassword: {
        value: '',
        isValid: null,
        hint: ''
      }
    }
  },
  created: function () {
    // Check if the user is signed in, if so, redirect to the dashboard
    if (localStorage.getItem('token') != null) router.push('/')
  },
  methods: {
    signup: function(event) {
      let helper = new HttpHelper()

      if (
        this.name.isValid &&
        this.email.isValid &&
        this.password.isValid &&
        this.confirmPassword.isValid
      ) {
        helper.http.post('signup', {
            name: this.name.value,
            email: this.email.value,
            password: this.password.value
          })
          .then(response => {
            // Store JWT Auth token in the local storage
            localStorage.setItem('token', response.data.token)
                          
            // Refresh the JWT token so that the HttpHelper can access protected API routes
            helper.refreshToken()

            // Get user's client data (ip address, etc.) and log to
            getClientData().then(data => {
              helper.httpAuth.post('log-signin', {
                  ip: data.ip,
                  hostname: '2001:630:a4:e3:80b7:91d9:713a:c0f5', // Dummy hostname data, as system is only a prototype
                  datetime: new Date() 
                })
                .then(response => {})
                .catch(e => {});
            })

            // Redirect user to the security questions
            router.push('signup/security-questions')
          })
          .catch(e => {})
      }
    },
    validateName: function(e) {
      // Check if the name field is not empty
      // let name = e.target ? e.target.value : e
      this.name.isValid = !!this.name.value
      this.name.hint = this.name.isValid ? '' : 'Please enter a name.'
    },
    validateEmail: function(e) {
      // Check if the email field is not empty and is in a valid 
      // 'email' format via Regular Expression (regex)
      this.email.isValid = isEmailValid(this.email.value)
      this.email.hint = this.email.isValid ? '' : 'Please enter a valid email address.'
    },
    validateConfirmPassword: function(e) {
      // Reset boolean and hint
      this.confirmPassword.isValid = false
      this.confirmPassword.hint = ''

      // Check if original password is valid; check paswords match
      if (!this.password.isValid) this.confirmPassword.hint = 'Please ensure orignal password is valid'
      else if (this.confirmPassword.value != this.password.value) this.confirmPassword.hint = 'Passwords do not match'
      else this.confirmPassword.isValid = true
    },
    validatePassword: function(e) {
      // Check if the password field is not empty and matches a multi-step validation process

      // Connect to a 'common password' API via axios and check to see if the input password
      // is shown in any of the 'lists'. This API is buggy and returns a 404 if the password
      // is not in any lists, therefore I have had to work around that in my JS Promise.
      commonPasswordsApi.get(this.password.value)
        .then(response => {
          // Store how many lists the password appears in
          this.password.commonality = response.data.list.length
        })
        .catch(e => {
          // 404 Error: the password appears in no lists. Therefore, the commonality is 0.
          this.password.commonality = 0
        }).finally(() => {
          // Generate password hints each API call to avoid 
          // duplicate data being presented to the user
          this.generatePasswordHints(this.password.value)
        })

        // Generate once before the API finishes to avoid the system appearing laggy
        this.generatePasswordHints(this.password.value)
    },
    generatePasswordHints: function(password) {
      // Reset the hints array to avoid duplication
      this.password.hints = []

      // Check if password has commonality. If it does, inform the user how many lists it appears in.
      if (this.password.commonality != 0)
        this.password.hints.push(
          'This password is very common and is listed in at least ' + this.password.commonality + ' list(s)* across the web.'
        )
      
      // Check if password under 6 characters, inform the user if so.
      if (password.length <= 6)
        this.password.hints.push('Password should be 6 or more characters.')

      // Check if password contains an uppercase and lowercase character, inform the user if not.
      if (!/[a-z]/.test(password) || !/[A-Z]/.test(password))
        this.password.hints.push('Password should contain a least one uppercase and lowercase character.')

      // Check if password contains a digit, inform the user if not.
      if (!/\d/.test(password))
        this.password.hints.push('Password should contain a least one digit.')

      // Check if password contains a special character, inform the user if not.
      if (!/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))
        this.password.hints.push('Password should contain a least one special character.')

      // Calculate the password 'progress' by taking away the total no. of possible hints
      // from the actual amount. This value is then used in the progress bar.
      this.password.progress = 5 - this.password.hints.length

      // Password is valid if the progress is 5; i.e. there are no hints.
      this.password.isValid = this.password.progress == 5

      // Get the password rating text to display to the user.
      this.password.rating = this.getPasswordRating(this.password.progress)

      // Store password value
      this.password.value = password
    },
    getPasswordRating: function(progress) {
      let ratings = {
        '1': { title: 'Very Poor', colour: 'red' },
        '2': { title: 'Poor', colour: 'red' },
        '3': { title: 'Okay', colour: 'amber' },
        '4': { title: 'Good', colour: 'green' },
        '5': { title: 'Excellent', colour: 'green' },
      }
      return ratings[progress] || ratings[1]
    },
  }
}
</script>

<style scoped>
	.signup {
		min-height: 150vh;
		overflow: hidden;
		background: #2193b0;
		background: -webkit-linear-gradient( to right, #6dd5ed, #2193b0);
		background: linear-gradient( to right, #6dd5ed, #2193b0);
		padding-top: 5em;
	}
	
	.signup-title {
		color: #fff;
		font-weight: 300;
	}
	
	.signup-form {
		position: relative;
		padding-top: 1.5em;
		padding-bottom: 1.5em;
		margin-top: 2em;
	}

	.notice {
		margin-bottom: 0;
		color: #505050;
	}
	
	.password-hints {
		-webkit-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
		-moz-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
		box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
		border-radius: 3px;
		position: absolute;
		right: -20em;
		width: 18em;
		background: white;
		padding: 1em 1.25em;
		font-weight: 200;
	}
	
	.password-hints ul {
		margin: 0;
		padding: 1em 0 1em 1.5em;
	}
	
	.password-hints .red .colour  {
		color: #F44336;
	}

	.password-hints .amber .colour {
		color: #fdd835;
	}

	.password-hints .green .colour {
		color: #64DD17;
	}
	
	.arrow {
		border-style: solid;
		border-color: white transparent transparent transparent;
		border-width: 16px 16px 0px 16px;
		left: -23px;
		top: 3em;
		position: absolute;
		transform: rotate(90deg);
	}

	.progress {
		-webkit-appearance: none;
		appearance: none;
		height: 1em;
		display: block;
    	width: 100%;
		margin-bottom: 1em;
	}

		.progress[value]::-webkit-progress-bar {
			background-color: #eee;
			border-radius: 3px;
			-webkit-box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
			-moz-box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
			box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
		}

		.progress[value]::-webkit-progress-value {
			border-radius: 2px; 
			background-size: 35px 20px, 100% 100%, 100% 100%;
		}

		.progress[value='4']::-webkit-progress-value,
		.progress[value='5']::-webkit-progress-value {
			background-image:
				-webkit-linear-gradient(top,rgba(255, 255, 255, .25), rgba(0, 0, 0, .25)),
				-webkit-linear-gradient(left, #64DD17, #1faa00);
		}

		.progress[value='1']::-webkit-progress-value,
		.progress[value='2']::-webkit-progress-value {
			background-image:
				-webkit-linear-gradient(top,rgba(255, 255, 255, .25),rgba(0, 0, 0, .25)),
				-webkit-linear-gradient(left, #F44336, #ba000d);
		}

		.progress[value='3']::-webkit-progress-value {
			background-image:
				-webkit-linear-gradient(top, rgba(255, 255, 255, .25), rgba(0, 0, 0, .25)),
				-webkit-linear-gradient(left, #fdd835, #c6a700);
		}
</style>