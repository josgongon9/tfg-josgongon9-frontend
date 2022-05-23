import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.VUE_APP_PROXY_API}/api/users/`;

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getAllUsers() {
    return axios.get(API_URL + 'listUsers', { headers: authHeader() });
  }

  getAllByRol(role) {
    return axios.get(API_URL + `AllByRol/${role}`, { headers: authHeader() });
  }

  findByUser(username){
    return axios.get(API_URL + "findByUsername?"+`username=${username}`, { headers: authHeader() });
  }

  moderadoresByOrganization(idOrg){
    return axios.get(API_URL + "moderadoresByOrganization?"+`idOrg=${idOrg}`, { headers: authHeader() });
  }
  exportData(id){
    return axios.get(API_URL + `exportData/${id}`, { headers: authHeader() });
  }
  delete(id){
    return axios.delete(API_URL + `deleteUser/${id}`, { headers: authHeader() });
  }

  update(id, data) {
    return axios.put(API_URL+`update/${id}`, data, { headers: authHeader() });
  }

  findById(id){
    return axios.get(API_URL + `findById/${id}`, { headers: authHeader() });
  }


}

export default new UserService();
