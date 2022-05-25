<template>
  <b-container class="container">
    <b-row align-h="center" class="mt-5">
      <h3>Alertas</h3>
    </b-row>

    <b-row align-h="center">
      <b-col sm="12" md="10" lg="8" xl="6" class="mb-2">
        <b-input-group>
          <b-form-input
            v-model="searchName"
            size="md"
            class="search-input"
            placeholder="Buscar organización."
          ></b-form-input>
          <b-input-group-append>
            <b-button @click="searchByName" size="md" class="search-b">
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
            <b-th>Descripción</b-th>
            <b-th>Fecha creación</b-th>
                        <b-th>Organizacion</b-th>

            <b-th>Mostrar</b-th>
            <b-th>Acción</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(item, index) in alerts" :key="index">
            <b-td style="vertical-align: middle">
              <span>{{ item.name }}</span>
            </b-td>
            <b-td style="vertical-align: middle">{{ item.description }}</b-td>
            <b-td style="vertical-align: middle">{{ item.f_alta | dataFormat }}</b-td>
                        <b-td style="vertical-align: middle">{{ item.f_alta }}</b-td>

            <b-td style="vertical-align: middle">
              <b-input-group-append v-if="item.show == false">
                <b-button @click="showAlert(item, true, index)">
                  <font-awesome-icon icon="fa-solid fa-eye" />
                </b-button>
              </b-input-group-append>

              <b-input-group-append v-else>
                <b-button @click="showAlert(item, false, index)">
                  <font-awesome-icon icon="fa-solid fa-eye-slash" />
                </b-button>
              </b-input-group-append>
            </b-td>
            <b-td style="vertical-align: middle">
              <b-button
                class="btn btn-danger"
                @click="deleteAlert(item.id, index)"
                >Eliminar
              </b-button>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-row>
  </b-container>
</template>

<script>
import AlertDataService from '../services/AlertDataService';
import UserService from '../services/user.service';
import moment from 'moment';
export default {
  name: 'alerts',
  data() {
    return {
      alerts: [],
      searchName: '',
      org: [],
    };
  },
  filters: {
    dataFormat: function (value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY HH:mm');
      }
    },
  },
  methods: {
    mounted() {
      this.retrieveAlerts();
    },
    retrieveAlerts() {
      AlertDataService.getAll()
        .then((response) => {
          this.alerts = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    retrieveModsByOrg(id) {
      OrganizationService.moderadoresByAlert(id)
        .then((response) => {
          this.org = response.data;
          console.log(org);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveAlerts();
    },
    searchByName() {
      AlertDataService.findByName(this.searchName)
        .then((response) => {
          this.alerts = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    showAlert(item, status, index) {
      var data = {
        id: item.id,
        title: item.name,
        description: item.description,
        show: status,
      };
      AlertDataService.update(item.id, data)
        .then((response) => {
          let replacementItem = response.data;
          this.alerts.splice(index, 1, replacementItem)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteAlert(id, index) {
      AlertDataService.delete(id)
        .then((response) => {
          this.alerts.splice(index, 1);
          console.log(newalert);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.retrieveAlerts();
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
