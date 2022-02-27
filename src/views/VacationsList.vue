<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Mis vacaciones</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(vacation, index) in vacations"
          :key="index"
          @click="setActiveVacation(vacation, index)"
        >
          {{ vacation.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllVacations">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentVacation">
        <h4>Vacaciones</h4>
        <div>
          <label><strong>Título:</strong></label> {{ currentVacation.title }}
        </div>
        <div>
          <label><strong>Descripción:</strong></label> {{ currentVacation.description }}
        </div>
        <div>
          <label><strong>Estado:</strong></label> {{ currentVacation.published ? "Published" : "Pending" }}
        </div>

        <router-link :to="'/vacations/' + currentVacation.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Vacation...</p>
      </div>
    </div>
  </div>
</template>

<script>
import VacationDataService from "../services/VacationDataService";
export default {
  name: "vacations-list",
  data() {
    return {
      vacations: [],
      currentVacation: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveVacations() {
      VacationDataService.getAll()
        .then(response => {
          this.vacations = response.data;
          console.log(response.data);
        })
        .catch(e => {
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
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      VacationDataService.findByTitle(this.title)
        .then(response => {
          this.vacations = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveVacations();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>