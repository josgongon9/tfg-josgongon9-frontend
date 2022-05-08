<template>
  <div class="submit-form">
    <b-form v-if="!submitted" @submit.prevent="handleSubmit">
      <b-form-group label="Nombre:" label-for="name">
        <b-form-input
          class="form-control"
          id="name"
          v-model="organization.name"
          readonly
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

          <b-button @click="showDismissibleAlert = true" variant="danger">
            Borrar 
          </b-button>
          <b-modal v-model="showDismissibleAlert" variant="danger" dismissible size="xs"  title="¿Estas seguro de que deseas borrar esta organización?">
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
                    <b-tr v-for="(rol, a) in item.roles" :key="a">
                      <span>{{ rol.name | getRol }}</span>
                    </b-tr>
                  </b-td>
                  <b-td
                    style="vertical-align: middle"
                    v-if="getContainsUser(item) == false"
                  >
                    <b-button class="btn btn-info" @click="addUsers(item.id)"
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
                <b-tr v-for="(mod, index) in moderadorList" :key="index">
                  <b-td style="vertical-align: middle">
                    <span>{{ mod.username }}</span>
                  </b-td>
                  <b-td style="vertical-align: middle">{{ mod.email }}</b-td>
                  <b-td style="vertical-align: middle">
                    <b-tr v-for="(rol, a) in mod.roles" :key="a">
                      <span>{{ rol.name | getRol }}</span>
                    </b-tr>
                  </b-td>
                  <b-td
                    style="vertical-align: middle"
                    v-if="getContainsMod(mod) == false"
                  >
                    <b-button class="btn btn-info" @click="addMods(mod.id)"
                      >Añadir
                    </b-button>
                  </b-td>
                  <b-td style="vertical-align: middle" v-else>
                    <b-button class="btn btn-danger" @click="addMods(mod.id)"
                      >Eliminar</b-button
                    >
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
      <button class="btn btn-success" @click="newOrganization">
        Crear otra organización
      </button>
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
const countries = require('i18n-iso-countries');
countries.registerLocale(require('i18n-iso-countries/langs/es.json'));
export default {
  name: 'organization',
  data() {
    return {
      errores: [],
      organization: null,
      moderadorList: [],
      submitted: false,
      items: [],
      searchText: '',
      modByOrg: [],
      showDismissibleAlert: false,
    };
  },
  methods: {
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
          this.getOrganization(this.$route.params.id);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveUsers() {
      UserService.getAllByRol('ROLE_USER')
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
      this.retrieveMods();
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
    retrieveMods() {
      UserService.getAllByRol('ROLE_MODERATOR')
        .then((response) => {
          this.moderadorList = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getOrganization(id) {
      OrganizationDataService.get(id)
        .then((response) => {
          this.organization = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateOrganization() {
      OrganizationDataService.update(this.organization.id, this.organization)
        .then((response) => {
          console.log(response.data);
          this.message = 'The organization was updated successfully!';
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteOrganization() {
      OrganizationDataService.delete(this.organization.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: 'organizations' });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getContainsUser(item) {
      console.log('Contiene Usuarios');
      let res = this.organization.usuarios.some(
        (usuario) => usuario.id === item.id
      );
      console.log(res);
      return res;
    },
    getContainsMod(item) {
      console.log('Contiene Moderadores');
      UserService.moderadoresByOrganization(this.$route.params.id)
        .then((response) => {
          this.modByOrg = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });

      let res = this.organization.usuarios.some(
        (usuario) => usuario.id === item.id
      );
      console.log(res);
      return res;
    },
  },
  mounted() {
    this.message = '';
    this.getOrganization(this.$route.params.id);
    this.retrieveMods();
    this.retrieveUsers();
    this.getContainsUser(item);
  },
  computed: {
    countries() {
      const list = countries.getNames('es', { select: 'official' });
      return Object.keys(list).map((key) => ({ value: key, label: list[key] }));
    },
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>