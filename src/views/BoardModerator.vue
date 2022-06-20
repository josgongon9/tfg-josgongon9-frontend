<template>
  <b-container class="container">
    <b-row align-h="center" class="mt-5">
      <h3>Usuarios de mis organizaciones</h3>
    </b-row>

    <b-row align-h="center">
      <b-col sm="12" md="10" lg="8" xl="6" class="mb-2">
        <b-form>
          <b-form-group
            label="Seleccione una organización:"
            label-for="options"
          >
            <b-form-select
              id="options"
              v-validate="'required'"
              name="options"
              v-model="selected"
            >
              <option
                v-for="(item, index) in options"
                :key="index"
                v-bind:value="item.id"
              >
                {{ item.name }}
              </option></b-form-select
            >
            <b-input-group-append>
              <b-button
                @click="retrieveUsersByMod(selected)"
                size="md"
                class="reload"
              >
                <font-awesome-icon icon="fas fa-redo" />
              </b-button>
            </b-input-group-append>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>

    <b-row align-h="center" class="mb-5">
      <b-table-simple striped responsive>
        <b-thead>
          <b-tr>
            <b-th>Usuario</b-th>
            <b-th>Email</b-th>
            <b-th>Roles</b-th>
            <b-th>Acción</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(item, index) in items" :key="index">
            <b-td style="vertical-align: middle">
              <span>{{ item.username }}</span>
            </b-td>
            <b-td style="vertical-align: middle">{{ item.email }}</b-td>
            <b-td style="vertical-align: middle">
              <div v-for="(rol, a) in item.roles" :key="a">
                <span>{{ rol.name | getRol }}</span>
              </div>
            </b-td>
            <b-td style="vertical-align: middle">
              <router-link :to="{ name: 'viewUser', params: { id: item.id } }">
                <b-button class="btn btn-info">Ver </b-button>
              </router-link>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-row>
  </b-container>
</template>

<script>
import UserService from '../services/user.service';
import OrganizationDataService from '../services/OrganizationDataService';
export default {
  name: 'Moderator',
  data() {
    return {
      items: [],
      searchText: '',
      selected: null,
      options: [],
    };
  },
  filters: {
    getRol: function (value) {
      if (value == 'ROLE_MODERATOR') {
        return 'Moderador';
      } else if (value == 'ROLE_USER') {
        return 'Usuario';
      } else if (value == 'ROLE_ADMIN') {
        return 'Administrador';
      }
    },
  },
  methods: {
    retrieveOrgByUser() {
      UserService.findById(this.$store.state.auth.user.id)
        .then((response) => {
          this.options = response.data.organizations;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    retrieveUsersByMod(idOrg) {
      OrganizationDataService.get(idOrg)
        .then((response) => {
          this.items = response.data.usuarios;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveUsers();
    },
    searchTitle() {
      UserService.findByUser(this.searchText)
        .then((response) => {
          this.items = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveOrgByUser();
  },
};
</script>

<style scoped>
.btn-info {
  text-align: center;
  width: 50%;
  margin-right: 5px;
}
.container {
  text-align: center;
}

@media (max-width: 768px) {
  .search-button {
    text-align: center;
    padding-top: 2%;
    margin-left: 25%;
  }
}

.cursiva {
  font-style: italic;
  font-size: 14px;
}

.reload {
  position: relative;
  left: 100%;
  top: -38px;
}
</style>
