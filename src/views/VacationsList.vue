<template>
  <div class="list row">
    <div class="col-md-1">
      <router-link v-if="currentUser" to="/add" class="btn btn-success"
        >Añadir</router-link
      >
    </div>

    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Introduce título..."
          v-model="title"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>

    <div class="col-md-2">
      <h4>Días restantes:</h4>
      {{ currentUser.daysOfVacation }}
    </div>
    <div class="col-md-6">
      <h4>Mis vacaciones</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(vacation, index) in vacations"
          :key="index"
          @click="setActiveVacation(vacation, index)"
        >
          {{ vacation.title }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentVacation">
        <h4>{{ currentVacation.title }}</h4>
        <div>
          <label><strong>Descripción:</strong></label>
          {{ currentVacation.description }}
        </div>
        <div>
          <label><strong>Estado:</strong></label>
          {{ currentVacation.published ? 'Published' : 'Pending' }}
        </div>
        <div>
          <label><strong>Fecha Inicio:</strong></label>
          {{ currentVacation.startDate | dataFormat }}
        </div>
        <div>
          <label><strong>Fecha Fin:</strong></label>
          {{ currentVacation.endDate | dataFormat }}
        </div>
        <div>
          <label><strong>Días solicitados:</strong></label>
          {{
            calculateDate(currentVacation.startDate, currentVacation.endDate)
          }}
        </div>
        <router-link
          :to="'/vacations/' + currentVacation.id"
          class="btn btn-warning"
          >Editar</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Por favor seleccione una...</p>
      </div>
    </div>
  </div>
</template>

<script>
import VacationDataService from '../services/VacationDataService';
import moment from 'moment';
export default {
  filters: {
    dataFormat: function (value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY');
      }
    },
  },
  name: 'vacations-list',
  data() {
    return {
      vacations: [],
      currentVacation: null,
      currentIndex: -1,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    calculateDate(date1, date2) {
      let start = moment(date1);
      let end = moment(date2);
      let duration = moment.duration(end.diff(start));
      let days = duration.asDays();
      return Math.round(days) + 1;
    },
    retrieveVacations() {
      VacationDataService.getAll()
        .then((response) => {
          this.vacations = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveVacations();
      this.currentVacation = null;
      this.currentIndex = -1;
    },
    setActiveVacation(vacation, index) {
      this.currentVacation = vacation;
      this.currentIndex = index;
    },
    removeAllVacations() {
      VacationDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      VacationDataService.findByTitle(this.title)
        .then((response) => {
          this.vacations = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveVacations();
    this.resultDate = calculateDate;
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.btn-success{
position: absolute;
left: 0px;

}

      
</style>