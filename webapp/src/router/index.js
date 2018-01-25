import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Notifications from '@/components/Notifications'
import Signup from '@/components/Signup'
import SecurityQuestions from '@/components/SecurityQuestions'
import Settings from '@/components/Settings'

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
    component: Dashboard,
    redirect: { name: 'Home' },
    children: [{
      path: 'home',
      name: 'Home',
      component: Home
    }, {
      path: 'settings',
      name: 'Settings',
      component: Settings
    }, {
      path: 'notifications',
      name: 'Notifications',
      component: Notifications
    }]
  }]
})
