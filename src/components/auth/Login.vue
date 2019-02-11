<template>
<div class="main-container">
<md-layout md-gutter  md-align="center">
<md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="60" md-flex-large="30">
<h3 class="md-title">Please login to your account</h3>
<md-input-container md-theme="form">
    <label>Email Address</label>
    <md-input type="email" v-model="email" required></md-input>
  </md-input-container>
  <md-input-container md-has-password md-theme="form">
    <label>Password </label>
    <md-input type="password" v-model="password" required></md-input>
  </md-input-container>
  <md-button class="md-warn md-raised" @click="login()">Login</md-button>
   <router-link tag="md-button" class="md-warn md-raised" to="/signup">Signup</router-link>
<md-layout md-flex="100" md-align="center">
  <md-button class="md-dense">Forgot your password?</md-button>
</md-layout>
</md-layout>	
 </md-layout>
</div>
</template>

<script>
import Firebase from 'firebase'

	export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      user () {
        return this.$store.getters.getUser
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/home')
        }
      }
    },
    methods: {
      login () {
        if (this.email !== '' && this.email !== undefined) {
        this.$store.dispatch('loginUser', {email: this.email, password: this.password})
        this.email = ''
        this.password = ''
        }
      }
    }
  }
</script>

<style>
	
</style>