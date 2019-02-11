import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'firebase'

Vue.use(Vuex)


export const store = new Vuex.Store ({
  state: {
    user: null,
	notes: []
  },
  getters: {
	getUser: state => {
	  return state.user
	},
	getAllnotes: state => {
	  return state.notes
	},
    noteSelected: state => {
      return (noteId) => {
        return state.notes.find((note) => {
          return note.id === noteId
        })
      }
    }
  },
  mutations: {
    setUser: (state, payload) => {
	  state.user = {
	    id: payload.uid,
		email: payload.email
	  }
	},
	setNotes: (state, payload) => {
	  console.log (payload.val())
      const obj = payload.val()
      for (let key in obj) {
        state.notes.push ({
          id: key,
          title: obj[key].title,
          body: obj[key].body
        })
      }
	},
	addNote: (state, payload) => {
      state.notes.push(payload)
	},
    updateNote: (state, payload) => {
      const note = state.notes.find((note) => {
        return note.id === payload.updatingId
      })
      note.title = payload.updatedTitle
      note.body = payload.updatedContent
      console.log("Updating note mutations:")
    },
    deleteNote: (state, payload) => {
      const noteIndex = state.notes.findIndex((note) => {
        return note.id === payload
      })
      state.notes.splice(noteIndex, 1)
      console.log("Note deleted mutations:")
    },
    clearData: (state) => {
      state.user = null
      state.notes = []
    }
  },
  actions: {
    signUp: ({commit}, payload) => {
	  Firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
       .then((user) => { 
        commit('setUser', user)
        })
        .catch((error) => {
          console.log(error)
        });
	},
	loginUser: ({commit}, payload) => {
	  Firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
       .then((user) => {
        commit('setUser', user)
        })
        .catch((error) => {
        console.log(error)
        });
	},
	getNotes:({commit, getters}) => {
      const user = getters.getUser
	  Firebase.database().ref('/users/' + user.id + '/notes/').once('value')
       .then((data) => {
        console.log(data)
        commit('setNotes', data)
        })
        .catch(error => {
         console.log("Get Notes action error: " + error)
        })
	},
	addNote:({commit, getters}, payload) => {
      var key
      const user = getters.getUser
      const newNote = {
        title: payload.title,
        body: payload.body
      }
      Firebase.database().ref('/users/' + user.id + '/notes/').push(newNote)
       .then((data) => {
        key = data.key
        commit('addNote', {
          ...newNote,
          id: key
        })
       })
       .catch((error) => {
        console.log(error)
       })
	},
    updateNote ({commit, getters}, payload) {
      Firebase.database().ref('users/' + getters.getUser.id + '/notes/').child(payload.updatingId)
       .update({
        title: payload.updatedTitle,
        body: payload.updatedContent
        })
       .then((data) => {
        console.log("Updating note action:")
        commit('updateNote', payload)
       })
       .catch((error) => {
        console.log("Update note: " + error)
       })
    },
    deleteNote ({commit, getters}, payload) {
      Firebase.database().ref('users/' + getters.getUser.id + '/notes/').child(payload)
       .remove()
       .then((data) => {
         console.log("Note deleted action:")
         commit('deleteNote', payload)
       })
       .catch((error) => {
        console.log("Note not deleted, error: " + error)
       })
    },
    logout ({commit}) {
      Firebase.auth().signOut()
      .then(() => {
       commit('clearData')
       console.log('User logged out')
      })
      .catch(() => {
       console.log('User failed to log out')
     });
    }
  },
})