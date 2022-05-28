<template>
  <div class="form-horizontal">
    <b-form v-if="!submitted" @submit.prevent="handleSubmit" ref="textareaform">
      <b-form-group label="Fecha:" label-for="date">
        <b-form-input
          type="date"
          class="form-control"
          v-model="newtimeEntry.date"
          placeholder="Date"
          id="date"
          name="date"
          v-validate="'required'"
        >
        </b-form-input>
        <div v-if="errors.has('date')" class="alert alert-danger">
          {{ 'La fecha es obligatoria' }}
        </div>
      </b-form-group>

      <b-form-group label="Hora Inicio:" label-for="Hours">
        <b-form-timepicker
          id="startTime"
          name="startTime"
          v-model="newtimeEntry.startTime"
          v-validate="'required'"
          now-button
          reset-button
          locale="es"
          placeholder="Elige una hora de comienzo..."
          @input="calculateDate"
        ></b-form-timepicker>

        <div v-if="errors.has('startTime')" class="alert alert-danger">
          {{ 'El tiempo obligatorio' }}
        </div>
      </b-form-group>

      <b-form-group label="Hora fin:" label-for="Hours">
        <b-form-timepicker
          id="endTime"
          name="endTime"
          v-model="newtimeEntry.endTime"
          v-validate="'required'"
          now-button
          reset-button
          locale="es"
          placeholder="Elige una hora de fin..."
          @input="calculateDate"
        ></b-form-timepicker>

        <div v-if="errors.has('endTime')" class="alert alert-danger">
          {{ 'El tiempo obligatorio' }}
        </div>
      </b-form-group>

      <div id="date-result">
        <h5>Duración total: {{ totalTime }}</h5>
      </div>

      <b-form-group label="Comentario:" label-for="comment">
        <b-form-input
          type="text"
          class="form-control"
          v-model="newtimeEntry.comment"
          placeholder="Comentario opcional..."
          id="comment"
          name="comment"
        >
        </b-form-input>
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
        <b-button variant="success" @click="newTime"
          >Crear otra entrada de tiempo
        </b-button>
        <b-button variant="primary" :to="{ name: 'timeEntries' }"
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
import TimeEntryDataService from '../services/TimeEntryDataService';
import moment from 'moment';

export default {
  data() {
    return {
      totalTime: '',
      hours: '',
      errores: [],
      submitted: false,
      newtimeEntry: {
        id: null,
        date: '',
        startTime: '',
        endTime: '',
        comment: '',
      },
    };
  },
  methods: {
    reset() {
      this.$refs.textareaform.reset();
      this.errores = [];
      this.totalTime = '';
    },
    calculateDate() {
      var startTime = moment(this.newtimeEntry.startTime, 'HH:mm:ss');
      var endTime = moment(this.newtimeEntry.endTime, 'HH:mm:ss');

      var mins = moment
        .utc(moment(endTime, 'HH:mm:ss').diff(moment(startTime, 'HH:mm:ss')))
        .format('mm');

      if (
        this.newtimeEntry.startTime != '' &&
        this.newtimeEntry.endTime != ''
      ) {
        this.hours = endTime.diff(startTime, 'hours');
        this.totalTime = this.hours + ':' + mins;
      }
    },
    handleSubmit() {
      this.errores.pop();
      this.$validator.validate().then((valid) => {
        if (valid && this.hours >= 0) {
          this.create();
        }
        if (this.hours < 0) {
          this.errores.push('La hora no puede ser negativa');
        }
      });
    },
    create() {
      var data = {
        date: this.newtimeEntry.date,
        startTime: this.newtimeEntry.startTime,
        endTime: this.newtimeEntry.endTime,
        comment: this.newtimeEntry.comment,
        totalTime: this.totalTime,
      };
      TimeEntryDataService.create(data)
        .then((response) => {
          this.newtimeEntry.id = response.data.id;
          this.submitted = true;
        })
        .catch((e) => {
          this.errores.push(e.response.data);
        });
    },
    newTime() {
      this.submitted = false;
      this.newtimeEntry = {};
    },
  },
};
</script>
<style>
footer.b-time-footer {
  position: relative;
}
</style>