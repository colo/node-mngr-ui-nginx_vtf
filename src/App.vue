<template>
	<v-app>
		<v-toolbar app>
			<v-toolbar-title>
				
				<v-breadcrumbs icons divider="chevron_right">
					<v-breadcrumbs-item 
						v-for="item in routes" :key="item.text"
						:disabled="item.disabled"
						:append="item.append"
						:exact="item.exact"
						:to="item.to"
						:ripple="item.ripple"
					>
						{{ item.text }}
					</v-breadcrumbs-item>
				</v-breadcrumbs>
				
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
			<!--
			 <v-toolbar-items class="hidden-sm-and-down">
				<v-text-field
					append-icon="search"
					label="Search"
					single-line
					hide-details
					v-model="search"
				></v-text-field>
			</v-toolbar-items>
			-->
		</v-toolbar>
		<main>
      <v-content>
      <!--
				<v-container grid-list-xl text-xs-left>
					<v-layout row wrap>

					<v-breadcrumbs icons divider="chevron_right">
						<v-breadcrumbs-item 
							v-for="item in routes" :key="item.text"
							:disabled="item.disabled"
							:append="item.append"
							:exact="item.exact"
							:to="item.to"
							:ripple="item.ripple"
						>
							{{ item.text }}
						</v-breadcrumbs-item>
					</v-breadcrumbs>

					</v-layout>
				</v-container>
				-->
				
        <v-container grid-list-xl text-xs-center>
					<v-layout row wrap>
						<v-flex xs10 offset-xs1>
            <!-- <v-layout column align-center> -->
              <router-view></router-view>
            <!-- </v-layout> -->
						</v-flex>
					</v-layout>
        </v-container>
      </v-content>
		
    </main>
    <v-footer app></v-footer>
	</v-app>
</template>

<script>
  export default {
    data () {
			return {
				search: '',
				routes: [
					{
						text: 'Nginx',
						append: true,
						to: '/',
						exact:true,
						disabled: false,
						ripple: true
					},
					{
						text: 'Virtual Hosts',
						append: true,
						to: '/vhosts/',
						exact:true,
						disabled: false
					},
					/*{
						text: 'www.example.com',
						append: true,
						to: '/vhosts/www.example.com',
						disabled: false
					}*/
				],
			}
		}
  }
</script>

// main.styl
// <style lang="stylus">
//  @import './stylus/main'
// </style>


<style src="vuetify/dist/vuetify.min.css"></style>
