import axios from "axios";
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class VacationDataService {
  getAll() {
    return axios.get(API_URL+"vacations", { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL+`vacations/${id}`, { headers: authHeader() });
  }

  create(data) {
    return axios.post(API_URL+"vacations", data, { headers: authHeader() });
  }

  update(id, data) {
    return axios.put(API_URL+`vacations/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL+`vacations/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return axios.delete(API_URL+"vacations", { headers: authHeader() });
  }

  findByTitle(title) {
    return axios.get(API_URL+`vacations?title=${title}`, { headers: authHeader() });
  }
}

export default new VacationDataService();