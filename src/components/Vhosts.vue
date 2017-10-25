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
			:total-items="totalItems"
      :loading="loading"
      hide-actions
      v-model="selected"
      item-key="id"
      select-all
    >
			<template slot="headers" slot-scope="props">
				<tr>
					<th>
						<v-checkbox
							primary
							hide-details
							@click.native="toggleAll"
							:input-value="props.all"
							:indeterminate="props.indeterminate"
						></v-checkbox>
					</th>
					</th>
				</tr>
			</template>
      <template slot="items" slot-scope="props">
				<tr v-if="props.item.sub_items" @click="props.expanded = !props.expanded">
					<td>
					</td>
					<td class="text-xs-left">{{ props.item.uri }}</td>
					<td class="text-xs-right"></td>
					<td></td>
        </tr>
        
        <tr :active="props.selected" @click="props.selected = !props.selected" v-else>
				<td>
					<v-checkbox
						primary
						hide-details
						:input-value="props.selected"
					></v-checkbox>
					</td>
					<td class="text-xs-left">{{ props.item.uri }}</td>
					<td class="text-xs-right">{{ props.item.port }}</td>
					<td><v-switch v-model="props.item.enabled"></v-switch></td>
				</tr>
      </template>
      
      
      <template slot="expand" slot-scope="props">
				<v-data-table
					hide-actions
					hide-headers
					ref="data"
					v-bind:items="props.item.sub_items"
					v-model="selected"
					item-key="id"
					select-all
				>
				<template slot="items" slot-scope="sub_item_props">
					<tr :active="sub_item_props.selected_sub" @click="sub_item_props.selected = !sub_item_props.selected">
							<td>
								<v-checkbox
									primary
									hide-details
									:input-value="sub_item_props.selected"
									@click.native="toggle_sub"
								></v-checkbox>
							</td>
							<td class="text-xs-left">{{ sub_item_props.item.uri }}</td>
							<td class="text-xs-right">{{ sub_item_props.item.port }}</td>
							<td><v-switch v-model="sub_item_props.item.enabled"></v-switch></td>
					</tr>
				</template>
				</v-data-table>
				
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
