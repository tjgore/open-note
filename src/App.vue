<template>
<div>
<router-view name="auth-header"></router-view>
<router-view name="home-header"></router-view>

<router-view></router-view>

</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      'mdSwipeable':true,
      search:false
    }
  },
  methods:{
   toggleLeftSidenav() {
    this.$refs.leftSidenav.toggle();
  }
}
}
</script>

<style>

</style>
