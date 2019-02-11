<template>
<div class="main-container">
<md-layout md-gutter  md-align="center">
<md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="60" md-flex-large="35">
<md-layout md-flex="100">
<h3 class="md-title" style="margin-bottom:5px;">Create your account</h3>
</md-layout>
<md-layout>
<p class="remove-margin" style="margin-bottom:15px;">One step away from being awesome</p>
</md-layout>
<md-layout md-flex="100">
<form novalidate @submit.prevent="signup()" style="width:100%;">
<md-input-container md-theme="form">
    <label>Email Address</label>
    <md-input type="email" v-model="email" required ></md-input>
  </md-input-container>
  <md-input-container md-has-password md-theme="form">
    <label>Password </label>
    <md-input type="password" required v-model="password"></md-input>
  </md-input-container>
  <md-input-container md-theme="form" :class="{'md-input-invalid': errors.password}">
    <label>Confirm Password </label>
    <md-input type="password" @input="checkPasswords" required v-model="confirmPassword"></md-input>
  <span class="md-error">{{errors.password}}</span>
  </md-input-container>
  
   <md-button class="md-warn md-raised" @click="signup()" >Signup</md-button>
 </form> 
 </md-layout>
<md-layout md-flex="100" >
  <p class="md-dense md-body-2">I agree to the terms and conditions</p>
</md-layout>
</md-layout>	
 </md-layout>
</div>
</template>

<script>
import Firebase from 'firebase'
import { config } from '../../firebase' 

	export default {
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        errors: {
          password: ''
        }
        
      }
    },
    computed: {
      checkPasswords () {
        this.errors.password = this.password != this.confirmPassword ? 'these dont match' : ''
      },
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
      signup () {
        this.$store.dispatch('signUp', {email: this.email, password: this.password})
        this.email = ''
        this.password = ''
        this.confirmPassword = ''

      }
    }
  }
</script>

<style>
	
</style>