<template>
  <div class="form-horizontal">
    <div class="form-group">
      <div class="col-sm-6">
        <label>Date</label>
        <input 
          type="date"
          class="form-control"
          v-model="newtimeEntry.date"
          placeholder="Date"
        />
      </div>
      <div class="col-sm-6">
        <label>Hours</label>
        <input 
          type="number" 
          class="form-control"
          v-model="newtimeEntry.totalTime"
          placeholder="Hours"
        />
      </div>      
    </div>    
    <div class="form-group">
      <div class="col-sm-12">
        <label>Comment</label>
        <input 
          type="text" 
          class="form-control"
          v-model="newtimeEntry.comment"
          placeholder="Comment"
        />
      </div>        
    </div>    
    <button class="btn btn-primary" @click="create()">Create</button>
    <router-link to="/time-entries" class="btn btn-danger" tag ="button">Cancel</router-link>  
    <hr>
  </div>
  
</template>

<script>
import TimeEntryDataService from "../services/TimeEntryDataService";
  export default {
    data () {
      return {
        newtimeEntry: {
            id: null,
            date: '',
            totalTime: '',
            comment: ''
          
        }
      }
    },
    methods: {
      /*create  () {
        this.$service.timeEntry.create(this.newtimeEntry).then((data) => {
        //let timeEntry = this.timeEntry
        // We dispatch the timeEntry so it can be pushed
        // onto the timeEntries array in the parent component
        this.$emit('create', data)
        this.newtimeEntry = {}
        })
      }*/
    create() {
      var data = {
        date: this.newtimeEntry.date,
        totalTime: this.newtimeEntry.totalTime,
        comment: this.newtimeEntry.comment

      };
      TimeEntryDataService.create(data)
        .then(response => {
          this.newtimeEntry.id = response.data.id;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    }
  }
</script>