import axios from "axios";
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class TutorialDataService {
  getAll() {
    return axios.get(API_URL+"tutorials", { headers: authHeader() });
  }

  get(id) {
    return axios.get(`tutorials/${id}`);
  }

  create(data) {
    return axios.post(API_URL+"tutorials", data, { headers: authHeader() });
  }
  /*create(data) {
    return axios
      .post("/tutorials", data)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }*/

  update(id, data) {
    return axios.put(`tutorials/${id}`, data);
  }

  delete(id) {
    return axios.delete(`tutorials/${id}`);
  }

  deleteAll() {
    return axios.delete(`tutorials`);
  }

  findByTitle(title) {
    return axios.get(`tutorials?title=${title}`);
  }
}

export default new TutorialDataService();