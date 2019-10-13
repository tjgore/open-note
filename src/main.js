import Vue from 'vue'
import VueMaterial from 'vue-material'
import App from './App.vue'
import 'vue-material/dist/vue-material.css'
import { router } from './router/routes.js'
import { store } from './store/store.js'

import Firebase from 'firebase'
import { config } from './firebase'

import ShortTextFilter from './filters/shortenText.js'

Vue.filter('shortText', ShortTextFilter)

Vue.use(VueMaterial)

Vue.material.registerTheme ({
  form: {
    primary: {
      color: 'deep-orange',
      hue: 700,
      textColor: 'white'
    }, 
    accent: {
      color: 'deep-orange',
      hue: 600,
      textColor: 'white'
    },
    warn: {
      color: 'deep-orange',
      hue: 600,
      textColor: 'white'
    },
  }
})


Vue.material.registerTheme({
  'cards': {
    primary: {
      color: 'blue',
      hue: 700,
      textColor: 'white'
    },
    accent: {
      color: 'white',
      hue: 900,
      textColor: 'black'
    },
  }
})


new Vue({
  el: '#app',
  router,
  store,
  created () {
  	Firebase.initializeApp(config)
  	Firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
  		if (user) {
  			console.log('AuthStatechanged: We have a user')
        this.$store.commit('setUser', user)
        this.$store.dispatch('getNotes')
  		} else {
  			console.log('AuthStatechanged: No user')
  		}
  	})

  },
  render: h => h(App)
})
