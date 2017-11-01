export default {
  name: 'vhosts',
	data () {
    return {
			totalItems: 0,
      visible: 5,
      items: [],
      loading: true,
      pagination: {
				rowsPerPage: (this.$route.query.rowsPerPage || 5).toInt(),
				sortBy: 'uri',
				descending: JSON.parse(this.$route.query.descending || false),
				page: (this.$route.query.page || 1).toInt(),
				search: ''
			},
      selected: [],
      headers: [
        {
          text: 'Uri',
          align: 'left',
          value: 'uri'
        },
        {
          text: 'Port',
          align: 'right',
          value: 'port',
          sortable: false
        },
        {
          text: 'Enabled',
          align: 'left',
          sortable: false
        }
      ]
    }
  },
  computed: {
		pages () {
			console.log('--pages--')
			//console.log(this.pagination)
			//console.log(this.items)
			
			return this.pagination.rowsPerPage ? Math.ceil(this.totalItems / this.pagination.rowsPerPage) : 0
		},
		all_toogled (){
			var length = this.items.length
			
			this.items.forEach(function(item) {
					if(item.sub_items)
						length += item.sub_items.length
			});
			
			return (this.selected.length == length) ? true : false
				
		}
		
	},
  watch: {
		/*'$route' (to, from) {
      console.log('---vhosts route---')
      
    },*/
		selected: function () {
      console.log('--selected---')
      this.selected.forEach(function(item) {
				console.log(item.id)
			});
      //console.log(this.selected)
    },
    pagination: {
      handler () {
				console.log('--pagination--')
				this.getDataFromApi()
				.then(data => {
					this.items = data.items
					this.totalItems = data.total
				})
      },
      deep: true
    }
  },
  // commented because getDataFromApi es called on pagination.sync
	/*mounted () {
		this.getDataFromApi()
			.then(data => {
				this.items = data.items
				this.totalItems = data.total
			})
	},*/
	/*beforeRouteEnter (to, from, next) {
		console.log('--beforeRouteEnter to:')
		console.log(to)
		console.log('--beforeRouteEnter from:')
		console.log(from)
		
		next()
  },*/
  /*beforeRouteUpdate (to, from, next) {
    console.log('--beforeRouteUpdate to:')
		console.log(to)
		console.log('--beforeRouteUpdate from:')
		console.log(from)
		
		next()
  },*/
  methods: {
		//getData () {
			
			//this.getDataFromApi()
				//.then(data => {
					//this.items = data.items
					//this.totalItems = data.total
				//})
		//},
		search (event){
			console.log('search on api:'+event.target.value);
			
			if(event.target.value.length >= 3 || event.target.value.length == 0){//0 = clean search
				//console.log('search on api:'+event.target.value);
				this.pagination.page = 1;
				this.pagination.search = event.target.value;
				this.$emit('update:pagination')
				//this.getDataFromApi()
				//.then(data => {
					//this.items = data.items
					//this.totalItems = data.total
				//})
				
			}
			
		},
		update_route () {
			console.log('---update_route--');
			console.log(this.pagination);
			
			const { sortBy, descending, page, rowsPerPage, search } = this.pagination
			this.$router.push({ path: '/vhosts/', query: {
					sortBy: sortBy,
					descending: descending,
					page: page,
					rowsPerPage: rowsPerPage,
					search: search
				}
			})
		},
		changeSort (column) {
			if (this.pagination.sortBy === column) {
				this.pagination.descending = !this.pagination.descending
			} else {
				this.pagination.sortBy = column
				this.pagination.descending = false
			}
			
			this.update_route()
			
		},
		toggle_all () {
			//console.log('---toggle_all---')
			const self = this
			if (this.selected.length) {
				this.selected = []
				//this.all_toogled = false
			}
			else {
				this.selected = this.items.slice()
				this.items.forEach(function(item) {
						if(item.sub_items){
							item.sub_items.forEach(function(sub_item) {
								self.selected.push(sub_item)
							});
						}
						//else{
							//self.selected.push(item)
						//}
				});
				
				//this.all_toogled = true
			}
			
			console.log(this.selected);
		},
		toggle_sub (sub_item, item) {
			console.log('---toggle_sub---')
			console.log(this.all_toogled);
			
			var sub_item_index = this.selected.indexOf(sub_item);
			var item_index = 0;
			
			if( sub_item_index == -1 ){
				/*if(this.selected.length > 0){//at least one toogled
					this.selected.push(sub_item);
				}
				else{
					this.selected.push(sub_item);
					
				}*/
				
				
				/*if( this.selected.indexOf(item) == -1 )//if we added the sub_item & item not found, add
					this.selected.push(item);*/
				
				if(this.selected.length < (this.pagination.rowsPerPage - 1)){//if not all selected, add both
					if(this.selected.indexOf(item) == -1)
						this.selected.push(item);
						
					this.selected.push(sub_item);
				}
				else{
					this.selected.push(sub_item);
				}
				//check if all other item.sub_item are selected
				/*var found = 0;
				item.sub_items.forEach(function(sub) {
					
					if(found >= 0){
						found = this.selected.indexOf(sub);
					}
					
					console.log('sub....'+found);
						
				}.bind(this));
				
				//if all item.sub_items are found
				if(found > 0){
					console.log('all found....');
					this.selected.push(item)
				}
				else if (this.selected.length == this.pagination.rowsPerPage - 1)){//
				}*/
			}
			else{
				
				if( this.all_toogled ){//remove the sub_item & item found, remove
					console.log('removing...')
					sub_item_index = this.selected.indexOf(sub_item);
					this.selected.splice(sub_item_index, 1);
				
					item_index = this.selected.indexOf(item)
					if(item_index > -1)
						this.selected.splice(this.selected.indexOf(item), 1);
				}
				else{//remove the sub_item, we remove the item only if no other item.sub_item found
					sub_item_index = this.selected.indexOf(sub_item);
					this.selected.splice(sub_item_index, 1);
					
					var found = -1;
					item.sub_items.forEach(function(sub) {
						
						if(found == -1){
							found = this.selected.indexOf(sub);
						}
						
						console.log('sub....'+found);
							
					}.bind(this));
					
					if(found == -1){//no sub_item found
						console.log('not found....');
						//item_index = this.selected.indexOf(item);
						if(this.selected.length == 1){
							this.selected = [];
						}
						else{
							this.selected.splice(this.selected.indexOf(item), 1);
						}
						
					}
				}
				
				
			}
			
			console.log('this.all_toogled');
			console.log(this.all_toogled);
			/*console.log(this.selected);
			console.log(sub_item)
			console.log(item)*/
			
		},
		/*prevPage () {
			console.log('prevPage:')
			this.update_route()
		},
		nextPage () {
			console.log('nextPage')
			//console.log(this.$router)
			this.update_route()
		},
		numPage () {
			console.log('numPage')
			this.update_route()
		},*/
		getDataFromApi () {
			console.log('getDataFromApi')
			
      this.loading = true
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage, search } = this.pagination
				
				this.getVhosts().then(vhosts => {
					
					const total = vhosts.total
					var items = vhosts.items
					
					/*items.sort(function(a, b){
						if(a.uri < b.uri) return -1;
						if(a.uri > b.uri) return 1;
						return 0;
					});
							
					this.items = (this.pagination.descending) ? data.items.reverse() : data.items*/
					
					if (this.pagination.sortBy && items.length > 0) {
						items = items.sort((a, b) => {
							const sortA = a[sortBy]
							const sortB = b[sortBy]

							if (descending) {
								if (sortA < sortB) return 1
								if (sortA > sortB) return -1
								return 0
							} else {
								if (sortA < sortB) return -1
								if (sortA > sortB) return 1
								return 0
							}
						})
					}

					/*if (rowsPerPage > 0) {
						items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
					}*/

					setTimeout(() => {
						this.loading = false
						resolve({
							items,
							total
						})
					}, 1000)
					
				})
				
        
        
      })
    },
    getVhosts (search) {
			console.log('getVhosts')
			
			//const items = []
			
			return new Promise((resolve, reject) => {
				
				//self.URI = window.location.protocol+'//'+window.location.host+window.location.pathname;
				const { sortBy, descending, page, rowsPerPage, search } = this.pagination
				console.log(sortBy);
				console.log(descending);
				console.log(page);
				console.log(rowsPerPage);
				
				this.update_route();
				this.$http.get('http://localhost:8080/nginx/vhosts/api/?sort='+sortBy+'&descending='+descending+'&page='+page+'&rows='+rowsPerPage+'&search='+search, {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Cache-Control": "no-store",
					"Cache-Control": "no-cache, no-store, must-revalidate"
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
}
