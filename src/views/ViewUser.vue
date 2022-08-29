<template>
  <b-container>
    <b-row align-h="center" class="mt-5 mb-5">
      <b-col cols="12">
        <b-card
          class="text-center mx-auto"
          align-self="center"
          style="max-width: 400px"
        >
          <h3>Visualizar usuario:</h3>
          <div class="mx-auto">
            <b-form @submit.prevent="onSubmit" v-if="show">
              <b-form-group
                id="cabecera-usuario"
                label="Nombre de usuario:"
                label-for="usuario"
              >
                <b-form-input
                  id="usuario"
                  v-model="currentUser.username"
                  name="usuario"
                  readonly
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="cabecera-correo"
                label="Correo Electrónico"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="currentUser.email"
                  type="email"
                  placeholder="someone@example.com"
                  name="correo electrónico"
                  :rules="{ required: true, email }"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Rol:" label-for="rol">
                <b-form-checkbox-group
                  id="rol"
                  v-model="roles"
                  name="rol"
                  v-validate="'required'"
                  :disabled="isAdmin != true"
                >
                  <b-form-checkbox value="ROLE_MODERATOR"
                    >Moderador</b-form-checkbox
                  >
                  <b-form-checkbox value="ROLE_USER">Usuario</b-form-checkbox>
                  <b-form-checkbox value="ROLE_ADMIN"
                    >Administrador</b-form-checkbox
                  >
                </b-form-checkbox-group>
                <div v-if="errors.has('rol')" class="alert alert-danger">
                  {{ 'Es necesario elegir mínimo un rol' }}
                </div>
              </b-form-group>

              <b-form-group
                id="daysOfVacations"
                label="Días de Vacaciones:"
                label-for="input-1"
              >
                <b-form-spinbutton
                  id="input-1"
                  v-model="currentUser.daysOfVacations"
                  name="daysOfVacations"
                  :disabled="editVacation == true"
                  min="1"
                  max="100"
                ></b-form-spinbutton>
              </b-form-group>

              <b-form-group
                id="organization"
                label="Organización:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  name="organization"
                  readonly
                  v-model="organization.name"
                ></b-form-input>
              </b-form-group>

              <div>
                <b-row align-h="center">
                  <div>
                    <b-button type="submit" class="btn btn-success mt-2"
                      ><font-awesome-icon icon="save" /> Guardar Cambios </b-button
                    >&nbsp;
                    <div v-if="isAdmin">
                      <b-button
                        class="btn btn-danger mt-2"
                        v-on:click="deleteUser()"
                        ><font-awesome-icon icon="trash-alt" /> Borrar
                        Usuario</b-button
                      >
                    </div>
                  </div>
                </b-row>
              </div>

              <ul v-if="errores && errores.length">
                <b-alert
                  :show="true"
                  variant="danger"
                  v-for="error of errores"
                  v-bind:key="error"
                  >{{ error }}</b-alert
                >
              </ul>
            </b-form>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-card-group>
      <b-card
        v-if="timeEntriesNow"
        border-variant="info"
        header="Horas Imputadas hoy"
        align="center"
      >
        <b-card-text> {{ timeEntriesNow }}</b-card-text>
      </b-card>
      <b-card
        v-else
        border-variant="danger"
        header="Horas Imputadas hoy"
        align="center"
      >
        <b-card-text> {{ 'Sin registros aun' }}</b-card-text>
      </b-card>
      <b-card
        v-if="lastDateTimeEntries"
        border-variant="info"
        header="Último día imputado"
        align="center"
      >
        <b-card-text> {{ lastDateTimeEntries | dataFormat }}</b-card-text>
      </b-card>
      <b-card
        v-else
        border-variant="danger"
        header="Último día imputado"
        align="center"
      >
        <b-card-text> {{ 'Sin registros aun' }}</b-card-text>
      </b-card>
    </b-card-group>
    <b-card
      v-if="lastDateTimeEntries"
      border-variant="info"
      header="Registro horario"
      align="center"
    >
      <b-card-text>
        <b-container fluid v-if="organization">
          <div>
            <b-input-group>
              <router-link :to="{ name: 'addTimeEntries' }"
                ><b-button size="md" class="btn btn-success"
                  >Añadir</b-button
                ></router-link
              >
              <b-button
                :class="visible ? null : 'collapsed'"
                :aria-expanded="visible ? 'true' : 'false'"
                aria-controls="collapse-4"
                @click="visible = !visible"
                variant="primary"
              >
                Filtros
              </b-button>
            </b-input-group>
            <b-collapse id="collapse-4" v-model="visible" class="mt-2">
              <b-row>
                <b-col lg="6" class="my-1">
                  <b-form-group
                    label="Ordenar"
                    label-for="sort-by-select"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                    v-slot="{ ariaDescribedby }"
                  >
                    <b-input-group size="sm">
                      <b-form-select
                        id="sort-by-select"
                        v-model="sortBy"
                        :options="sortOptions"
                        :aria-describedby="ariaDescribedby"
                        class="w-75"
                      >
                        <template #first>
                          <option value="">----</option>
                        </template>
                      </b-form-select>

                      <b-form-select
                        v-model="sortDesc"
                        :disabled="!sortBy"
                        :aria-describedby="ariaDescribedby"
                        size="sm"
                        class="w-25"
                      >
                        <option :value="false">Ascedente</option>
                        <option :value="true">Descendente</option>
                      </b-form-select>
                    </b-input-group>
                  </b-form-group>
                </b-col>

                <b-col lg="6" class="my-1"> </b-col>

                <b-col lg="6" class="my-1">
                  <b-form-group
                    label="Filtro"
                    label-for="filter-input"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                  >
                    <b-input-group size="sm">
                      <b-form-input
                        id="filter-input"
                        v-model="filter"
                        type="search"
                        placeholder="Escriba para buscar"
                      ></b-form-input>

                      <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''"
                          >Limpiar</b-button
                        >
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>

                <b-col lg="6" class="my-1">
                  <b-form-group
                    v-model="sortDirection"
                    label="Filtro"
                    description="Dejar todo desmarcado para obtener todos los datos"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                    v-slot="{ ariaDescribedby }"
                  >
                    <b-form-checkbox-group
                      v-model="filterOn"
                      :aria-describedby="ariaDescribedby"
                      class="mt-1"
                    >
                      <b-form-checkbox value="comment"
                        >Comentario</b-form-checkbox
                      >
                      <b-form-checkbox value="totalTime"
                        >Duración Total</b-form-checkbox
                      >
                      <b-form-checkbox value="date">Fecha</b-form-checkbox>
                    </b-form-checkbox-group>
                  </b-form-group>
                </b-col>

                <b-col sm="5" md="6" class="my-1">
                  <b-form-group
                    label="Páginas"
                    label-for="per-ptotalTime-select"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                  >
                    <b-form-select
                      id="per-ptotalTime-select"
                      v-model="perPtotalTime"
                      :options="ptotalTimeOptions"
                      size="sm"
                    ></b-form-select>
                  </b-form-group>
                </b-col>

                <b-col sm="7" md="6" class="my-1">
                  <b-pagination
                    v-model="currentPtotalTime"
                    :total-rows="totalRows"
                    :per-ptotalTime="perPtotalTime"
                    align="fill"
                    size="sm"
                    class="my-0"
                  ></b-pagination>
                </b-col>
              </b-row>
            </b-collapse>
          </div>

          <b-table
            :items="items"
            :fields="fields"
            :current-ptotalTime="currentPtotalTime"
            :per-ptotalTime="perPtotalTime"
            :filter="filter"
            :filter-included-fields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            stacked="md"
            show-empty
            small
            @filtered="onFiltered"
          >
            <template #cell(actions)="row">
              <b-button
                size="sm"
                @click="info(row.item, row.index, $event.target)"
                class="mr-1"
                variant="info"
              >
                Info
              </b-button>

              <b-button
                size="sm"
                variant="danger"
                @click="deleteTimeEntry(row.item.id, row.index)"
              >
                Eliminar
              </b-button>
            </template>
          </b-table>

          <!-- Info modal -->
          <b-modal
            :id="infoModal.id"
            :title="infoModal.title"
            ok-only
            @hide="resetInfoModal"
          >
            <pre>{{ infoModal.content }}</pre>
          </b-modal>
        </b-container>
      </b-card-text>
    </b-card>

    <b-card
      v-if="vacations"
      border-variant="info"
      header="Vacaciones"
      align="center"
    >
      <b-card-text>
        <b-container fluid v-if="organization">
          <div>
            <b-collapse id="collapse-4" v-model="visible" class="mt-2">
              <b-row>
                <b-table-simple striped responsive>
                  <b-thead>
                    <b-tr>
                      <b-th>Título</b-th>
                      <b-th>Descripción</b-th>
                      <b-th>Fecha de Inicio</b-th>
                      <b-th>Fecha de Fin</b-th>
                      <b-th>Días totales</b-th>
                      <b-th>Acción</b-th>
                    </b-tr>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="(vac, index) in vacations" :key="index">
                      <b-td style="vertical-align: middle">
                        <span>{{ vac.title }}</span>
                      </b-td>
                      <b-td style="vertical-align: middle">{{
                        vac.description
                      }}</b-td>
                      <b-td style="vertical-align: middle">
                        <span>{{ vac.startDate | dataFormat }}</span>
                      </b-td>
                      <b-td style="vertical-align: middle">
                        <span>{{ vac.endDate | dataFormat }}</span>
                      </b-td>
                      <b-td style="vertical-align: middle">
                        <span>
                          {{ calculateDate(vac.startDate, vac.endDate) }}</span
                        >
                      </b-td>
                      <b-td style="vertical-align: middle">
                        <b-button
                          size="sm"
                          variant="danger"
                          @click="deleteVacation(vac.id, index)"
                        >
                          Eliminar
                        </b-button>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-row>
            </b-collapse>
          </div>
        </b-container>
      </b-card-text>
    </b-card>
    <b-card v-else border-variant="info" header="Vacaciones" align="center">
      <b-card-text> {{ 'Sin registros aun' }}</b-card-text></b-card
    >
  </b-container>
