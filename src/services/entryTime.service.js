import axios from 'axios';

const API_URL = 'http://localhost:8080/api/entryTime/';

class EntryTimeService {
  create(entryTime) {
    return axios
      .post(API_URL + 'new', {
        date: entryTime.date,
        totalTime: entryTime.totalTime,
        comment: entryTime.comment
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  deleteItem(id) {
    return this.axios({
      method: 'delete',
      url: 'todo/' + id,
      withCredentials: true
    })

  }
  findAll() {
    return this.axios({
      method: 'get',
      url: 'timeEntries',
      withCredentials: true
    }).then((response) => {
      const timeEntries = []
      response.data.forEach((entryTime) => {
        timeEntries.push(new entryTime(entryTime.id, entryTime.date, entryTime.totalTime, entryTime.comment))
      })
      return timeEntries
    })
  }



}

export default new EntryTimeService();
