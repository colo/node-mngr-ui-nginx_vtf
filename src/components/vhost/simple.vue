
<template>
    <v-container grid-list-xl text-xs-center>
      <v-toolbar color="indigo" dark>
        <v-toolbar-title>{{uri}}</v-toolbar-title>
      </v-toolbar>
      <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout row wrap>
          <v-flex>
          <div id="jsoneditor" style="width: 400px; height: 400px;"></div>
          
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
			 schema: {
				type: "object",
				title: "Virtual Host",
				format: "tabs",
				"properties": {
					"listen": {
						"type": "string",
						"description": "Listen IP & Port",
					},
					"server_name": {
						"type": "string",
						"description": "URI",
					},
					"access_log": {
						"type": "object",
						"description": "Access Log",
					}
				}
			}
		};
		
		/*var options = {
			"mode": "code",
			"indentation": 2
		};*/
		
		//console.log(window.JSONEditor);
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


