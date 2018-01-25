<template>
    <div id="app">
        <transition name="page" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style>
/* Normalise and general styles */
html,
body {
    margin: 0;
}

p {
    font-weight: 300;
}

* {
    box-sizing: border-box;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
}

a {
    color: #61C4E2;
    font-weight: 200;
    transition: .2s ease color;
}

a:hover,
a:active,
a:focus {
    color: #2093b0;
}

hr {
    opacity: .5;
    border: 1px solid #D8D8D8;
    margin: 2em 0 1.5em;
}

/* Utils */

.aligncenter {
    text-align: center;
}

/* Forms */

.form {
    display: block;
    padding: 0.75em 1.5em;

    background: #FFF;
    border-radius: 3px;
    width: 425px;
    margin: 1em auto;

    -webkit-box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
    -moz-box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
    box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16); 
}

.form-info {
    line-height: 1.75;
    color: #505050;
    margin-top: 0;
} 

.form-label {
    float: left;
    display: block;
    font-size: 1.075em;
    margin: 0 0 .5em .25em; 
    font-weight: 300;
}

.form-label .error {
    color: #F44336;
    margin-left: .5em;
    font-weight: 500;
}

.form-input {
    color: #505050;
    background-color: #E3E3E3;
    transition: .2s ease background;
 
    border: 0;
    border-radius: 3px;
    font-size: 1em;
    padding: 0.75em 1.25em; 
    font-weight: 200;

    margin-bottom: 1em;

    -webkit-box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
    -moz-box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
    box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
}

select.form-input {
    -webkit-appearance: none; 
    -moz-appearance: none;
    appearance: none;
    background: url('./assets/sort-down.svg') 96% / 15% no-repeat #e3e3e3;
    background-size: 1em;   
}

    select.form-input:hover {
       background-color: #dddddd; 
    }

.form-input.invalid {
    border: 2px solid #F44336;
}

.form-input.valid {
    border: 2px solid #64DD17;
}

.form-input::placeholder {
    color: #505050;
}

.form-input:hover,
.form-input:active,
.form-input:focus {
    background-color: #dddddd;
}

.form-input--submit {   
    cursor: pointer;
    color: #FFF;
    background: #28A745;
    transition: .2s ease background;
}

.form-input--submit:hover,
.form-input--submit:active,
.form-input--submit:focus {
    background: #007717;
}

.form-input--block {
    display: block;
    width: 100%;
}

.form-forgotten-password {
    font-weight: 200;
    float: right;
}

/* Transitions */
.page-enter-active, .page-leave-active {
  transition: opacity 1s, transform 1s;
}
.page-enter, .page-leave-to {
  opacity: 0;
  transform: translateY(-30%);
}


</style>
