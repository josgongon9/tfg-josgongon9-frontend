<template>
  <footer>
    <div>
      <b-link href=https://tfg-josgongon9-backend.herokuapp.com/swagger-ui.html#/>Swagger</b-link> 💻 in Seville

      <b-link href=https://github.com/josgongon9#/><font-awesome-icon icon="fa-brands fa-github" size="lg" class="icons" /></b-link>

      <b-link href=https://es.linkedin.com/in/jose-miguel-gonzalez-461a41177#/> <font-awesome-icon icon="fa-brands fa-linkedin" size="lg" class="icons"/></b-link>

    </div>
  </footer>
</template>

<script>
export default {
  name: 'app-footer',
};
</script>

<style >
footer {
  box-sizing: border-box;
  background-color: #5f5a5a;
  bottom: 0;
  left: 0;
  position: static;
  padding: 1rem;
  width: 100%;
  text-align: center;
  
}


.icons {
  padding-left: 7px;
}
</style>