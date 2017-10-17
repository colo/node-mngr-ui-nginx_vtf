import Vue from 'vue'
import Router from 'vue-router'
import Vhosts from '@/components/Vhosts'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
		{
      path: '/vhosts/:uri?',
      name: 'vhosts',
      component: Vhosts,
      props: true
    }
  ]
})