</template>

<script>
import UserService from '../services/user.service';
import OrganizationDataService from '../services/OrganizationDataService';
import TimeEntryDataService from '../services/TimeEntryDataService';
import VacationDataService from '../services/VacationDataService';
import moment from 'moment';
export default {
  name: 'viewUser',
  data() {
    return {
      errores: [],
      vacations: [],
      currentUser: [],
      show: true,
      isAdmin: false,
      isMod: false,
      roles: [],
      organization: '',
      timeEntriesNow: '',
      lastDateTimeEntries: '',
      items: [],
      visible: true,
      organization: '',
      fields: [
        {
          key: 'comment',
          label: 'Comentario',
          sortable: true,
          sortDirection: 'desc',
        },
        {
          key: 'totalTime',
          label: 'Duracion Total',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'date',
          label: 'Fecha',
          formatter: (value, key, item) => {
            return moment(String(value)).format('DD/MM/YYYY');
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },
        { key: 'actions', label: 'Acciones' },
      ],
      totalRows: 1,
      currentPtotalTime: 1,
      perPtotalTime: 5,
      ptotalTimeOptions: [5, 10, 15, { value: 100, text: 'Mostrar todos' }],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: [],
      },
    };
  },
  filters: {
    dataFormat: function (value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY');
      }
    },
  },

  mounted() {
    this.getUser(this.$route.params.id);
    this.getUserRol();
    this.getOrganization(this.$route.params.id);
    this.getTimeEntryNow();
    this.getLastTimeEntry();
    this.retrieveTimeEntries();
    this.retrieveVacations();
    this.totalRows = this.items.length;
  },
  methods: {
    calculateDate(date1, date2) {
      let startDate = moment(date1);
      let endDate = moment(date2);
      let count = 0;
      let curDate = +startDate;
      while (curDate <= +endDate) {
        const dayOfWeek = new Date(curDate).getDay();
        const isWeekend = dayOfWeek === 6 || dayOfWeek === 0;
        if (!isWeekend) {
          count++;
        }
        curDate = curDate + 24 * 60 * 60 * 1000;
      }
      return Math.round(count);
    },
    getUser(id) {
      UserService.findById(id)
        .then((response) => {
          this.currentUser = response.data;
          for (const element of response.data.roles) {
            this.roles.push(element.name);
          }
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveTimeEntries() {
      TimeEntryDataService.getByUserId(this.$route.params.id)
        .then((response) => {
          this.items = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveVacations() {
      VacationDataService.getAllByUser(this.$route.params.id)
        .then((response) => {
          this.vacations = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onSubmit() {
      this.errores.pop();
      this.currentUser.roles = this.roles;
      if (this.currentUser.roles.length > 1) {
        this.errores.push('No se permiten los multiperfilados');
      } else {
        UserService.update(this.currentUser.id, this.currentUser)
          .then((response) => {
            alert('Datos actualizados con éxito.');
          })
          .catch((e) => {
            this.errores.push(e);
          });
      }
    },
    getUserRol() {
      let roles = this.$store.state.auth.user.roles;
      for (const element of roles) {
        if (element == 'ROLE_MODERATOR') {
          this.isMod = true;
        }
        if (element == 'ROLE_ADMIN') {
          this.isAdmin = true;
        }
      }
    },
    deleteTimeEntry(id, index) {
      TimeEntryDataService.delete(id)
        .then((response) => {
          console.log(response.data);
          this.items.splice(index, 1);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteVacation(id, index) {
      VacationDataService.delete(id)
        .then((response) => {
          console.log(response.data);
          this.vacations.splice(index, 1);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    info(item, index, button) {
      this.infoModal.title = `Entrada del día : ${moment(
        String(item.date)
      ).format('DD/MM/YYYY')}`;
      this.infoModal.content =
        'Fecha Comienzo: ' +
        item.startTime +
        '\n' +
        'Fecha Fin: ' +
        item.endTime +
        '\n' +
        'Duración Total: ' +
        item.totalTime +
        '\n' +
        'Comentario: ' +
        item.comment;
      this.$root.$emit('bv::show::modal', this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = '';
      this.infoModal.content = '';
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPtotalTime = 1;
    },
    getTimeEntryNow() {
      TimeEntryDataService.getTimeEntryNow(this.$route.params.id)
        .then((response) => {
          this.timeEntriesNow = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getLastTimeEntry() {
      TimeEntryDataService.getLastTimeEntry(this.$route.params.id)
        .then((response) => {
          this.lastDateTimeEntries = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getOrganization(id) {
      OrganizationDataService.findByUserId(id)
        .then((response) => {
          this.organization = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    exportUser() {
      UserService.exportData(this.currentUser.id)
        .then((response) => {
          if (response.status == 200) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'user_data.txt');
            document.body.appendChild(link);
            link.click();
          }
        })
        .catch((e) => {
          this.errores.push(e);
        });
    },

    deleteUser() {
      if (
        confirm(
          'Está a punto de eliminar a este usuario. Este proceso no tiene marcha atrás,¿Seguro que desea continuar? '
        )
      ) {
        UserService.delete(this.currentUser.id)
          .then((response) => {
            if (response.status == 204) {
              alert(
                'Se ha eliminado el usuario satisfactoriamente. será redirigido a la vista de inicio'
              );
              this.$store.dispatch('auth/logout');
              this.$router.push('/login');
            } else {
              alert('No se ha podido eliminar tu cuenta.');
            }
          })
          .catch((e) => {
            this.errors.push(e);
          });
      }
    },
    getRol(value) {
      if (value == 'ROLE_MODERATOR') {
        return 'Moderador';
      } else if (value == 'ROLE_USER') {
        return 'Usuario';
      } else if (value == 'ROLE_ADMIN') {
        return 'Administrador';
      }
    },
  },
  computed: {
    editVacation() {
      let res = false;
      if (this.admin == true) {
        res = true;
      } else if (this.mod == true) {
        res = true;
      }
      return res;
    },
    sortOptions() {
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  getUserRol() {
    let roles = this.$store.state.auth.user.roles;
    for (const element of roles) {
      if (element == 'ROLE_MODERATOR') {
        this.isMod = true;
      }
      if (element == 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    }
  },
};
</script>
<style scoped>
.save-button {
  border: none;
  color: var(--mango) !important;
  background: rgb(83, 185, 132) !important;
  margin: 0;
  border: 1px solid var(--mango) !important;
  border-radius: 4px 4px 4px 4px !important;
}

.save-button:hover {
  color: rgb(39, 32, 32) !important;
  background: var(--mango) !important;
  box-shadow: 0px 0px 1px 2px rgba(228, 160, 65, 0.432) !important;
}

.gdpr-buttons {
  margin-top: 10px;
  align-content: center;
}
</style>