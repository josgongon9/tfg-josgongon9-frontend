<template>
  <div class="submit-form">
    <b-form v-if="!submitted" @submit.prevent="handleSubmit">
      <b-form-group label="Nombre:" label-for="name">
        <b-form-input
          class="form-control"
          id="name"
          v-model="organization.name"
          readonly
          name="name"
        >
        </b-form-input>
        <div v-if="errors.has('name')" class="alert alert-danger">
          {{ 'El nombre es obligatorio' }}
        </div>
      </b-form-group>
      <b-form-group label="Desripción:" label-for="description">
        <b-form-input
          type="text"
          class="form-control"
          id="description"
          v-validate="'required'"
          v-model="organization.description"
          name="description"
        ></b-form-input>
        <div v-if="errors.has('description')" class="alert alert-danger">
          {{ 'La description es obligatoria' }}
        </div>
      </b-form-group>

      <b-form-group label="Url:" label-for="url">
        <b-form-input
          type="url"
          class="form-control"
          v-validate="'required'"
          id="url"
          v-model="organization.url"
          name="url"
        ></b-form-input>
        <div v-if="errors.has('url')" class="alert alert-danger">
          {{ 'La url es obligatoria' }}
        </div>
      </b-form-group>

      <b-form-group label="Número teléfono:" label-for="phoneNumber">
        <b-form-input
          type="tel"
          class="form-control"
          id="phoneNumber"
          v-validate="'required'"
          v-model="organization.phoneNumber"
          name="phoneNumber"
        ></b-form-input>
        <div v-if="errors.has('phoneNumber')" class="alert alert-danger">
          {{ 'El número de teléfono es obligatorio' }}
        </div>
      </b-form-group>

      <b-form-group label="País:" label-for="country">
        <b-form-select
          id="country"
          v-model="organization.country"
          v-validate="'required'"
          name="country"
        >
          <option
            v-for="country in countries"
            :key="country.id"
            :value="country.value"
          >
            {{ country.label }}
          </option>
        </b-form-select>
        <div v-if="errors.has('country')" class="alert alert-danger">
          {{ 'El pais es obligatorio' }}
        </div>
      </b-form-group>

      <b-form-group label="Provincia:" label-for="province">
        <b-form-input
          type="text"
          class="form-control"
          id="province"
          v-validate="'required'"
          v-model="organization.province"
          name="province"
        ></b-form-input>
        <div v-if="errors.has('province')" class="alert alert-danger">
          {{ 'La provincia es obligatoria' }}
        </div>
      </b-form-group>

      <b-form-group label="Ciudad:" label-for="city">
        <b-form-input
          type="text"
          class="form-control"
          id="city"
          v-validate="'required'"
          v-model="organization.city"
          name="city"
        ></b-form-input>
        <div v-if="errors.has('city')" class="alert alert-danger">
          {{ 'La ciudad es obligatoria' }}
        </div>
      </b-form-group>

      <div class="button-org">
        <b-button-group>
          <b-button type="submit" variant="success">Actualizar</b-button>
          <b-button v-b-modal.modal-1>Gestionar usuarios</b-button>
          <b-button v-b-modal.modal-2>Gestionar Moderadores</b-button>
          <b-button v-b-modal.modal-3>Gestionar Alertas</b-button>

          <div v-if="isAdmin">
            <b-button @click="showDismissibleAlert = true" variant="danger">
              Borrar
            </b-button>
          </div>
          <b-modal
            v-model="showDismissibleAlert"
            variant="danger"
            dismissible
            size="xs"
            title="¿Estas seguro de que deseas borrar esta organización?"
          >
            <b-button type="delete" variant="danger" @click="deleteOrganization"
              >Si, estoy seguro</b-button
            >
          </b-modal>
        </b-button-group>
      </div>
      <b-modal id="modal-1" title="Gestión de usuarios" size="xl">
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
                  <b-td
                    style="vertical-align: middle"
                    v-if="getContainsUser(item) == false"
                  >
                    <b-button
                      :disabled="getUserInOtherOrg(index)"
                      class="btn btn-info"
                      @click="addUsers(item.id)"
                      >Añadir
                    </b-button>
                  </b-td>
                  <b-td style="vertical-align: middle" v-else>
                    <b-button class="btn btn-danger" @click="addUsers(item.id)"
                      >Eliminar</b-button
                    >
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-container>
      </b-modal>
      <b-modal id="modal-2" title="Gestión de moderadores" size="xl">
        <b-container class="container">
          <b-row align-h="center" class="mt-5">
            <h3>Todos los moderadores</h3>
          </b-row>

          <b-row align-h="center">
            <b-col sm="12" md="10" lg="8" xl="6" class="mb-2">
              <b-input-group>
                <b-form-input
                  v-model="searchModText"
                  size="md"
                  class="search-input"
                  placeholder="Buscar moderador."
                ></b-form-input>
                <b-input-group-append>
                  <b-button @click="searchMod" size="md" class="search-b">
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
                  <b-th v-if="isAdmin">Acción</b-th>
                  <b-th v-else>Moderadores</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(mod, index) in moderadorList" :key="index">
                  <b-td style="vertical-align: middle">
                    <span>{{ mod.username }}</span>
                  </b-td>
                  <b-td style="vertical-align: middle">{{ mod.email }}</b-td>
                  <b-td style="vertical-align: middle">
                    <div v-for="(rol, a) in mod.roles" :key="a">
                      <span>{{ rol.name | getRol }}</span>
                    </div>
                  </b-td>
                  <b-td
                    style="vertical-align: middle"
                    v-if="getContainsMod(mod, index) == false"
                  >
                    <div v-if="isAdmin">
                      <b-button class="btn btn-info" @click="addMods(mod.id)"
                        >Añadir
                      </b-button>
                    </div>
                    <div v-else>
                      <font-awesome-icon icon="fas fa-times" />
                    </div>
                  </b-td>
                  <b-td style="vertical-align: middle" v-else>
                    <div v-if="isAdmin">
                      <b-button class="btn btn-danger" @click="addMods(mod.id)"
                        >Eliminar</b-button
                      >
                    </div>
                    <div v-else>
                      <font-awesome-icon icon="fas fa-check" />
                    </div>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-row>
        </b-container>
      </b-modal>
      <b-modal id="modal-3" title="Gestión Alertas" size="xl">
        <b-container class="container">
          <b-row align-h="center" class="mt-5">
            <h3>Todas las alertas</h3>
          </b-row>

          <b-row align-h="center">
            <b-col sm="12" md="10" lg="8" xl="6" class="mb-2">
              <router-link
                :to="{
                  name: 'add-alert',
                  params: { id: this.organization.id },
                }"
                ><b-button variant="success" class="add-alert"
                  >Añadir</b-button
                ></router-link
              >
              <b-input-group>
                <b-form-input
                  v-model="searchName"
                  size="md"
                  class="search-input"
                  placeholder="Buscar alerta."
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
                  <b-th>Mostrar</b-th>
                  <b-th>Acción</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in alerts" :key="index">
                  <b-td style="vertical-align: middle">
                    <span>{{ item.name }}</span>
                  </b-td>
                  <b-td style="vertical-align: middle">{{
                    item.description
                  }}</b-td>
                  <b-td style="vertical-align: middle">{{
                    item.f_alta | dataFormat
                  }}</b-td>

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
      </b-modal>
    </b-form>

    <b-form v-else>
      <h4>Organización actualizada correctamente!</h4>
      <button class="btn btn-info" @click="newOrganization">Volver</button>
    </b-form>
    <div class="mt-4" v-if="errores && errores.length">
      <b-alert
        :show="true"
        variant="danger"
        v-for="error of errores"
        v-bind:key="error"
        >{{ error }}</b-alert
      >
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import OrganizationDataService from '../services/OrganizationDataService';
import AlertDataService from '../services/AlertDataService';
import moment from 'moment';

