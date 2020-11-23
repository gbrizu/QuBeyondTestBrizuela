import Vue from 'vue';
import VueRouter from "vue-router";
import routes from "./routes/routes";
import App from './App';


/* eslint-disable no-new */

Vue.use(VueRouter);
// configure router
const router = new VueRouter({
    routes, // short for routes: routes    
  });

new Vue({
    el: "#app",
    render: h => h(App),
    router
  });