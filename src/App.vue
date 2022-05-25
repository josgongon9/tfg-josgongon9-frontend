<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href class="navbar-brand" @click.prevent>josgongon9</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" />Inicio
          </router-link>
        </li>
        <li v-if="isAdmin" class="nav-item">
          <router-link to="/admin" class="nav-link"
            >Panel administrador</router-link
          >
        </li>
        <li v-if="isAdmin" class="nav-item">
          <router-link to="/alerts" class="nav-link">Alertas</router-link>
        </li>
        <li v-if="isMod" class="nav-item">
          <router-link to="/mod" class="nav-link">Panel Moderador</router-link>
        </li>
        <li v-if="isMod" class="nav-item">
          <router-link to="/organizations" class="nav-link"
            >Organizaciones</router-link
          >
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link"
            >Usuario</router-link
          >
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/time-entries" class="nav-link"
            >Control Horario</router-link
          >
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/vacations" class="nav-link"
            >Vacaciones</router-link
          >
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" />Registro
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Identificarse
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from './views/Footer.vue';

export default {
  name: 'about',
  components: {
    Footer,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    isMod() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
  },
};
</script>

<style>
.container {
  position: relative;
  min-height: 100vh;
}
</style>
