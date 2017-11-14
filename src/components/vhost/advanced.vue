<!--
* https://www.npmjs.com/package/vue-json-editor
+ https://www.npmjs.com/package/jsoneditor

https://ace.c9.io/
https://github.com/chairuosen/vue2-ace-editor
https://github.com/dhenkes/vue2-ace




schema:
https://www.npmjs.com/package/json-editor
-->

<template>
    <v-container grid-list-xl text-xs-center>
      <v-toolbar color="indigo" dark>
        <v-toolbar-title>{{uri}}</v-toolbar-title>
      </v-toolbar>
      <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout row wrap>
          <v-flex>
          <div id="jsoneditor"></div>
          
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

<style src="jsoneditor/dist/jsoneditor.css"></style>

<script src='../../models/vhost/advanced.js'></script>
