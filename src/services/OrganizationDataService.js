import axios from "axios";
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/organization/';

class OrganizationDataService {
  getAll() {
    return axios.get(API_URL+"all", { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL+`organizations/${id}`, { headers: authHeader() });
  }

  create(data) {
    return axios.post(API_URL+"add", data, { headers: authHeader() });
  }

  update(id, data) {
    return axios.put(API_URL+`organizations/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL+`organizations/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return axios.delete(API_URL+"organizations", { headers: authHeader() });
  }

  findByName(name) {
    return axios.get(API_URL+`organizations?name=${name}`, { headers: authHeader() });
  }
}

export default new OrganizationDataService();