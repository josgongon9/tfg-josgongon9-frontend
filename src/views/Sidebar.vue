<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h1 class="text-center">Tiempo total</h1>   
    </div>

    <div class="panel-body">
      <h1 class="text-center">{{ time }} horas</h1>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['time']
  }
</script>