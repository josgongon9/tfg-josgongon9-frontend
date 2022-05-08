<template>
  <b-container class="container">
    <b-row align-h="center" class="mt-5">
      <h3>Organizaciones</h3>
    </b-row>

    <b-row align-h="center">
      <b-col sm="12" md="10" lg="8" xl="6" class="mb-2">
        <router-link :to="{ name: 'add-organization' }"
          ><b-button size="md" class="btn btn-success"
            >Añadir</b-button
          ></router-link
        >

        <b-input-group>
          <b-form-input
            v-model="searchText"
            size="md"
            class="search-input"
            placeholder="Buscar organización."
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
            <b-th>Nombre</b-th>
            <b-th>Dirección</b-th>
            <b-th>Moderadores</b-th>
            <b-th>Acción</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(item, index) in organizations" :key="index">
            <b-td style="vertical-align: middle">
              <span>{{ item.name }}</span>
            </b-td>
            <b-td style="vertical-align: middle">{{ item.description }}</b-td>
            <b-td style="vertical-align: middle">
              <b-tr v-for="(mod, a) in retrieveModsByOrg(item.id)" :key="a">
                <span>{{ mod.name }}</span>
              </b-tr>
            </b-td>
            <b-td style="vertical-align: middle">
              <router-link
                :to="'/organizations/' + item.id"
              >
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
import OrganizationDataService from '../services/OrganizationDataService';
import UserService from '../services/user.service';
export default {
  name: 'organizations',
  data() {
    return {
      organizations: [],
      searchText: '',
      modByOrg: [],
    };
  },
  methods: {
    retrieveOrganizations() {
      OrganizationDataService.getAll()
        .then((response) => {
          this.organizations = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveModsByOrg(id){
    UserService.moderadoresByOrganization(id)
        .then((response) => {
          this.modByOrg = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
  },
    refreshList() {
      this.retrieveOrganizations();
    },
    searchName() {
      OrganizationDataService.findByName(this.name)
        .then((response) => {
          this.organizations = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveOrganizations();
  },
};
</script>

<style scoped>

.container {
  text-align: center;
  position: relative;
  min-height: 100vh;

}

@media (max-width: 768px) {
  .search-button {
    text-align: center;
    padding-top: 2%;
    margin-left: 25%;
  }

  .div-buttons {
    text-align: center;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
}

.cursiva {
  font-style: italic;
  font-size: 14px;
}

.div-buttons {
  text-align: center;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5%;
}

.search-b {
  color: rgb(104, 104, 104) !important;
  background-color: rgb(245, 245, 245) !important;
  border: 1px solid #ced4da !important;
  border-radius: 0 4px 4px 0 !important;
}

.search-b:hover {
  color: rgb(104, 104, 104) !important;
  background-color: rgb(233, 233, 233) !important;
  border: 1px solid #ced4da !important;
  border-radius: 0 4px 4px 0 !important;
}

.search-b:focus {
  color: rgb(104, 104, 104) !important;
  background-color: rgb(233, 233, 233) !important;
  border: 1px solid #ced4da !important;
  border-radius: 0 4px 4px 0 !important;
  box-shadow: 0px 0px 1px 2px rgba(172, 172, 172, 0.432) !important;
}

.search-input {
  border-radius: 4px 0px 0px 4px !important;
  border-right: 0 !important;
}

.search-input:focus {
  border-radius: 4px 0px 0px 4px !important;
  border-top: 1px solid #ced4da !important;
  border-left: 1px solid #ced4da !important;
  border-bottom: 1px solid #ced4da !important;
  border-right: 0 !important;
  box-shadow: 0px 0px 1px 2px rgba(172, 172, 172, 0.432) !important;
}
.btn-success {
  position: absolute;
  left: -65px;
}
</style>
