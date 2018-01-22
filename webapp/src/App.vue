<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
  export default {
      name: "App"
  };
</script>

<style>
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
    color: darken(#61C4E2, 25%);
}

.aligncenter {
    text-align: center;
}

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
 
.form-label {
    float: left;
    display: block;
    font-size: 1.075em;
    margin: 0 0 .5em .25em; 
    font-weight: 300;
}

.form-input {
    color: #505050;
    background: #E3E3E3;
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

.form-input::placeholder {
    color: #505050;
}

.form-input:hover,
.form-input:active,
.form-input:focus {
    /* background: darken($light-grey, 5%); */
}

.form-input--submit {   
    cursor: pointer;
    color: #FFF;
    background: #28A745;
    transition: .2s ease background;
}

form-input--submit:hover,
form-input--submit:active,
form-input--submit:focus {
    /* background: darken($green, 5%); */
}

.form-input--block {
    display: block;
    width: 100%;
}

.form-forgotten-password {
    font-weight: 200;
    float: right;
}

</style>
