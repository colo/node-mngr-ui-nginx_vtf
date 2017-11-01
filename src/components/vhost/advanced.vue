<template>
    <v-container grid-list-xl text-xs-center>
      <v-toolbar color="indigo" dark>
        <v-toolbar-title>{{uri}}</v-toolbar-title>
      </v-toolbar>
      <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout row wrap>
          <v-flex>
            <v-card>
              <v-card-media height="200px"
              >
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
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
</template>

<script>
export default {
  name: 'advanced',
  props: ['uri', 'id', 'value'],

}
</script>

<!-- <script src='../models/vhost.js'></script> -->
