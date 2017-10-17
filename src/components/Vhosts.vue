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
      v-bind:headers="headers"
      v-bind:items="items"
      v-bind:search="search"
      v-bind:pagination.sync="pagination"
      :total-items="totalItems"
      :loading="loading"
      v-model="selected"
      item-key="id"
      select-all
      class="elevation-1"
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

<script>
export default {
  name: 'vhosts',
    data () {
    return {
      search: '',
      totalItems: 0,
      items: [],
      loading: true,
      pagination: {},
      selected: [],
      headers: [
        {
          text: 'Uri',
          align: 'left',
          value: 'uri'
        },
        {
          text: 'Port',
          align: 'right',
          value: 'port',
          sortable: false
        },
        {
          text: 'Enabled',
          align: 'left',
          sortable: false
        }
      ]
    }
  },
  watch: {
    pagination: {
      handler () {
        this.getDataFromApi()
          .then(data => {
            this.items = data.items
            this.totalItems = data.total
          })
      },
      deep: true
    }
  },
  mounted () {
    this.getDataFromApi()
      .then(data => {
        this.items = data.items
        this.totalItems = data.total
      })
  },
  methods: {
		getDataFromApi () {
      this.loading = true
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination

        let items = this.getDesserts()
        const total = items.length

        if (this.pagination.sortBy) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy]
            const sortB = b[sortBy]

            if (descending) {
              if (sortA < sortB) return 1
              if (sortA > sortB) return -1
              return 0
            } else {
              if (sortA < sortB) return -1
              if (sortA > sortB) return 1
              return 0
            }
          })
        }

        if (rowsPerPage > 0) {
          items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
        }

        setTimeout(() => {
          this.loading = false
          resolve({
            items,
            total
          })
        }, 1000)
      })
    },
    getDesserts () {
      return [
        {
					id: 0,
          uri: 'www.example.com',
          port: 80,
          enabled: false
        },
				{
					id: 1,
          uri: 'www.example.com',
          port: 443,
          enabled: true
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
