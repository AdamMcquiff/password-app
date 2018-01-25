<template>
	<main class="signup">
		<div class="aligncenter">
			<h1 class="signup-title">Hi {{ user.forename }}, almost there&hellip;</h1>
		</div>
	
		<div class="form signup-form">
			<form v-on:submit.prevent="signup">
				<p class="form-info"> 
					Please provide the details below, just in case you forget your password.
				</p>
				<label for="alternative-email" class="form-label">
					Alternative Email Address
					<span role="tooltip" class="error" v-if="email.hint">
						{{ email.hint }}
					</span>
				</label>
				<input type="text" v-model="email.value" name="alternative-email" placeholder="Enter an alternative email..." class="form-input form-input--block" 
					   @input="validateEmail" v-bind:class="{ invalid: email.isValid == false, valid: email.isValid }">

				<hr>
	
				<label for="alternative-email" class="form-label">
					Security Question 1
					<span role="tooltip" class="error" v-if="answer1.question.hint">
						{{ answer1.question.hint }}
					</span>
				</label>
				
				<select v-model="answer1.question.value" name="question1" class="form-input form-input--block" 
					    v-on:change="validateQuestion" v-bind:class="{ invalid: answer1.question.isValid == false, valid: answer1.question.isValid }">
					<option disabled value="">Please select one</option>
					<option value="0">What was the name of your elementary / primary school?</option>
					<option value="1">In what city or town does your nearest sibling live?</option>
					<option value="2">What time of the day were you born?</option>
				</select>

				<label for="answer-1" class="form-label" aria-label="Security Question 1 Answer">
					Answer
					<span role="tooltip" class="error" v-if="answer1.hint">
						{{ answer1.hint }}
					</span>
				</label>
				<input type="text" v-model="answer1.value" name="answer-1" placeholder="Enter an answer..." class="form-input form-input--block" 
					   @input="validateAnswer" v-bind:class="{ invalid: answer1.isValid == false, valid: answer1.isValid }">

				<label for="alternative-email" class="form-label">
					Security Question 2
					<span role="tooltip" class="error" v-if="answer2.question.hint">
						{{ answer2.question.hint }}
					</span>
				</label>
				
				<select v-model="answer2.question.value" name="question2" class="form-input form-input--block"
					    v-on:change="validateQuestion" v-bind:class="{ invalid: answer2.question.isValid == false, valid: answer2.question.isValid }">
					<option disabled value="">Please select one</option>
					<option value="0">What was the name of your elementary / primary school?</option>
					<option value="1">In what city or town does your nearest sibling live?</option>
					<option value="2">What time of the day were you born?</option>
				</select>

				<label for="answer-2" class="form-label" aria-label="Security Question 2 Answer">
					Answer
					<span role="tooltip" class="error" v-if="answer2.hint">
						{{ answer2.hint }}
					</span>
				</label>
				<input type="text" v-model="answer2.value" name="answer-2" placeholder="Enter an answer..." class="form-input form-input--block" 
					   @input="validateAnswer" v-bind:class="{ invalid: answer2.isValid == false, valid: answer2.isValid }">
				
				<input type="submit" value="Let's go!" class="form-input form-input--block form-input--submit">
			</form>
		</div>
	</main>
</template>

<script>
	import router from "../router"
	import { httpAuth } from "../common/http-common"
	import { isEmailValid, getForenameFromName } from "../common/utils"
	
	export default {
		name: "Signup",
		data: () => {
			return {
				user: {
					forename: ""
				},
				email: {
					value: "",
					isValid: null,
					hint: ""
				},
				answer1: {
					question: {
						value: "",
						hint: "",
						isValid: null
					},
					value: "",
					isValid: null,
					hint: ""
				},
				answer2: {
					question: {
						value: "",
						hint: "",
						isValid: null
					},
					value: "",
					isValid: null,
					hint: ""
				},
			}
		},
		created: function () {
			httpAuth.get('profile')
				.then(response => {
					this.user.forename = getForenameFromName(response.data.name)
					this.user.email = response.data.email
				})
				.catch(e => {
					//
				})
  		},
		methods: {
			signup: function (e) {
				if (
					this.email.isValid &&
					this.answer1.isValid &&
					this.answer1.question.isValid &&
					this.answer2.isValid &&
					this.answer2.question.isValid
				) {
					httpAuth.post('profile', {
							alternativeEmail: this.email.value,
							securityQuestionOne: this.answer1.question.value,
							securityQuestionOneAnswer: this.answer1.value,
							securityQuestionTwo: this.answer2.question.value,
							securityQuestionTwoAnswer: this.answer2.value,
						})
						.then(response => {
							router.push("/dashboard")
						})
						.catch(e => {
							console.log(e)
						})
				} else {
					this.validateEmail(this.email.value)
					// TODO: validate q and
				}
			},
			validateEmail: function (e) {
				let email = e.target ? e.target.value : e

				this.email.isValid = false
				this.email.hint = ""
				
				if (!isEmailValid(email))
					this.email.hint = "Please enter a valid email address."
				else if (email == this.user.email)
					this.email.hint = "Alternative email must be different from main email address."
				else 
					this.email.isValid = true
			},
			validateQuestion: function (e) {
				let question = e.target.name
				let isValid = this.answer1.question.value != this.answer2.question.value
				
				this.answer1.question.hint = ""
				this.answer2.question.hint = ""

				if (!isValid) {
					if (question == 'question1') {
						this.answer1.question.hint = "Please select a different question to question 2."
						this.answer1.question.isValid = false
					} else if (question == 'question2') {
						this.answer2.question.hint = "Please select a different question to question 1."
						this.answer2.question.isValid = false
					}
				} else {
					if (this.answer1.question.value != "")
						this.answer1.question.isValid = true
					if (this.answer2.question.value != "")
						this.answer2.question.isValid = true
				}
			},
			validateAnswer: function (e) {
				let answer = e.target.value

				let isValid = !!answer
				let hint = isValid ? "" : "Please enter an answer."

				if (e.srcElement.name == 'answer-1') {
					this.answer1.isValid = isValid
					this.answer1.hint = hint
				} else {
					this.answer2.isValid = isValid
					this.answer2.hint = hint
				}
			}
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
</style>