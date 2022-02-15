<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="vacation.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="vacation.description"
          name="description"
        />
      </div>

      <button @click="saveVacation" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newVacation">Add</button>
    </div>
  </div>
</template>

<script>
import VacationDataService from "../services/VacationDataService";
export default {
  name: "add-vacation",
  data() {
    return {
      vacation: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveVacation() {
      var data = {
        title: this.vacation.title,
        description: this.vacation.description
      };
      VacationDataService.create(data)
        .then(response => {
          this.vacation.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newVacation() {
      this.submitted = false;
      this.vacation = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>