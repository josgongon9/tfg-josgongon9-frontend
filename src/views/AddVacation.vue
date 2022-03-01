<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Título</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="vacation.title"
          name="title"
        />
      </div>
      <div>
        <label>Fecha de Inicio</label>
        <input
          type="date"
          class="form-control"
          v-model="vacation.startDate"
          placeholder="Date"
          required
          @change="calculateDate"
        />
      </div>
      <div>
        <label>Fecha de Fin</label>
        <input
          type="date"
          class="form-control"
          v-model="vacation.endDate"
          placeholder="Date"
          required
          @change="calculateDate"
        />
      </div>
      <div id="date-result">
        <p>Días solicitados: {{resultDate}}</p>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="vacation.description"
          name="description"
        />
      </div>
      <button @click="saveVacation" class="btn btn-success">Enviar</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newVacation">
        Añadir vacaciones
      </button>
    </div>
  </div>
</template>
<script>

import VacationDataService from '../services/VacationDataService';
import moment from "moment";
export default {
  name: 'add-vacation',
  data() {
    return {
      vacation: {
        id: null,
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        published: false,
      },
      resultDate: '',
      submitted: false,
    };
  },

  methods: {
    calculateDate() {
      let start = moment(this.vacation.startDate);
      let end = moment(this.vacation.endDate);
      let duration = moment.duration(end.diff(start));
      let days = duration.asDays();
      this.resultDate = Math.round(days);
    },
    saveVacation() {
      var data = {
        title: this.vacation.title,
        description: this.vacation.description,
        startDate: this.vacation.startDate,
        endDate: this.vacation.endDate,
      };
      VacationDataService.create(data)
        .then((response) => {
          this.vacation.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newVacation() {
      this.submitted = false;
      this.vacation = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>