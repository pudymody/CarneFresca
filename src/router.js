import Vue from 'vue'
import Router from 'vue-router'
import Create  from './views/Create.vue'
import Home from './views/Home.vue'
import Player from './views/Player.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/player',
      name: 'player',
      component: Player
    },
    {
      path: '/create/:CURRENT_STEP',
      name : 'create',
      component: Create,
      props:function(route){ return { CURRENT_STEP : parseInt(route.params.CURRENT_STEP, 10) }; }
    }
  ]
})
