//import vueJsonEditor from 'vue-json-editor'
//import 'json-editor/dist/jsoneditor.js'
import JSONEditor from 'json-editor/dist/jsoneditor.js'

//import jQuery from 'jquery/dist/jquery.min.js'
//import 'bootstrap'

export default {
  name: 'simple',
  props: ['uri', 'id', 'value'],
	components: {
		//vueJsonEditor
		//'jsoneditor': jsoneditor
	},
	data () {
		return {
			item: {},
			editor: null,
			schema: {
				type: "object",
				format: "grid",
				title: "Virtual Host",
				"properties": {
					"listen": {
						//"type": "array",
						"format": "tabs",
						"items": {
							format: "grid",
							"headerTemplate": "{{ self }}",
							title: "listen",
						},
					},
					"include": {
						"type": "array",
						format: "tabs",
						"uniqueItems": true,
						"items": {
							"type": "string",
							"title": "file"
						}
					},
					"location": {
						"type": "array",
						"format": "location",
						"items": {
							"type": "object",
							format: "grid",
							//"headerTemplate": "{{ self._value }}",
							title: "location",
							/*"id": "loc_item",
							"properties": {
								"_value": {
									 "type": "string",
								},
								"name": {
									"type": "string",
									"template": "{{ value }}",
									"watch": {
										"value": "loc_item._value",
									}
								}
							},*/
						},
						
						
					}
				}
			},
		}
	},
	methods: {
		onJsonChange (json) {
			console.log('value:', json)
		}
	},
	watch: {
		value: function (val) {
      
			
			var options = {
				theme: 'bootstrap3',
				iconlib: "bootstrap3",
				//"disable_collapse": true,
				"disable_edit_json": true,
				disable_array_delete_all_rows: true,
				//"expand_height": true,
				//grid_columns: 12,
				schema: this.schema
			};
		
			this.editor = new window.JSONEditor(document.getElementById('jsoneditor'), options);
			this.editor.setValue(val);
			
    },
	},
	mounted: function (){
		
		/**
		* (re)enable bootrap
		* */
		const styles = document.getElementsByTagName('style');
		
		for (var i = 0, style; style = styles[i]; i++) {
			if(style.innerText.match(/Bootstrap/ig))
				style.disabled = false
		}
		
		
		console.log('---mounted---')
			
		
		
		/*var options = {
			"mode": "code",
			"indentation": 2
		};*/
		
		
		window.JSONEditor.defaults.editors.location = window.JSONEditor.defaults.editors.array.extend({
			refreshTabs: function(refresh_headers) {
				var self = this;
				this.rows.forEach(function(row, i) {
					if(!row.tab) return;

					if(refresh_headers) {
						//console.log(row);
						
						const header = row.value._value;
						
						if(header.length > 15){
							row.tab_text.textContent = header.substr(0,10)+'...'+header.substr(-5);
						}
						else{
							row.tab_text.textContent = header;
						}
					}
					else {
						if(row.tab === self.active_tab) {
							self.theme.markTabActive(row.tab);
							row.container.style.display = '';
						}
						else {
							self.theme.markTabInactive(row.tab);
							row.container.style.display = 'none';
						}
					}
				});
			},


			build: function(){
				
				
				//console.log(this.schema.items)
				var self = this;
				self.schema.format = 'tabs';
				self._super();
			}
			
		});
		/*window.JSONEditor.defaults.editors.location = window.JSONEditor.AbstractEditor.extend({
			
			getHeaderText: function(){
				const header = this._super();
				console.log(header);
				if(header.length > 15){
					return header.substr(0,10)+'...'+header.substr(-5);
				}
				else{
					return header;
				}
			}

		});*/
		
		// Add a resolver function to the beginning of the resolver list 
		// This will make it run before any other ones 
		window.JSONEditor.defaults.resolvers.unshift(function(schema) {
			if(schema.type === "array" && schema.format === "location") {
				return "location";
			}
			
			/*if(schema.type === "string" && schema.format === "location") {
			console.log(schema);
				return "location";
			}*/
			
			// If no valid editor is returned, the next resolver function will be used 
		});
		
		
		
	},
	beforeDestroy () {
		console.log('---beforeDestroy--')
		/**
		* disable bootrap before leaving the page
		* */
		const styles = document.getElementsByTagName('style');
		
		for (var i = 0, style; style = styles[i]; i++) {
			if(style.innerText.match(/Bootstrap/ig))
				style.disabled = true
		}
		
		//console.log(typeOf(styles))
		
	},
	/*beforeUpdate: function () {
		console.log('created')
    this.item = this.value
  }*/
}
