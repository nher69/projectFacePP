import Vue from 'nativescript-vue'
//import App from './components/App'
//import Kinvey from './components/Kinvey'
import Cam from './components/Cam'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

// import VueDevtools from 'nativescript-vue-devtools'
// if(TNS_ENV !== 'production') {
// // Vue.use(VueDevtools)
// }
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
render: h => h('frame', [h(Cam)])
}).$start()