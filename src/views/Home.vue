<template>
  <header class="masthead">
    <div class="text-center">
      <b-img :src="require('@/assets/logo.png')" class="logo" />
    </div>
    <b-row v-if="this.$store.state.auth.user">
      <h1 class="text-white-50 mx-auto mt-2 mb-4">¡Bienvenido!</h1>
    </b-row>
    <b-row v-else>
      <b-col lg="6" md="12" class="text-center center homepage-col">
        <h2 class="text-white-50 mx-auto mt-2 mb-4">
          Registrate en la aplicación como usuario para que un moderador pueda
          incluirte en su organización y comenzar a imputar horas y vacaciones
        </h2>
        <b-button to="/register" class="get-started-button"
          >Registrarse</b-button
        >
      </b-col>
      <b-col lg="6" md="12" class="text-center center homepage-col">
        <h2 class="text-white-50 mx-auto mt-2 mb-4">
          O inicia sesión con algunos de los roles disponibles para comenzar a
          operar
        </h2>
        <b-button to="/login" class="get-started-button"
          >Iniciar sesión</b-button
        >
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="6" md="12" class="text-center center homepage-col">
        <h2 class="text-white-50 mx-auto mt-2 mb-4">
          Ver repositorio backend y cononcer como funciona
        </h2>
        <b-button
          href="https://github.com/josgongon9/tfg-josgongon9-backend"
          class="get-started-button"
          >Backend</b-button
        >
      </b-col>
      <b-col lg="6" md="12" class="text-center center homepage-col">
        <h2 class="text-white-50 mx-auto mt-2 mb-4">
          Ver repositorio frontend y cononcer como funciona
        </h2>
        <b-button
          href="https://github.com/josgongon9/tfg-josgongon9-frontend"
          class="get-started-button"
          >Frontend</b-button
        >
      </b-col>
    </b-row>
  </header>
</template>

<script>
export default {
  name: 'home',
};
</script>


<style scoped>
.masthead {
  padding: 50px 0;
  background: linear-gradient(
    to bottom,
    rgba(29, 32, 37, 0.699) 0,
    rgb(29, 32, 37) 75%,
    #1d2025 100%
  );
}

@media (min-width: 992px) {
  .masthead h1 {
    font-size: 6.5rem;
    line-height: 6.5rem;
  }

  .masthead h2 {
    max-width: 30rem;
    font-size: 1.25rem;
  }
}

.get-started-button {
  color: #fff;
  background-color: var(--mango);
  box-shadow: 0 0.1875rem 0.1875rem 0 rgba(0, 0, 0, 0.1) !important;
  padding: 1rem 1.5rem;
  border: 0;
}

.get-started-button:hover {
  color: #fff;
  background-color: #136e0e;
}

.homepage-col {
  padding-bottom: 60px;
}

.logo {
  width: 14em;
  text-align: center;
}
</style>