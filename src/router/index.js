import Vue from 'vue'
import Router from 'vue-router'
import Nginx from '@/components/Nginx'
import Vhosts from '@/components/Vhosts'
import Vhost from '@/components/Vhost'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
		{
      path: '/',
      name: 'nginx',
      component: Nginx,
      meta: {
				text: 'Nginx',
				append: true,
				to: '/',
				exact:true,
				disabled: false
			},
			children: [
				{
					path: '/vhosts',
					name: 'vhosts',
					component: Vhosts,
					meta: {
						text: 'Virtual Hosts',
						append: true,
						to: '/vhosts',
						exact:true,
						disabled: false
					},
					props: true,
					children: [
						{
							path: ':uri',
							name: 'vhost',
							component: Vhost,
							meta: {
								text: 'Virtual Host',
								append: true,
								to: '/vhosts',
								exact:true,
								disabled: false
							},
							props: true,
						}
					]
				}
			]
    },
		
  ]
})
