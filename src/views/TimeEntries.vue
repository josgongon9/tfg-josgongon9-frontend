<template>
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
                <b-form-checkbox value="comment">Comentario</b-form-checkbox>
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
  <b-container class="container" v-else>
    <div>
      <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
        <template #header>Entradas de tiempo</template>

        <template #lead>
          ¡Vaya! Aun no perteneces a ninguna organización. Espera a que un
          moderador te incluya en una.
        </template>

        <hr class="my-4" />
      </b-jumbotron>
    </div>
  </b-container>
</template>

<script>
/* eslint-disable */
import moment from 'moment';
import TimeEntryDataService from '../services/TimeEntryDataService';
import OrganizationDataService from '../services/OrganizationDataService';
export default {
  filters: {
    dataFormat: function (value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY');
      }
    },
  },

  data() {
    return {
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

  computed: {
    sortOptions() {
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    this.retrieveTimeEntries();
    this.totalRows = this.items.length;
    this.getOrganization(this.$store.state.auth.user.id);
  },

  methods: {
    retrieveTimeEntries() {
      TimeEntryDataService.getAll()
        .then((response) => {
          this.items = response.data;
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
  },
};
</script>

<style>
.avatar {
  height: 75px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
}
.user-details {
  background-color: #f5f5f5;
  border-right: 1px solid #ddd;
  margin: -10px 0;
}
.time-block {
  padding: 10px;
}
.comment-section {
  padding: 20px;
}
</style>