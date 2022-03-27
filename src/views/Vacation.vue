<template>
  <div v-if="currentVacation" class="edit-form">
    <h4>Vacaciones</h4>
    <form>
      <div class="form-group">
        <label for="title">Titulo</label>
        <input type="text" class="form-control" id="title"
          v-model="currentVacation.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Descripcion</label>
        <input type="text" class="form-control" id="description"
          v-model="currentVacation.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Estado:</strong></label>
        {{ currentVacation.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="btn btn-warning"
      v-if="currentVacation.published"
      @click="updatePublished(false)"
    >
      Quitar
    </button>
    <button v-else class="btn btn-warning"
      @click="updatePublished(true)"
    >
      Publicar
    </button>

    <button class="btn btn-danger"
      @click="deleteVacation"
    >
      Borrar
    </button>

    <button type="submit" class="btn btn-primary"
      @click="updateVacation"
    >
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
import VacationDataService from "../services/VacationDataService";
export default {
  name: "vacation",
  data() {
    return {
      currentVacation: null,
      message: ''
    };
  },
  methods: {
    getVacation(id) {
      VacationDataService.get(id)
        .then(response => {
          this.currentVacation = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updatePublished(status) {
      var data = {
        id: this.currentVacation.id,
        title: this.currentVacation.title,
        description: this.currentVacation.description,
        published: status
      };
      VacationDataService.update(this.currentVacation.id, data)
        .then(response => {
          this.currentVacation.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateVacation() {
      VacationDataService.update(this.currentVacation.id, this.currentVacation)
        .then(response => {
          console.log(response.data);
          this.message = 'The vacation was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteVacation() {
      VacationDataService.delete(this.currentVacation.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "vacations" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getVacation(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>