
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


<!--<style src='jqueryui/jquery-ui.min.css'></style>-->
<!--<style src='bootstrap-2.3.2/css/bootstrap.min.css'></style>-->
<!--<script src='json-editor/dist/jsoneditor.js'></script>-->
<!--<style src='json-editor/dist/jsoneditor.css'></style>-->

<style src='bootstrap/dist/css/bootstrap.min.css'></style>
<script src='../../models/vhost/simple.js'></script>


