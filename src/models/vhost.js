import advanced from '@/components/vhost/advanced'


export default {
	name: 'vhost',
	props: ['uri', 'id'],
	
	components: {
		'advanced': advanced
	},
	
	data () {
		return {
			item: {},
			advanced_view: true,
		}
	},
	mounted () {
		this.getDataFromApi(this.uri, this.id)
			.then(data => {
				//this.items = data.items
				//this.totalItems = data.total
				this.item = data
			})
	},
	methods: {
		getDataFromApi (uri, id) {
			console.log('getDataFromApi: '+uri+' '+id)
			
			this.loading = true
			return new Promise((resolve, reject) => {
				//const { sortBy, descending, page, rowsPerPage, search } = this.pagination
				
				this.getVhost(uri, id).then(vhost => {
					
					//const total = vhosts.total
					//var items = vhosts.items
					
					///*items.sort(function(a, b){
						//if(a.uri < b.uri) return -1;
						//if(a.uri > b.uri) return 1;
						//return 0;
					//});
							
					//this.items = (this.pagination.descending) ? data.items.reverse() : data.items*/
					
					//if (this.pagination.sortBy && items.length > 0) {
						//items = items.sort((a, b) => {
							//const sortA = a[sortBy]
							//const sortB = b[sortBy]

							//if (descending) {
								//if (sortA < sortB) return 1
								//if (sortA > sortB) return -1
								//return 0
							//} else {
								//if (sortA < sortB) return -1
								//if (sortA > sortB) return 1
								//return 0
							//}
						//})
					//}

					///*if (rowsPerPage > 0) {
						//items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
					//}*/

					setTimeout(() => {
						this.loading = false
						//resolve({
							//items,
							//total
						//})
						resolve(vhost)
					}, 1000)
					
				})
				
				
				
			})
		},
		getVhost (uri, id) {
			console.log('getVhost')
			
			id = id || 0
			
			//const items = []
			
			return new Promise((resolve, reject) => {
				
				////self.URI = window.location.protocol+'//'+window.location.host+window.location.pathname;
				//const { sortBy, descending, page, rowsPerPage, search } = this.pagination
				//console.log(sortBy);
				//console.log(descending);
				//console.log(page);
				//console.log(rowsPerPage);
				
				//this.update_route();
				
				this.$http.get('http://localhost:8080/nginx/vhosts/api/'+uri+'/'+id, {
					headers : {
						"Content-Type": "application/json",
						"Accept": "application/json",
						"Cache-Control": "no-store",
						"Cache-Control": "no-cache, no-store, must-revalidate"
					 },
				}).then(function(res){
					
					console.log(res.body);
					resolve(res.body);
					
				}, function(res){
					if(res.status == 404)
						resolve({total: 0, items: []});
						
					console.log('Error:');
					console.log(res);
				});
				
				
			})
			
			
			
		}
	}
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

