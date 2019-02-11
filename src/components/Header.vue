<template>
<div>
<div class="md-toolbar-container">
<md-toolbar class="md-warn">
  <md-button class="md-icon-button" @click="toggleLeftSidenav">
  <md-icon>menu</md-icon>
  </md-button>

  <h2 class="md-title" style="flex: 1;cursor:pointer;" @click="gotohome()"><strong>OpenNote</strong></h2>


  <md-button class="md-icon-button" @click="search = !search" >
  <md-icon>search</md-icon>
  <md-tooltip md-delay="200" md-direction="bottom">Search</md-tooltip>
  </md-button>
 
  <md-button class="md-icon-button" @click="gotoadd()">
  <md-icon>add_circle</md-icon>
  <md-tooltip md-delay="200" md-direction="bottom" >Add note</md-tooltip>
  </md-button>
</md-toolbar>
</div>
<md-layout md-align="center">
<md-layout md-flex-xsmall="70" md-flex-large="40">
<md-input-container md-theme="form" v-if="search">
<md-icon>search</md-icon>
   <md-input type="text" placeholder="Search" ></md-input>
 <md-button class="md-icon-button" @click="search = !search" v-if="search">
  <md-icon>close</md-icon>
  <md-tooltip md-delay="200" md-direction="bottom">Search</md-tooltip>
  </md-button>
</md-input-container>
</md-layout>
</md-layout>

<md-sidenav class="md-left" :class="{'md-active': sidebar}" :mdSwipeable="mdSwipeable" ref="leftSidenav" >
  
    <md-list>
     <md-subheader>Navigation</md-subheader>

    <md-list-item @click="gotohome()">
        <md-icon>description</md-icon>
        <span>All Notes</span>
    </md-list-item>

    <md-list-item @click="gotoadd()">
        <md-icon>add_circle</md-icon>
        <span>Add Note</span>
    </md-list-item>

    <md-list-item @click="logout()" style="border-top:1px solid #e0e0e0;">
        <md-icon>exit_to_app</md-icon>
        <span>Logout</span>
    </md-list-item>

    </md-list>
</md-sidenav>
</div>
</template>

<script>
import Firebase from 'firebase'

export default {
  name: 'app',
  data () {
    return {
      'mdSwipeable':true,
      search:false,
      sidebar:false
    }
  },
  methods:{
   toggleLeftSidenav() {
    this.$refs.leftSidenav.toggle();
  },
  gotohome(){
    this.$refs.leftSidenav.close();
    this.$router.push('/home')

  },
  gotoadd(){
    this.$refs.leftSidenav.close();
    this.$router.push('/add')
  },
  logout(){
    this.$store.dispatch('logout')
    this.$router.push({name: 'login'})
  }
}
}

</script>