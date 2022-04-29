<template>
  <div class="submit-form">
    <b-form v-if="!submitted" @submit.prevent="handleSubmit">
      <b-form-group label="Nombre:" label-for="name">
        <b-form-input
          type="text"
          class="form-control"
          id="name"
          v-validate="'required'"
          v-model="organization.name"
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

      <b-form-group label="Moderador:" label-for="moderador">
        <b-form-select
          id="moderador"
          v-model="organization.moderador"
          multiple
          :select-size="4"
          v-validate="'required'"
          name="moderador"
          
        >
         <option
            v-for="(item, index) in moderadorList" :key="index">
          
            {{ item.username }}
          </option></b-form-select>
        <div v-if="errors.has('moderador')" class="alert alert-danger">
          {{ 'Es necesario elegir mínimo un Moderador' }}
        </div>
      </b-form-group>

      <div class="button-org">
        <b-button-group>
          <b-button type="submit" variant="success">Enviar</b-button>
          <b-button type="reset" variant="danger">Limpiar</b-button>
        </b-button-group>
      </div>
    </b-form>

    <b-form v-else>
      <h4>Organización creada correctamente!</h4>
      <button class="btn btn-success" @click="newOrganization">
        Crear otra organización
      </button>
    </b-form>
  </div>
</template>
<script>
import UserService from '../services/user.service';
import OrganizationDataService from '../services/OrganizationDataService';
const countries = require('i18n-iso-countries');
countries.registerLocale(require('i18n-iso-countries/langs/es.json'));
export default {
  name: 'add-organization',
  data() {
    return {
      organization: {
        id: null,
        name: null,
        description: '',
        phoneNumber: '',
        url: '',
        f_baja: '',
        f_ata: '',
        moderador: [],
        province: '',
        city: '',
        country: '',
      },
      moderadorList: [],
      submitted: false,
    };
  },

  methods: {
    handleSubmit() {
      this.message = '';
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.saveOrganization();
        }
      });
    },
    retrieveMods() {
      UserService.getAllMod()
        .then((response) => {
          this.moderadorList = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveMods();
    },

    saveOrganization() {
      var data = {
        name: this.organization.name,
        description: this.organization.description,
        phoneNumber: this.organization.phoneNumber,
        url: this.organization.url,
        f_baja: this.organization.f_baja,
        f_alta: this.organization.f_alta,
        moderador: this.organization.moderador,
        province: this.organization.province,
        city: this.organization.city,
        country: this.organization.country,
      };
      OrganizationDataService.create(data)
        .then((response) => {
          this.organization.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newOrganization() {
      this.submitted = false;
      this.organization = {};
    },
  },
  onReset(event) {
    event.preventDefault();
    this.form.email = '';
    this.form.name = 'cxcz';
    this.form.food = null;
    this.show = false;
    this.$nextTick(() => {
      this.show = true;
    });
  },
  mounted() {
    this.retrieveMods();
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
.button-org {
  text-align: center;
}
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>