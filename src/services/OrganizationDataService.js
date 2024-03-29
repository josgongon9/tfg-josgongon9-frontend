import axios from "axios";
import authHeader from './auth-header';

const API_URL = `${process.env.VUE_APP_PROXY_API}/api/organization/`;

class OrganizationDataService {
  getAll() {
    return axios.get(API_URL+"all", { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL+`${id}`, { headers: authHeader() });
  }

  getUserInOtherOrg(idUser,idOrg) {
    return axios.get(API_URL+`userOtherOrg?idUser=${idUser}`+`&idOrg=${idOrg}`, { headers: authHeader() });
  }

  getOrganizationsByAlert() {
    return axios.get(API_URL+`organizationsByAlert`, { headers: authHeader() });
  }

  findByUserId(idUser) {
    return axios.get(API_URL+`findByUserId?idUser=${idUser}`, { headers: authHeader() });
  }

  create(data) {
    return axios.post(API_URL+"add", data, { headers: authHeader() });
  }

  update(id, data) {
    return axios.put(API_URL+`${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL+`${id}`, { headers: authHeader() });
  }

  findByName(name) {
    return axios.get(API_URL+`findByName?name=${name}`, { headers: authHeader() });
  }

  updateUsers(id, idUser) {
    return axios.put(API_URL+"updateUsers?"+`id=${id}`+`&idUser=${idUser}`, idUser, { headers: authHeader() });
  }

  updateMods(id, idUser) {
    return axios.put(API_URL+"updateMods?"+`id=${id}`+`&idUser=${idUser}`, idUser, { headers: authHeader() });
  }
}

export default new OrganizationDataService();