<template>
  <div class="container">
    <b-card
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
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </template>

        <hr class="my-4" />

        <p>Descripción:</p>
      </b-jumbotron>
    </div>
  </div>
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
