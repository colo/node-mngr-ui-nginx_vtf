//import vueJsonEditor from 'vue-json-editor'
import JSONEditor from 'jsoneditor/dist/jsoneditor.min.js'
//import 'mootools'

export default {
  name: 'advanced',
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
      this.editor.set(val);
			//this.editor.expandAll();
    },
	},
	mounted: function (){
		console.log('---mounted---')
			
		var options = {
			"mode": "tree",
			"search": true,
			"modes": ['tree', 'view', 'form', 'code'],
			"indentation": 2
		};
		
		/*var options = {
			"mode": "code",
			"indentation": 2
		};*/

		this.editor = new JSONEditor(document.getElementById('jsoneditor'), options);
		//editor.set(this.item);
		//editor.expandAll();

		//var json = editor.get(json);
	}
	/*beforeUpdate: function () {
		console.log('created')
    this.item = this.value
  }*/
}
