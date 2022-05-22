<template>
  <div class="submit-form">
    <b-form v-if="!submitted" @submit.prevent="handleSubmit" ref="textareaform">
      <b-form-group label="Título:" label-for="title">
        <b-form-input
          type="text"
          class="form-control"
          id="title"
          v-validate="'required'"
          v-model="vacation.title"
          name="title"
        >
        </b-form-input>
        <div v-if="errors.has('title')" class="alert alert-danger">
          {{ 'El titulo es obligatorio' }}
        </div>
      </b-form-group>

      <b-form-group label="Fecha de Inicio:" label-for="startDate">
        <b-form-input
          id="startDate"
          name="startDate"
          type="date"
          class="form-control"
          v-model="vacation.startDate"
          placeholder="Date"
          v-validate="'required'"
          @change="calculateDate"
        >
        </b-form-input>
        <div v-if="errors.has('startDate')" class="alert alert-danger">
          {{ 'La fecha de inicio es obligatoria' }}
        </div>
      </b-form-group>

      <b-form-group label="Fecha de Fin:" label-for="endDate">
        <b-form-input
          id="endDate"
          name="endDate"
          type="date"
          class="form-control"
          v-model="vacation.endDate"
          placeholder="Date"
          v-validate="'required'"
          @change="calculateDate"
        >
        </b-form-input>
        <div v-if="errors.has('endDate')" class="alert alert-danger">
          {{ 'La fecha de fin es obligatoria' }}
        </div>
      </b-form-group>

      <div id="date-result">
        <p>Días solicitados: {{ resultDate }}</p>
      </div>

      <b-form-group label="Description:" label-for="description">
        <b-form-input
          class="form-control"
          id="description"
          v-validate="'required'"
          v-model="vacation.description"
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
      <h4>¡Solicitada Correctamente!</h4>
      <b-button-group>
        <b-button variant="success" @click="newVacation"
          >Crear otra vacacion
        </b-button>
        <b-button variant="primary" :to="{ name: 'vacations' }"
          >Volver al listado
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
import VacationDataService from '../services/VacationDataService';
import moment from 'moment';
export default {
  name: 'add-vacation',
  data() {
    return {
      errores: [],
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
    reset() {
      this.$refs.textareaform.reset();
      this.resultDate = '';
      this.errores = [];
    },
    handleSubmit() {
      this.errores.pop();
      this.$validator.validate().then((valid) => {
        if (valid && this.resultDate > 0) {
          this.saveVacation();
        }
        if (this.resultDate == 0) {
          this.errores.push('Las fechas son incorrectas');
        }
      });
    },

    calculateDate() {
      let startDate = moment(this.vacation.startDate);
      let endDate = moment(this.vacation.endDate);
      let count = 0;
      let curDate = +startDate;
      while (curDate <= +endDate) {
        const dayOfWeek = new Date(curDate).getDay();
        const isWeekend = dayOfWeek === 6 || dayOfWeek === 0;
        if (!isWeekend) {
          count++;
        }
        curDate = curDate + 24 * 60 * 60 * 1000;
      }
      this.resultDate = Math.round(count);
    },

    saveVacation() {
      var data = {
        title: this.vacation.title,
        description: this.vacation.description,
        startDate: this.vacation.startDate,
        endDate: this.vacation.endDate,
        resultDate: this.resultDate,
      };
      VacationDataService.create(data)
        .then((response) => {
          this.vacation.id = response.data.id;
          this.submitted = true;
        })
        .catch((e) => {
          this.errores.push(e.response.data);
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