const countries = require('i18n-iso-countries');
countries.registerLocale(require('i18n-iso-countries/langs/es.json'));
export default {
  name: 'organization',
  data() {
    return {
      errores: [],
      organization: [],
      moderadorList: [],
      submitted: false,
      items: [],
      searchText: '',
      showDismissibleAlert: false,
      alerts: [],
      searchName: '',
      searchModText: '',
      userOrg: [],
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
    dataFormat: function (value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY HH:mm');
      }
    },
  },
  methods: {
    handleSubmit() {
      this.errores.pop();
      this.message = '';
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.updateOrganization();
        }
      });
    },
    addUsers(idUser) {
      OrganizationDataService.updateUsers(this.organization.id, idUser)
        .then((response) => {
          console.log(response.data);
          this.getOrganization(this.$route.params.id);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addMods(idMod) {
      OrganizationDataService.updateMods(this.organization.id, idMod)
        .then((response) => {
          console.log(response.data);
          this.retrieveMods();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveUsers() {
      UserService.getAllByRol('ROLE_USER')
        .then((response) => {
          this.items = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveMods() {
      UserService.getAllByRol('ROLE_MODERATOR')
        .then((response) => {
          this.moderadorList = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveUsers();
      this.retrieveMods();
      this.retrieveAlerts();
    },
    searchMod() {
      UserService.findByUserRol(this.searchModText, 'ROLE_MODERATOR')
        .then((response) => {
          this.moderadorList = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      UserService.findByUserRol(this.searchText, 'ROLE_USER')
        .then((response) => {
          this.items = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchByName() {
      AlertDataService.findByName(this.searchName)
        .then((response) => {
          this.alerts = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getOrganization(id) {
      OrganizationDataService.get(id)
        .then((response) => {
          this.organization = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateOrganization() {
      OrganizationDataService.update(this.organization.id, this.organization)
        .then((response) => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          this.errores.push(e.response.data);
        });
    },
    deleteOrganization() {
      OrganizationDataService.delete(this.organization.id)
        .then((response) => {
          this.$router.push({ name: 'organizations' });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getContainsUser(item) {
      let res = this.organization.usuarios.some(
        (usuario) => usuario.id === item.id
      );

      return res;
    },

    /*getUserInOtherOrg(idUser, index) {
      console.log('DISABLE');
      OrganizationDataService.getUserInOtherOrg(
        idUser,
        this.organization.id
      ).then((response) => {
        this.userOrg.push(response.data);
        console.log('LLAMADA');
      });
      console.log('inidce');
      console.log(index);
      let val = false;
      if (this.userOrg[index] == true) {
        val = true;
      }
      return val;
    },*/

    getUserInOtherOrg(index) {
      let val = false;
      if (this.userOrg[index] == true) {
        val = true;
      }
      return val;
    },
    getUserInOtherOrgBBDD() {
      OrganizationDataService.getUserInOtherOrg(this.organization.id).then(
        (response) => {
          this.userOrg = response.data;
        }
      );
    },

    getContainsMod(mod, index) {
      let res = mod.organizations.some(
        (organization) => organization.id === this.$route.params.id
      );

      return res;
    },
    retrieveAlerts() {
      AlertDataService.getAllByOrg(this.$route.params.id)
        .then((response) => {
          this.alerts = response.data;
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
          this.alerts.splice(index, 1, replacementItem);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteAlert(id, index) {
      AlertDataService.delete(id)
        .then((response) => {
          this.alerts.splice(index, 1);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.message = '';
    this.getOrganization(this.$route.params.id);
    this.retrieveMods();
    this.retrieveUsers();
    this.retrieveAlerts();
    this.getUserInOtherOrgBBDD();
  },
  computed: {
    countries() {
      const list = countries.getNames('es', { select: 'official' });
      return Object.keys(list).map((key) => ({ value: key, label: list[key] }));
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    isMod() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    },
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
.add-alert {
  position: relative;
  margin: auto;
  top: 38px;
  right: 75px;
}
</style>