<template>
	<v-app>
		<v-toolbar app>
			<v-toolbar-title>Title</v-toolbar-title>
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
			}
		}
  }
</script>

<style src="vuetify/dist/vuetify.min.css"></style>
