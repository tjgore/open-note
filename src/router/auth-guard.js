import { store } from '../store/store'

export default (to,from,next)=>{
	if(store.getters.getUser != null && store.getters.getUser != undefined){
		console.log('Vuex: Working')
		next()
	}else{
		console.log('Vuex: not working')
		next('/')
	}
}