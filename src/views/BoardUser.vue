<template>
  <b-container class="container" v-if="organization">
    <b-card
      v-if="showAlert"
      bg-variant="danger"
      text-variant="white"
      header="Aviso Organización"
      class="text-center"
    >
      <b-card-sub-title class="mb-2">
        {{ alerts.f_alta | dataFormat }}</b-card-sub-title
      >

      <b-card-text> {{ alerts.description }} </b-card-text>
      <b-button @click="showAlert = false" variant="primary">Cerrar</b-button>
    </b-card>
    <div>
      <b-jumbotron>
        <template #header>Mi organización</template>
        <template #lead>
          <h6>Nombre organización: {{ organization.name }}</h6>
          <h6>Desripción: {{ organization.description }}</h6>
          <h6>Url: {{ organization.url }}</h6>
          <h6>Número teléfono: {{ organization.phoneNumber }}</h6>
          <h6>País: {{ organization.country }}</h6>
          <h6>Provincia: {{ organization.province }}</h6>
          <h6>Ciudad: {{ organization.city }}</h6>
        </template>
        <hr class="my-4" />
      </b-jumbotron>
      <b-card-group deck>
        <b-card
          v-if="currentUser.daysOfVacations !== null" 
          border-variant="info"
          header="Días vacaciones restantes"
          align="center"
        >
          <b-card-text> {{ currentUser.daysOfVacations }}</b-card-text>
        </b-card>
        <b-card
          v-else
          border-variant="danger"
          header="Días vacaciones restantes"
          align="center"
        >
          <b-card-text>
            {{ 'Sin registros aun, contacte con un Moderador' }}</b-card-text
          >
        </b-card>

        <b-card
          v-if="timeEntriesNow"
          border-variant="info"
          header="Horas Imputadas hoy"
          align="center"
        >
          <b-card-text> {{ timeEntriesNow }}</b-card-text>
        </b-card>
        <b-card
          v-else
          border-variant="danger"
          header="Horas Imputadas hoy"
          align="center"
        >
          <b-card-text> {{ 'Sin registros aun' }}</b-card-text>
        </b-card>
        <b-card
          v-if="lastDateTimeEntries"
          border-variant="info"
          header="Último día imputado"
          align="center"
        >
          <b-card-text> {{ lastDateTimeEntries | dataFormat }}</b-card-text>
        </b-card>
        <b-card
          v-else
          border-variant="danger"
          header="Último día imputado"
          align="center"
        >
          <b-card-text> {{ 'Sin registros aun' }}</b-card-text>
        </b-card>
      </b-card-group>
    </div>
  </b-container>
  <b-container class="container" v-else>
    <div>
      <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
        <template #header>Usuario</template>

        <template #lead>
          ¡Vaya! Aun no perteneces a ninguna organización. Espera a que un
          moderador te incluya en una
        </template>

        <hr class="my-4" />
      </b-jumbotron>
    </div>
  </b-container>
</template>

<script>
import UserService from '../services/user.service';
import OrganizationDataService from '../services/OrganizationDataService';
import AlertDataService from '../services/AlertDataService';
import TimeEntryDataService from '../services/TimeEntryDataService';
import moment from 'moment';
export default {
  name: 'User',
  data() {
    return {
      errores: [],
      currentUser: [],
      organization: [],
      content: '',
      showAlert: false,
      alerts: [],
      timeEntriesNow: '',
      lastDateTimeEntries: '',
    };
  },
  filters: {
    dataFormat: function (value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY');
      }
    },
  },
  mounted() {
    this.getUser(this.$store.state.auth.user.id);
    this.getOrganization(this.$store.state.auth.user.id);
    this.getTimeEntryNow();
    this.getLastTimeEntry();
  },
  methods: {
    getUser(id) {
      UserService.findById(id)
        .then((response) => {
          this.currentUser = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getTimeEntryNow() {
      TimeEntryDataService.getTimeEntryNow(this.$store.state.auth.user.id)
        .then((response) => {
          this.timeEntriesNow = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getLastTimeEntry() {
      TimeEntryDataService.getLastTimeEntry(this.$store.state.auth.user.id)
        .then((response) => {
          this.lastDateTimeEntries = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getOrganization(id) {
      OrganizationDataService.findByUserId(id)
        .then((response) => {
          this.organization = response.data;
          this.getAllByOrg(this.organization.id);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAllByOrg(id) {
      AlertDataService.getShowByOrg(id)
        .then((response) => {
          this.alerts = response.data;
          if (this.alerts.id != null) {
            this.showAlert = true;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
