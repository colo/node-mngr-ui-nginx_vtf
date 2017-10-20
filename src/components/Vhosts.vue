<template>
  <v-card>
    <v-card-title>
      Virtual Hosts
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
			ref="data"
      v-bind:headers="headers"
      v-bind:items="items"
      v-bind:search="search"
      v-bind:pagination.sync="pagination"
      :loading="loading"
      hide-actions
      v-model="selected"
      item-key="id"
      select-all
    >
      <template slot="items" slot-scope="props">
				<td>
          <v-checkbox
            primary
            hide-details
            v-model="props.selected"
          ></v-checkbox>
        </td>
        <td class="text-xs-left">{{ props.item.uri }}</td>
        <td class="text-xs-right">{{ props.item.port }}</td>
        <td><v-switch v-model="props.item.enabled"></v-switch></td>
      </template>
    </v-data-table>
    <v-pagination
			v-model="pagination.page"
			:total-visible="visible"
			:length="pages"
			@previous="prevPage"
			@next="nextPage"
			@input="numPage"
			circle></v-pagination>
    <v-card-text style="height: 100px; position: relative">
			<v-btn
				absolute
				dark
				fab
				bottom
				right
				color="pink"
			>
				<v-icon>add</v-icon>
			</v-btn>
		</v-card-text>
  </v-card>
</template>

<script src='../models/vhosts.js'></script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
