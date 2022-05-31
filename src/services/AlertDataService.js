import axios from "axios";
import authHeader from './auth-header';

const API_URL = `${process.env.VUE_APP_PROXY_API}/api/alerts`;

class AlertDataService {
  getAllByOrg(idOrg) {
    return axios.get(API_URL + `/alertsByOrg/${idOrg}`, { headers: authHeader() });
  }
  getShowByOrg(idOrg) {
    return axios.get(API_URL + `/showByOrg/${idOrg}`, { headers: authHeader() });
  }

  getAll() {
    return axios.get(API_URL + "/all", { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  }

  create(data, idOrg) {
    return axios.post(API_URL + `?idOrg=${idOrg}`, data, { headers: authHeader() });
  }

  update(id, data) {
    return axios.put(API_URL + `/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  }

  findByName(name) {
    return axios.get(API_URL + `/findByName?name=${name}`, { headers: authHeader() });
  }
}

export default new AlertDataService();