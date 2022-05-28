<template>
  <b-container class="container" v-if="organization">
    <b-card
      v-if="showAlert"
      bg-variant="danger"
      text-variant="white"
      header="Aviso Organización"
      class="text-center"
    >
      <b-card-text> Aviso </b-card-text>
      <b-button href="#" variant="primary">Cerrar</b-button>
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
export default {
  name: 'User',
  data() {
    return {
      errores: [],
      currentUser: [],
      organization: [],
      content: '',
      showAlert: false,
    };
  },
  mounted() {
    this.getUser(this.$store.state.auth.user.id);
    this.getOrganization(this.$store.state.auth.user.id);
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
    getOrganization(id) {
      OrganizationDataService.findByUserId(id)
        .then((response) => {
          this.organization = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
