<template>
	<v-app>
		<v-toolbar app>
			<v-toolbar-title>
				
				<!--<breadcrumbs></breadcrumbs>-->
				<v-breadcrumbs icons divider="chevron_right">
					<v-breadcrumbs-item 
						v-for="item in $route.matched" :key="item.name"
						:disabled="item.meta.disabled"
						:append="item.meta.append"
						:exact="item.meta.exact"
						:to="item.meta.to"
						:ripple="item.meta.ripple"
					>
						{{ item.meta.text }}
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
        <v-container grid-list-xl text-xs-center>
					<v-layout row wrap>
						<v-flex xs10 offset-xs1>
-->
            <!-- <v-layout column align-center> -->
              <transition>
								<keep-alive>
									<router-view></router-view>
								</keep-alive>
							</transition>
            <!-- </v-layout> -->
<!--
						</v-flex>
					</v-layout>
        </v-container>
-->	
      </v-content>
	
    </main>
    <v-footer app></v-footer>
	</v-app>
</template>

<script>
  export default {
    data () {
			return {
				search: ''
			}
		}
  }
</script>

