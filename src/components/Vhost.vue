<template>
	<advanced v-if="advanced_view" v-bind:uri="uri"
	:value="item"
	></advanced>
	<simple v-else v-bind:uri="uri"
	:value="item"
	></simple>
	<!--
  <v-expansion-panel focusable v-else>
    <v-expansion-panel-content v-for="(value,property) in item" :key="property" >
      <div slot="header">{{property}}</div>
      <v-card>
        <v-card-text class="grey lighten-3">
        {{value}}
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
  -->
</template>

<script src='../models/vhost.js'></script>
