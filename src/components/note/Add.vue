<template>
<div>
<div ><input style="border:0px; font-size:120%;font-weight:bold;padding:20px;" v-model="title"></div>
	<trumbowyg v-model="content" :config="config" class="form-control"></trumbowyg>
  <md-speed-dial md-open="hover" class="md-fab-bottom-right" md-theme="form">
  <md-button class="md-fab" @click="adding()" md-fab-trigger>
    <md-icon>add</md-icon>
  </md-button>

</md-speed-dial>
</div>
</template>

<script>
  // Import this component
  
  import trumbowyg from 'vue-trumbowyg'
  // Import editor css
  import 'trumbowyg/dist/ui/trumbowyg.css'
  import 'trumbowyg/dist/plugins/colors/trumbowyg.colors.js'
  import 'trumbowyg/dist/plugins/pasteimage/trumbowyg.pasteimage.min.js'
  import 'trumbowyg/dist/plugins/base64/trumbowyg.base64.min.js'
  import 'trumbowyg/dist/plugins/preformatted/trumbowyg.preformatted.min.js'

  import toastr from 'toastr'
  toastr.options= {
    "closeButton": true,
    "progressBar": true,
    "positionClass": "toast-bottom-left",
    "hideDuration": "1500"
  }

  export default {    
    data () {
      return {
        editTitle: true,
        config: {
          btns: [
          ['viewHTML'],
          ['formatting'],
          ['strong','em','del'],
          ['link'],
          ['insertImage'],
          ['justifyLeft', 'justifyCenter','justifyRight'],
          ['unorderedList','orderedList'],
          ['horizontalRule'],
          ['fullscreen'],
          ['foreColor', 'backColor'],
          ['preformatted']
          ],
          semantic: false,
          autogrow: true,
        },
        title: "Untitled Note",
        content: null     
      }
    },
    components: {
      trumbowyg
    },
    methods: {
      adding () {
        this.$store.dispatch('addNote', {title: this.title, body: this.content})
        toastr.success('Note added')
        this.$router.push({name: 'notes'})
      }
    }
  }	
</script>

<style>
	.trumbowyg-box, .trumbowyg-editor {
    margin-top: 0px; border: 0px;
  }
</style>