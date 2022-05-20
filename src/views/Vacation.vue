<template>
  <div v-if="currentVacation" class="edit-form">
    <h4>Vacaciones</h4>
    <form>
      <b-form-group label="Título:" label-for="title">
        <b-form-input
          type="text"
          class="form-control"
          id="title"
          v-validate="'required'"
          v-model="currentVacation.title"
          name="title"
        >
        </b-form-input>
        <div v-if="errors.has('title')" class="alert alert-danger">
          {{ 'El titulo es obligatorio' }}
        </div>
      </b-form-group>

      <b-form-group label="Description:" label-for="description">
        <b-form-input
          class="form-control"
          id="description"
          v-validate="'required'"
          v-model="currentVacation.description"
          name="description"
        >
        </b-form-input>
        <div v-if="errors.has('description')" class="alert alert-danger">
          {{ 'La descripción es obligatoria' }}
        </div>
      </b-form-group>

      <div class="form-group">
        <label><strong>Estado:</strong></label>
        {{ currentVacation.published ? 'Admitida' : 'Denegada' }}
      </div>
    </form>

    <b-button-group>
      <b-button
        class="btn btn-warning"
        v-if="currentVacation.published"
        @click="updatePublished(false)"
      >
        Quitar</b-button
      >
      <b-button v-else class="btn btn-warning" @click="updatePublished(true)">
        Publicar</b-button
      >
      <b-button class="btn btn-danger" @click="deleteVacation"  v-if="!currentVacation.published">Borrar</b-button>
    </b-button-group>

    <button type="submit" class="btn btn-primary" @click="updateVacation" v-if="!currentVacation.published">
      Actualizar
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Por favor, seleccione un día...</p>
  </div>
</template>

<script>
import VacationDataService from '../services/VacationDataService';
export default {
  name: 'vacation',
  data() {
    return {
      currentVacation: null,
      message: '',
    };
  },
  methods: {
    getVacation(id) {
      VacationDataService.get(id)
        .then((response) => {
          this.currentVacation = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updatePublished(status) {
      var data = {
        id: this.currentVacation.id,
        title: this.currentVacation.title,
        description: this.currentVacation.description,
        published: status,
      };
      VacationDataService.update(this.currentVacation.id, data)
        .then((response) => {
          this.currentVacation.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateVacation() {
      VacationDataService.update(this.currentVacation.id, this.currentVacation)
        .then((response) => {
          console.log(response.data);
          this.message = 'The vacation was updated successfully!';
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteVacation() {
      VacationDataService.delete(this.currentVacation.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: 'vacations' });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = '';
    this.getVacation(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>