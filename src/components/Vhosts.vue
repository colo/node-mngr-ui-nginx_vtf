<template>
	<v-container grid-list-xl text-xs-center v-if="/^\/vhosts\/$/.test($route.path)">
	<v-card>
    <v-card-title>
      Virtual Hosts
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        @keyup.enter="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
			ref="data"
      v-bind:headers="headers"
      v-bind:items="items"
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
							@click.native="toggle_all"
							:input-value="props.all"
							:indeterminate="props.indeterminate"
						></v-checkbox>
					</th>
					<th v-for="header in props.headers" :key="header.text"
          :class="[header.sortable === false ? '' : 'column sortable',
          (pagination.descending && header.sortable !== false) ? 'desc' : 'asc',
          header.value === pagination.sortBy ? 'active' : '',
          'text-xs-'+header.align]"
          @click="header.sortable !== false ? changeSort(header.value) : ''"
        >
          <v-icon v-if="header.sortable !== false">arrow_upward</v-icon>
          {{ header.text }}
        </th>
				</tr>
			</template>
      <template slot="items" slot-scope="props">
				<tr v-if="props.item.sub_items" :active="props.selected" @click="props.expanded = !props.expanded">
					<td>
					</td>
					<td class="text-xs-left">
						{{ props.item.uri }}
					</td>
					<td class="text-xs-right"></td>
					<td class="text-xs-left">
						<v-icon v-if="!props.expanded">arrow_downward</v-icon>
						<v-icon v-else>arrow_upward</v-icon>
					</td>
        </tr>
        
        <tr v-else>
				<td :active="props.selected" @click="props.selected = !props.selected">
					<v-checkbox
						primary
						hide-details
						:input-value="props.selected"
					></v-checkbox>
					</td>
					<td class="text-xs-left">
						<!--{{ props.item.uri }}-->
						<router-link v-bind:to="'/vhosts/'+props.item.uri">{{props.item.uri}}</router-link>
					</td>
					<td class="text-xs-right">{{ props.item.port }}</td>
					<td><v-switch v-model="props.item.enabled"></v-switch></td>
				</tr>
      </template>
      
      
      <template slot="expand" slot-scope="props">
				<v-data-table
					hide-actions
					hide-headers
					ref="sub_data"
					v-bind:items="props.item.sub_items"
					v-model="selected"
					item-key="id"
				>
				<template slot="items" slot-scope="sub_item_props">
					<!-- <tr :active="props.selected" @click="props.selected = !props.selected"> -->
					<tr>
							<td>
								<v-checkbox
									primary
									hide-details
									:input-value="sub_item_props.selected"
									@click.native="toggle_sub(sub_item_props.item, props.item)"
								></v-checkbox>
							</td>
							<td class="text-xs-left">
								<!--{{ sub_item_props.item.id }}-->
								<router-link
								 v-bind:to="'/vhosts/'+sub_item_props.item.uri+'/'+sub_item_props.item.id.split('_')[1]">
								 {{sub_item_props.item.uri}}
								</router-link>
							</td>
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
			circle></v-pagination>
			<!--
			@previous="update_route"
			@next="update_route"
			@input="update_route"
			-->
    <v-card-text style="height: 100px; position: relative">
			<!-- if no vhost selected, show "add" button -->
			<v-speed-dial
				absolute
				right
				fab
				v-if="selected.length == 0"
				@click.native="create"
			>
				<v-btn
					slot="activator"
					color="blue"
					dark
					fab
					hover
					v-model="speed_dial.fab"
				>
					<v-icon>add</v-icon>
				</v-btn>
			</v-speed-dial>
			<!-- else, speed dial -->
			<v-speed-dial
				absolute
				right
				slide-y-reverse-transition
				v-model="speed_dial.fab"
				:transition="speed_dial.transition"
				v-else
			>
				<v-btn
					slot="activator"
					color="blue"
					dark
					fab
					hover
					v-model="speed_dial.fab"
				>
					<v-icon>keyboard_arrow_up</v-icon>
					<v-icon>close</v-icon>
				</v-btn>
				<v-btn
					fab
					dark
					small
					color="green"
					@click.native="edit"
				>
					<v-icon>edit</v-icon>
				</v-btn>
				<v-btn
					fab
					dark
					small
					color="red"
					@click.native="del"
				>
					<v-icon>delete</v-icon>
				</v-btn>
			</v-speed-dial>
			
		</v-card-text>
  </v-card>
  </v-container>
  <!-- show children (vhosts/:uri) -->
  <v-card v-else>
		<transition>
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</transition>
	</v-card>
	
</template>

<script src='../models/vhosts.js'></script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
