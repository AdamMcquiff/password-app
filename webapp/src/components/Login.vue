<template>
   <main class="signin">
        <div class="aligncenter">
            <img src="" alt="" class="">
            <h1 class="signin-title">Sign into your account</h1>
        </div>

        <div class="form signin-form">
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
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
.signin {
    min-height: 100vh;
    overflow: hidden;
    
    background: #F09819;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #EDDE5D, #F09819);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #EDDE5D, #F09819); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    padding-top: 8em;
}

.signin-title {
    color: #FFF;
    font-weight: 300;
}

.signin-form {
    padding-top: 1.5em; 
    padding-bottom: 1.5em;
    margin-top: 2em;
}
</style>
