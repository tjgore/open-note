import Vue from 'vue'
import VueRouter from 'vue-router';
import Signup from '../components/auth/Signup.vue'
import Login from '../components/auth/Login.vue'
import AuthHeader from '../components/auth/AuthHeader.vue'
import Header from '../components/Header'
import Home from '../components/note/Note.vue'
import Add from '../components/note/Add.vue'
import Edit from '../components/note/Edit.vue'
import Firebase from 'firebase'

import authGuard from './auth-guard.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    components: {
	  default: Login,
	  'auth-header': AuthHeader
    }
  },
  {
    path: '/signup',
    components: {
	  default: Signup,
	  'auth-header': AuthHeader
    }
  },
  {
    path: '/home',
    name: 'notes',
    components: {
	  default: Home,
	  'home-header': Header
    }, 
    beforeEnter:authGuard
  },
  {
    path: '/add',
    components: {
	  default: Add,
	  'home-header': Header
    },
    beforeEnter: authGuard
  },
  {
    path: '/note/:id',
    name: 'edit-note',
    components: {
      default: Edit,
      'home-header': Header
    },
    beforeEnter: authGuard
  }

];

export const router = new VueRouter ({

routes,
mode: 'history',
base: '/opennote'

});
