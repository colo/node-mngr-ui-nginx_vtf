// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import 'mootools'

//import VueBreadcrumbs from 'vue-breadcrumbs'



Vue.use(VueResource)
Vue.use(Vuetify)
Vue.config.productionTip = false

/*Vue.use(VueBreadcrumbs, {
    template: '<v-breadcrumbs icons divider="chevron_right" v-if="$breadcrumbs.length">'+
			'<v-breadcrumbs-item '+
			'	v-for="(item, key) in $breadcrumbs" :key="item.name"'+
			'	:disabled="item.meta.disabled"'+
			'	:append="item.meta.append"'+
			'	:exact="item.meta.exact"'+
			'	:to="item.meta.to"'+
			'	:ripple="item.meta.ripple"'+
			'>'+
			'	{{ item.meta.breadcrumb }}'+
			'</v-breadcrumbs-item>'+
		'</v-breadcrumbs>'
				
});*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
