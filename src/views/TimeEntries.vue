<template>
  <div>
    <router-link to="/time-entries/log-time"
      v-if="$route.path !== '/time-entries/log-time'"
      class="btn btn-primary" tag= "button">
      Control horario
    </router-link>

    <div v-if="$route.path === '/time-entries/log-time'">
      <h3>Control horario</h3>     
    </div>

    <hr>

    <router-view></router-view>

    <div class="time-entries">
      <p v-if="!timeEntries.length"><strong>No hay entradas</strong></p>
      
      <div class="list-group">

        <a class="list-group-item" v-for="timeEntry in timeEntries" :key="timeEntry.id"
             >
          <div class="row">

            <div class="col-sm-2 user-details">
              <p class="text-center">
                <strong>
                  {{ timeEntry.comment }} 
                </strong>
              </p>
            </div>

            <div class="col-sm-2 text-center time-block">
              <h3 class="list-group-item-text total-time">
                <i class="glyphicon glyphicon-time"></i> 
                {{ timeEntry.totalTime }} <small>horas</small>
              </h3>
              <p class="label label-primary text-center">
                <i class="glyphicon glyphicon-calendar"></i> 
                {{ timeEntry.date }}
              </p>
            </div>

            <div class="col-sm-7 comment-section">
              <p>{{ timeEntry.comment }}</p>
            </div>

            <div class="col-sm-1">
              <button 
                class="btn btn-xs btn-danger delete-button"
                @click="deleteTimeEntry(timeEntry)">
                X
              </button>
            </div>

          </div>        
        </a>

      </div>
    </div>    
  </div>
</template>

<script>
/* eslint-disable */
  import LogTime from '../views/LogTime.vue'
  import TimeEntryDataService from "../services/TimeEntryDataService";
  export default {
    components: {
    LogTime
    
  },

  data() {
    return {
      timeEntries: [],
      currentIndex: -1,
      date: ""
    };
  },


    methods: {
      retrieveTimeEntries() {
      TimeEntryDataService.getAll()
        .then(response => {
          this.timeEntries = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
      deleteTimeEntry () {
          TimeEntryDataService.delete(this.currentTimeEntry.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "timeEntries" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
     mounted() {
    this.retrieveTimeEntries();
  }
    
  }
</script>

<style>
  .avatar {
    height: 75px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .user-details {
    background-color: #f5f5f5;
    border-right: 1px solid #ddd;
    margin: -10px 0;
  }
  .time-block {
    padding: 10px;
  }
  .comment-section {
    padding: 20px;
  }
</style>