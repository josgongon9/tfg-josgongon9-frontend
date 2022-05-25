<template>
  <div class="submit-form">
    <b-form v-if="!submitted" @submit.prevent="handleSubmit" ref="textareaform">
      <b-form-group label="Nombre:" label-for="name">
        <b-form-input
          type="text"
          class="form-control"
          id="name"
          v-validate="'required'"
          v-model="alert.name"
          name="name"
        >
        </b-form-input>
        <div v-if="errors.has('name')" class="alert alert-danger">
          {{ 'El titulo es obligatorio' }}
        </div>
      </b-form-group>

      <b-form-group label="Description:" label-for="description">
        <b-form-input
          class="form-control"
          id="description"
          v-validate="'required'"
          v-model="alert.description"
          name="description"
        >
        </b-form-input>
        <div v-if="errors.has('description')" class="alert alert-danger">
          {{ 'La descripción es obligatoria' }}
        </div>
      </b-form-group>

      <div class="button-vaca">
        <b-button-group>
          <b-button type="submit" variant="success">Enviar</b-button>
          <b-button @click="reset" variant="danger">Limpiar</b-button>
        </b-button-group>
      </div>
    </b-form>

    <b-form v-else class="succes-vac">
      <h4>Alerta creada correctamente!</h4>
      <b-button-group>
        <b-button variant="success" @click="newAlert"
          >Crear otra alerta
        </b-button>
        <b-button variant="primary" :to="'/organizations/' + this.$route.params.id"
          >Volver 
        </b-button>
      </b-button-group>
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
import AlertDataService from '../services/AlertDataService';
export default {
  name: 'add-alert',
  data() {
    return {
      errores: [],
      alert: {
        id: null,
        name: '',
        description: '',
        show: false,
      },
      submitted: false,
    };
  },

  methods: {
    reset() {
      this.$refs.textareaform.reset();
      this.errores = [];
    },
    handleSubmit() {
      this.errores.pop();
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.saveAlert();
        }
      });
    },

    saveAlert() {
      var data = {
        name: this.alert.name,
        description: this.alert.description,
      };
      AlertDataService.create(data,this.$route.params.id)
        .then((response) => {
          this.alert.id = response.data.id;
          this.submitted = true;
        })
        .catch((e) => {
          this.errores.push(e.response.data);
        });
    },

    newAlert() {
      this.submitted = false;
      this.alert = {};
    },
  },
};
</script>

<style>
.succes-vac {
  text-align: center;
}
.button-vaca {
  text-align: center;
}
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>