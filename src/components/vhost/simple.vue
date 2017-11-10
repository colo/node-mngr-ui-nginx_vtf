
<template>
    <v-container>
      <v-toolbar color="indigo" dark>
        <v-toolbar-title>{{uri}}</v-toolbar-title>
      </v-toolbar>
      <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout>
          <v-flex id="jsoneditor">
          <!-- <div id="jsoneditor" style="width: 400px; height: 400px;"></div> -->
          
          
          <!--
          <vue-json-editor v-model="item" :showBtns="false" @json-change="onJsonChange"></vue-json-editor>
          -->
          
          <!--
            <v-card>
            
              <v-card-media>
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="headline white--text">
                       <v-text-field v-bind:value="JSON.stringify(value)"></v-text-field>
                      </span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
              
            </v-card>
					-->
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
</template>



<script>
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
		}
	},
	methods: {
		onJsonChange (json) {
			console.log('value:', json)
		}
	},
	watch: {
		value: function (val) {
      //this.item = val
      this.editor.setValue(val);
			//this.editor.expandAll();
    },
	},
	mounted: function (){
		console.log('---mounted---')
			
		var options = {
			 theme: 'bootstrap3',
			 iconlib: "bootstrap3",
			 //"disable_collapse": true,
			 "disable_edit_json": true,
			 disable_array_delete_all_rows: true,
			 //"expand_height": true,
			 //grid_columns: 12,
			 schema: {
				type: "object",
				format: "grid",
				title: "Virtual Host",
				"properties": {
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
							"headerTemplate": "{{ self._value }}",
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
			}
		};
		
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
						//console.log(row.getHeaderText());
						if(row.getHeaderText().length > 15){
							row.tab_text.textContent = row.getHeaderText().substr(0,10)+'...'+row.getHeaderText().substr(-5);
						}
						else{
							row.tab_text.textContent = row.getHeaderText();
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
		// Add a resolver function to the beginning of the resolver list 
		// This will make it run before any other ones 
		window.JSONEditor.defaults.resolvers.unshift(function(schema) {
			if(schema.type === "array" && schema.format === "location") {
				return "location";
			}
		 
			// If no valid editor is returned, the next resolver function will be used 
		});
		this.editor = new window.JSONEditor(document.getElementById('jsoneditor'), options);
		//editor.set(this.item);
		//editor.expandAll();

		//var json = editor.get(json);
	}
	/*beforeUpdate: function () {
		console.log('created')
    this.item = this.value
  }*/
}

</script>

<!--<style src='jqueryui/jquery-ui.min.css'></style>-->

<style src='bootstrap/dist/css/bootstrap.min.css'></style>


<!--<script src='json-editor/dist/jsoneditor.js'></script>-->
<!--<style src='json-editor/dist/jsoneditor.css'></style>-->


