import Vue from 'vue'
import Router from 'vue-router'
import Rhymesaurus from '@/components/Rhymesaurus'
import Kindasaurus from '@/components/Kindasaurus'
import Starwars from '@/components/Starwars'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Rhymesaurus',
      component: Rhymesaurus
    },
    {
      path: '/kindasaurus',
      name: 'Kindasaurus',
      component: Kindasaurus
    },
    {
      path: '/starwars',
      name: 'Starwars',
      component: Starwars
    }
  ]
})
