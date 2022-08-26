import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.VUE_APP_PROXY_API}/api/`;

class TimeEntryDataService {
  getAll() {
    return axios.get(API_URL + "timeEntries", { headers: authHeader() });
  }

  getByUserId(idUser) {
    return axios.get(API_URL + `timeEntriesByUser?idUser=${idUser}`, { headers: authHeader() });
  }

  getTimeEntryNow(idUser) {
    return axios.get(API_URL + `nowTimeEntry?idUser=${idUser}`, { headers: authHeader() });
  }

  getLastTimeEntry(idUser) {
    return axios.get(API_URL + `lastTimeEntry?idUser=${idUser}`, { headers: authHeader() });
  }

  create(data) {
    return axios.post(API_URL + "timeEntries", data, { headers: authHeader() });
  }

  update(id, data) {
    return axios.put(API_URL + `timeEntries/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL + `timeEntries/${id}`, { headers: authHeader() });
  }


}



export default new TimeEntryDataService();
