import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import SecurityQuestions from '@/components/SecurityQuestions'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Login',
    component: Login
  }, {
    path: '/signup',
    name: 'Signup',
    component: Signup
  }, {
    path: '/signup/security-questions',
    name: 'SignupSecurityQuestions',
    component: SecurityQuestions
  }, {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  }]
})
