<template>
  <b-container class="container">
    <b-row align-h="center" class="mt-5">
      <h3>Todos los usuarios</h3>
    </b-row>

    <b-row align-h="center">
      <b-col sm="12" md="10" lg="8" xl="6" class="mb-2">
        <b-input-group>
          <b-form-input
            v-model="searchText"
            size="md"
            class="search-input"
            placeholder="Buscar usuario."
          ></b-form-input>
          <b-input-group-append>
            <b-button @click="searchTitle" size="md" class="search-b">
              <font-awesome-icon icon="search" />
            </b-button>
          </b-input-group-append>
        </b-input-group>
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
                <b-button class="btn btn-danger">Eliminar</b-button>
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

export default {
  name: 'Administrador',
  data() {
    return {
      items: [],
      searchText: '',
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
    retrieveUsers() {
      UserService.getAllUsers()
        .then((response) => {
          this.items = response.data;
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
    this.retrieveUsers();
  },
};
</script>

<style scoped>
.btn-info {
  text-align: center;
  width: 30%;
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
</style>
