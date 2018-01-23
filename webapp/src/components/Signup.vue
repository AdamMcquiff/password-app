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
				<input type="text" name="name" placeholder="Enter name..." class="form-input form-input--block" 
							 @input="validateName" v-bind:class="{ invalid: name.isValid == false, valid: name.isValid }">
	
				<label for="email" class="form-label">
						Email address
						<span role="tooltip" class="error" v-if="email.hint">
							{{ email.hint }}
						</span>
				</label>
				<input type="email" name="email" placeholder="Enter email..." class="form-input form-input--block" 
					    @input="validateEmail" v-bind:class="{ invalid: email.isValid == false, valid: email.isValid }">
	
				<div class="password-hints" v-if="password.isValid !== null">
					<b>Password Feedback</b>
					<ul>
						<li v-for="hint in password.hints" :key="hint">{{ hint }}</li>
						<li v-if="password.hints.length == 0">Well done!</li>
					</ul>
	
					<b :class="password.rating.colour">Rating: <span class="colour">{{ this.password.rating.title }}</span></b>
					<div class="arrow" aria-hidden="true"></div>
				</div>
	
				<label for="password" class="form-label">
						Password
				</label>
				<input type="password" name="password" placeholder="Enter password..." class="form-input form-input--block" 
							 @input="validatePassword" v-bind:class="{ invalid: password.isValid == false, valid: password.isValid }">
				<progress max="5" v-bind:value="password.progress" class="progress"></progress>

				<label for="confirm-password" class="form-label">
						Confirm Password
				</label>
				<input type="password" name="confirm-password" placeholder="Confirm password..." class="form-input form-input--block">
	
				<input type="submit" value="Sign up" class="form-input form-input--block form-input--submit">
			</form>
		</div>
	</main>
</template>

<script>
	import router from "../router";
	import { http, commonPasswordsApi } from "../common/http-common";
	
	export default {
		name: "Signup",
		data: () => {
			return {
				name: {
					isValid: null,
					hint: ""
				},
				email: {
					isValid: null,
					hint: ""
				},
				password: {
					isValid: null,	// Boolean to check if the password is valid
					hints: [],			// Array of text hints to be presented to the user
					progress: 0, 		// The progress made on addressing all password tips. Scale: 0-5
					rating: "", 		// the text label rating of the password; e.g. "Very Good", "Poor", etc
					commonality: 0 	// the amount of times the password appears in 'lists' across the web
				}
			};
		},
		methods: {
			signup: function(event) {
				let name = event.target.elements.name.value;
				let email = event.target.elements.email.value;
				let password = event.target.elements.password.value;
				let confirmPassword = event.target.elements.password.confirm - password;
	
				if (
					this.isEmailValid(email) &&
					this.isPasswordValid(password) &&
					password == confirmPassword
				) {
					http
						.post("signup", {
							email: email,
							password: password
						})
						.then(response => {
							//
						})
						.catch(e => {
							//
						});
				}
			},
			validateName: function(e) {
				let name = e.target ? e.target.value : e;
				this.name.isValid = !!name;
				this.name.hint = this.name.isValid ? "" : "Please enter a name.";
			},
			validateEmail: function(e) {
				let email = e.target ? e.target.value : e;
				let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				this.email.isValid = regex.test(email);
				this.email.hint = this.email.isValid ?
					"" :
					"Please enter a valid email address.";
			},
			validatePassword: function(e) {
				let password = e.target ? e.target.value : e;

				commonPasswordsApi.get(password)
					.then(response => {
						this.password.commonality = response.data.list.length;
					})
					.catch(e => {
						this.password.commonality = 0;
					}).finally(() => {
						this.password.hints = [];

						if (this.password.commonality != 0)
							this.password.hints.push(
								"This password is very common and is listed in at least " + this.password.commonality + " list(s)* across the web."
							);

						if (password.length <= 6)
							this.password.hints.push("Password should be 6 or more characters.");
						if (!/[a-z]/.test(password) || !/[A-Z]/.test(password))
							this.password.hints.push("Password should contain a least one uppercase and lowercase character.");
						if (!/\d/.test(password))
							this.password.hints.push("Password should contain a least one digit.");
						if (!/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))
							this.password.hints.push("Password should contain a least one special character.");

						this.password.progress = 5 - this.password.hints.length;
						this.password.isValid = this.password.progress == 5;
						this.password.rating = this.getPasswordRating(this.password.progress);
					});
			},
			getPasswordRating: function(progress) {
				let ratings = {
					'1': {
						title: 'Very Poor',
						colour: 'red'
					},
					'2': {
						title: 'Poor',
						colour: 'red'
					},
					'3': {
						title: 'Okay',
						colour: 'amber',
					},
					'4': {
						title: 'Good',
						colour: 'green',
					},
					'5': {
						title: 'Excellent',
						colour: 'green',
					},
				};
				return ratings[progress] || ratings[1];
			},
		}
	};
</script>

<style scoped>
	.signup {
		min-height: 100vh;
		overflow: hidden;
		background: #2193b0;
		/* fallback for old browsers */
		background: -webkit-linear-gradient( to right, #6dd5ed, #2193b0);
		/* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient( to right, #6dd5ed, #2193b0);
		/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		padding-top: 8em;
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
			animation: move 5s linear 0 infinite;
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

		@keyframes move {
			0% {background-position: 0px 0px, 0 0, 0 0}
			100% {background-position: -100px 0px, 0 0, 0 0}
		}

</style>