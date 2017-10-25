export default {
  name: 'vhosts',
	data () {
    return {
      search: '',
      totalItems: 0,
      visible: 5,
      items: [],
      loading: true,
      pagination: {
				rowsPerPage: 10,
			},
      selected: [],
      selected_sub: [],
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
  /*computed: {
		length () {
			return Math.floor(this.totalItems / 5)
		}
  },*/
  computed: {
		pages () {
			console.log('--pages--')
			//console.log(this.pagination)
			//console.log(this.items)
			
			return this.pagination.rowsPerPage ? Math.ceil(this.totalItems / this.pagination.rowsPerPage) : 0
		}
	},
  watch: {
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
  /*mounted () {
			console.log(this)
			console.log(this.$refs)
			console.log(this.$refs.data.$children[4].click)
			console.log(this.$refs.data.$children[4].href)
	},*/
  // commented because getDataFromApi es called on pagination.sync
	//mounted () {
	//this.getDataFromApi()
		//.then(data => {
			//this.items = data.items
			//this.totalItems = data.total
		//})
	//},
  methods: {
		toggleAll () {
			console.log('---toggleAll---')
			const self = this
			if (this.selected.length) {
				this.selected = []
			}
			else {
				this.selected = this.items.slice()
				this.items.forEach(function(item) {
						if(item.sub_items)
						item.sub_items.forEach(function(sub_item) {
							self.selected.push(sub_item)
						});
				});
			}
		},
		toggle_sub (event) {
			console.log('---toggle_sub---')
			console.log(event.target)
		},
		prevPage () {
			console.log('prevPage:')
		},
		nextPage () {
			console.log('nextPage')
		},
		numPage () {
			console.log('numPage')
		},
		getDataFromApi () {
			console.log('getDataFromApi')
			
      this.loading = true
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination
				
				this.getVhosts().then(vhosts => {
					
					const total = vhosts.total
					var items = vhosts.items
					
					/*if (this.pagination.sortBy) {
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
					}*/

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
    getVhosts () {
			console.log('getVhosts')
			
			//const items = []
			
			return new Promise((resolve, reject) => {
				
				//self.URI = window.location.protocol+'//'+window.location.host+window.location.pathname;
				const { sortBy, descending, page, rowsPerPage } = this.pagination
				console.log(sortBy);
				console.log(descending);
				console.log(page);
				console.log(rowsPerPage);
				
				this.$http.get('http://localhost:8080/nginx/vhosts/api/?sort='+sortBy+'&descending='+descending+'&page='+page+'&rows='+rowsPerPage, {
					headers : { "Content-Type": "application/json", "Accept": "application/json" },
				}).then(function(res){
					
					console.log(res.body);
					resolve(res.body);
					
				}, function(res){
					console.log('Error:');
					console.log(res);
				});
				
				//get all vhosts
				/*this.$http.get('http://localhost:8081/nginx/vhosts', {
					headers : { "Content-Type": "application/json", "Accept": "application/json" },
				}).then(function(res){
					
					const uris = res.body
					
					//console.log(uris)
					
					var total = uris.length
					
					//get enabled vhosts
					this.$http.get('http://localhost:8081/nginx/vhosts/enabled', {
						headers : { "Content-Type": "application/json", "Accept": "application/json" },
					}).then(function(res){
						
						const enabled_uris = res.body
						
						//console.log(enabled_uris)
						
						Array.each(uris, function (uri, index){
							
							
							//get vhost properties
							this.$http.get('http://localhost:8081/nginx/vhosts/'+uri, {
								headers : { "Content-Type": "application/json", "Accept": "application/json" },
							}).then(function(res){
								
								
								const data = res.body
								
								//console.log(uri)
								//console.log(data)
								
								if(data instanceof Array){//uri has more than 1 vhost
									total += data.length - 1
									
									
									Array.each(data, function(tmp_item, tmp_index){
											const vhost = {}
											vhost.id = uri +'_'+tmp_index
											vhost.uri = uri
											
											var tmp_listen = tmp_item.listen.split(":")
											if(tmp_listen instanceof Array || typeof(tmp_listen) == 'array')
												tmp_listen = tmp_listen = tmp_listen[tmp_listen.length - 1]
											
											//console.log(tmp_listen)
											
											tmp_listen = tmp_listen.split(' ')
											if(tmp_listen instanceof Array || typeof(tmp_listen) == 'array')
												tmp_listen = tmp_listen[0]
											
											vhost.port = tmp_listen
											
											if(enabled_uris.contains(vhost.uri)){
												this.$http.get('http://localhost:8081/nginx/vhosts/enabled/'+uri, {
													headers : { "Content-Type": "application/json", "Accept": "application/json" },
												}).then(function(res){
													
													const enabled_data = res.body
													
													if(enabled_data instanceof Array){
														Array.each(enabled_data, function(enabled_data_item, index){
															if(vhost.enabled !== true)
																vhost.enabled = (tmp_item.listen == enabled_data_item.listen) ? true : false
																
														})
													}
													else{
														vhost.enabled = (tmp_item.listen == enabled_data.listen) ? true : false
													}
													
												}, function(res){
													console.log('Error:');
													console.log(res);
												});
												
												vhost.enabled = true
											}
										
											items.push(vhost)
									}.bind(this))
									
									
								}
								else{
									//console.log(data)
									
									const vhost = {}
									vhost.id = uri
									vhost.uri = uri
									
									//console.log(data.listen)
									
									if(typeof(data.listen) == 'string'){
										var tmp_listen = data.listen.split(":")
										
										if(tmp_listen instanceof Array || typeof(tmp_listen) == 'array')
											tmp_listen = tmp_listen = tmp_listen[tmp_listen.length - 1]
										
										tmp_listen = tmp_listen.split(' ')
										if(tmp_listen instanceof Array || typeof(tmp_listen) == 'array')
											tmp_listen = tmp_listen[0]
											
										vhost.port = tmp_listen
										
									}
									else{//array
										var port = ''
										Array.each(data.listen, function(listen, listen_index){
											var tmp_listen = listen.split(":")
											
											if(tmp_listen instanceof Array || typeof(tmp_listen) == 'array')
												tmp_listen = tmp_listen[tmp_listen.length - 1]
											
											//console.log('-----tmp_listen----')
											//console.log(tmp_listen)
											tmp_listen = tmp_listen.split(' ')
											if(tmp_listen instanceof Array || typeof(tmp_listen) == 'array')
												tmp_listen = tmp_listen[0]
											
											port += tmp_listen
											if(listen_index < data.listen.length - 1)
												port += ' : '
										})
										
										vhost.port = port
									}
									
									if(enabled_uris.contains(vhost.uri))
										vhost.enabled = true
									
									items.push(vhost)
								}
								
								//console.log('---total---')
								//console.log(total)
								//console.log(items.length)
								
								if(items.length == total){
									//console.log(items);
									//console.log(total);
									resolve(items)
								}
							
							}, function(res){
								console.log('Error:');
								console.log(res);
							});
							
							
						
						}.bind(this));
						
					}, function(res){//not found
							console.log('Error:');
							console.log(res);
					});
								
					
					
					
					
				}, function(res){
					console.log('Error:');
					console.log(res);
				});
				
				*/
			})
			
      /*
      return [
        {
					id: 0,
          uri: 'www.example.com',
          port: 80,
          enabled: false
        },
				{
					id: 1,
          uri: 'www.example.com',
          port: 443,
          enabled: true
        }
      ]
      */
      
      
    }
  }
}
