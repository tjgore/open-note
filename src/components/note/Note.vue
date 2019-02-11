<template>
	<div class="notes-container" >
    <md-layout md-gutter="8" v-if="clickedDelete">
      <md-layout md-align="center" md-flex-xsmall="100">
        <p class="md-display-1" style="text-align:center;">Are you sure you want to delete this note?</p>
      </md-layout>
      <md-layout md-align="center" md-flex-large="100">
        <md-button class="md-raised" @click="deleteNote()">Yes</md-button>
        <md-button class="md-raised md-warn" @click="clearDelete()">Cancel</md-button>
      </md-layout>
    </md-layout>
		<md-layout md-gutter="8" v-else>
	
      <md-layout v-for="note in notes" :key="note.id" md-flex-xsmall="100" md-flex-medium="50" md-flex-large="25">
        <div class="card-holder"  style="width:100%;margin-bottom:10px;">

          <md-card md-with-hover md-theme="cards" 
          class="md-accent">
            <md-card-header>
              <md-card-header-text>
              <div class="md-subheading" style="margin-top:0px;" @click="editNote(note.id)">
                <strong>{{ note.title | shortText(20) }} </strong>
              </div>
              </md-card-header-text>
            </md-card-header>

          <md-card-content>
            <div class="note-body">
            {{ note.body | shortText(50) }}
            </div>
            <hr class="body-hr">
          </md-card-content>

          <md-card-actions style="padding:0px;padding-bottom:8px;">
            <md-button class="md-icon-button md-mini " md-menu-trigger>
              <router-link :to="{name: 'edit-note', params: {id: note.id}}">
              <md-icon>
              mode_edit
              </md-icon>
              </router-link>
            </md-button>
           
            <md-button class="md-icon-button md-mini" @click="deleteBtn(note.id)" md-menu-trigger>
            <md-icon>delete</md-icon>
            </md-button>

          </md-card-actions>
          </md-card>

        </div>
      </md-layout>

    </md-layout>  	
  </div>
</template>

<script>
import Firebase from 'firebase'

import toastr from 'toastr'
  toastr.options= {
    "closeButton": true,
    "progressBar": true,
    "positionClass": "toast-bottom-left",
    "hideDuration": "1500"
  }

	export default{
		data () {
			return {
				clickedDelete: false,
        deleteId: '',
        allNotes: []
			}
		},
    computed: {
      notes(){
         return this.$store.getters.getAllnotes
      }
    },
    methods: {
      editNote (id) {
        this.$router.push({name: 'edit-note', params: {id: id}})
      },
      deleteNote () {
        this.$store.dispatch('deleteNote', this.deleteId)
        this.clearDelete()
        toastr.error('Note deleted')
      },
      deleteBtn (id) {
        this.deleteId = id
        this.clickedDelete = true
      },
      clearDelete () {
        this.deleteId = ''
        this.clickedDelete = false
      }
    }
	}
</script>

<style scoped>
	.tags {
    background-color: hsla(0,0%,60%,.2);
    padding: 5px 10px;
 }
  .note-body {
    overflow: hidden;
    text-overflow: ellipsis;max-height:46px;display: -webkit-box;
    -webkit-line-clamp: 2;-webkit-box-orient: vertical;
  }
  .md-card-content {
    padding-bottom: 0px;
  }
  .body-hr {
    margin-bottom: 5px;
  }
  .md-card-header {
    padding-top: 10px;
  }
  .md-card-header {
    padding-bottom: 10px;
  }
</style>