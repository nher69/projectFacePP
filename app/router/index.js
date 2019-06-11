import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Login from './components/Login'

const router = new VueRouter({
    pageRouting: true,
    routes: [
    {
        path: '/login',
      component: Login,
      meta: {
        title: 'Login',
      },
    }],
});

router.replace('/login');

module.exports = router;
