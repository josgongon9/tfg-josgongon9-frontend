<template>
  <b-container class="container" v-if="organization">
    <b-row align-h="center" class="mt-5">
      <h3>Mis vacaciones</h3>
    </b-row>

    <b-row align-h="center">
      <b-col sm="12" md="10" lg="8" xl="6" class="mb-2">
        <router-link :to="{ name: 'add' }"
          ><b-button size="md" class="btn btn-success"
            >Añadir</b-button
          ></router-link
        >

        <b-input-group>
          <b-form-input
            v-model="searchText"
            size="md"
            class="search-input"
            placeholder="Buscar vacaciones."
          ></b-form-input>
          <b-input-group-append>
            <b-button @click="searchTitle" size="md" class="search-b">
              <font-awesome-icon icon="search" />
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-col class="col-md-2">
        <b-card border-variant="info" header="Días restantes" align="center">
          <b-card-text> {{ daysOfVacations }}</b-card-text>
        </b-card>
      </b-col>
    </b-row>

    <b-row v-if="vacations" align-h="center">
      <b-col sm="12" md="10" lg="8" xl="6" class="mb-2">
        <b-list-group>
          <b-list-group-item
            class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(vacation, index) in vacations"
            :key="index"
            @click="setActiveVacation(vacation, index)"
          >
            {{ vacation.title }}
          </b-list-group-item>
        </b-list-group>
      </b-col>

      <b-col sm="12" md="10" lg="8" xl="6" class="mb-2">
        <div>
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
                calculateDate(
                  currentVacation.startDate,
                  currentVacation.endDate
                )
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
      </b-col>
    </b-row>
    <b-row v-else align-h="center">
      <b-card
        class="card-vac"
        bg-variant="dark"
        text-variant="white"
        title="No existen vacaciones"
      >
        <b-card-text> Aun no tienes vacaciones solicitadas. </b-card-text>
        <router-link :to="{ name: 'add' }"
          ><b-button variant="primary">Añadir vacaciones</b-button></router-link
        >
      </b-card>
    </b-row>
  </b-container>
  <b-container class="container" v-else>
    <div>
      <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
        <template #header>Vacaciones</template>

        <template #lead>
         ¡Vaya! Aun no perteneces a ninguna organización. Espera a que un moderador te incluya en una
        </template>

        <hr class="my-4" />

       
      </b-jumbotron>
    </div>
  </b-container>
</template>

<script>
import VacationDataService from '../services/VacationDataService';
import moment from 'moment';
import userService from '../services/user.service';
import OrganizationDataService from '../services/OrganizationDataService';
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
      errores: [],
      vacations: [],
      currentVacation: null,
      currentIndex: -1,
      daysOfVacations: '',
      searchText: '',
      organization: '',
    };
  },
  methods: {
    calculateDate(date1, date2) {
      let startDate = moment(date1);
      let endDate = moment(date2);
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
      return Math.round(count);
    },

    retrieveVacations() {
      VacationDataService.getAllByUser(this.$store.state.auth.user.id)
        .then((response) => {
          this.vacations = response.data;
          this.retrieveDays();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    retrieveDays() {
      userService
        .findById(this.$store.state.auth.user.id)
        .then((response) => {
          this.daysOfVacations = response.data.daysOfVacations;
        })
        .catch((e) => {
          this.errores.push(e.response.data);
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
          this.errores.push(e.response.data);
        });
    },

    getOrganization(id) {
      OrganizationDataService.findByUserId(id)
        .then((response) => {
          this.organization = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      VacationDataService.findByTitle(this.searchText)
        .then((response) => {
          this.vacations = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          this.errores.push(e.response.data);
        });
    },
  },
  mounted() {
    this.retrieveVacations();
    this.getOrganization(this.$store.state.auth.user.id);
  },
};
</script>

<style>
.btn-success {
  position: absolute;
  left: -65px;
}
.card-vac {
  text-align: center;
  height: 150px;
  width: 900px;
}
</style>