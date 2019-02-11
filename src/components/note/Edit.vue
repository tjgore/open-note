<template>
<div>
<div ><input style="border:0px; font-size:120%;font-weight:bold;padding:20px;" v-model="updatedTitle"></div>
    <trumbowyg v-model="updatedContent" :config="config" class="form-control"></trumbowyg>
  <md-speed-dial md-open="hover" class="md-fab-bottom-right" md-theme="form">
  <md-button class="md-fab"  @click="update()" md-fab-trigger>
    <md-icon>save</md-icon>
  </md-button>
{{editingNote}}
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
        updatedTitle: '',
        updatedContent: '',
        updatingId: ''     
      }
    },
    components: {
      trumbowyg
    },
    computed: {
      editingNote () {
       this.updatingId = this.$route.params.id
       const selectedNote = this.$store.getters.noteSelected(this.updatingId)
       this.updatedTitle = selectedNote.title
       this.updatedContent = selectedNote.body
     }
    },
    methods: {
      update () {
        this.$store.dispatch('updateNote', {
          updatingId: this.updatingId,
          updatedTitle: this.updatedTitle,
          updatedContent: this.updatedContent
        })
        toastr.success('Note updated')
      }
    }
  } 
</script>

<style>
    .trumbowyg-box, .trumbowyg-editor {
    margin-top: 0px; border: 0px;
  }
</style>