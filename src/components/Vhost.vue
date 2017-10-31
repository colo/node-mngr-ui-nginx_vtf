<template>
	<p>{{ uri }}</p>
</template>


<script>
  export default {
		props: ['uri'],
    data () {
			return {
				
			}
		},
		/*beforeRouteEnter (to, from, next) {
			next(vm => {
				// access to component instance via `vm`
				vm.$route.meta.text = vm.$route.params.uri
				console.log(vm.$route)
			})
		},
		beforeRouteUpdate (to, from, next) {
			console.log('beforeRouteUpdate')
			console.log(this.$route)
			next()
		},*/
  }
</script>

