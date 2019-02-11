<template>
<div>
<div class="md-toolbar-container">
<md-toolbar class="md-warn">
<h1 class="md-title" style="flex:1;"><strong>OpenNote</strong></h1>
<router-link tag="md-button" to="/"> Login </router-link>
<router-link tag="md-button" to="/signup"> SignUp </router-link>

</md-toolbar>

</div>



<div style="padding:10px 10px;">
<md-layout md-gutter="9">
<md-layout md-flex-xsmall="50" md-flex-small="50" md-flex-medium="50" md-flex-large="25">

</md-layout>
</md-layout>
</div>
</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  methods:{
   
  }
}

</script>