import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.VUE_APP_PROXY_API}/api/`;

class TimeEntryDataService {
  getAll() {
    return axios.get(API_URL+"timeEntries", { headers: authHeader() });
  }


  create(data) {
    return axios.post(API_URL+"timeEntries", data, { headers: authHeader() });
  }

  update(id, data) {
    return axios.put(API_URL+`timeEntries/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL+`timeEntries/${id}`, { headers: authHeader() });
  }

  
}



export default new TimeEntryDataService();
