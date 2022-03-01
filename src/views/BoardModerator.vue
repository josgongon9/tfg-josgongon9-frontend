<template>
  <b-container class="container">
    <b-row align-h="center" class="mt-5">
      <h3>Todos los usuarios</h3>
    </b-row>

    <b-row align-h="center">
      <b-col sm="12" md="10" lg="8" xl="6" class="mb-2">
        <b-input-group>
          <b-form-input
            v-model="searchText"
            size="md"
            class="search-input"
            placeholder="Buscar usuario."
          ></b-form-input>
          <b-input-group-append>
            <b-button
              v-on:click="changePageAndSearch()"
              size="md"
              class="search-b"
            >
              <font-awesome-icon icon="search" />
            </b-button>
          </b-input-group-append>
          <b-button
            v-b-modal.modal-xl
            v-on:click="get_new()"
            size="md"
            class="news-b ml-2"
            >Novedades</b-button
          >
        </b-input-group>
      </b-col>
    </b-row>

    <b-row align-h="center" class="mb-5">
      <b-table-simple class="products" striped responsive>
        <b-thead>
          <b-tr>
            <b-th>Usuario</b-th>
            <b-th>Rol</b-th>
            <b-th>campo3</b-th>
            <b-th>campo4</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(item, index) in items.results" :key="index">
            <b-td style="vertical-align: middle">
              <span>{{ item.username }}</span>
              <br />
              <span class="cursiva">{{ item.email }}</span>
            </b-td>
            <b-td style="vertical-align: middle" v-if="item.size == 1000"
              >1kg</b-td
            >
            <b-td style="vertical-align: middle" v-else>{{ item.size }}g</b-td>
            <b-td style="vertical-align: middle">{{ item.price }}€</b-td>
           
            <b-td style="vertical-align: middle">
              <router-link
                :to="{ name: 'estancoPorProducto', params: { id: item.id } }"
              >
                <b-button class="availability-button"
                  >Ver disponibilidad</b-button
                >
              </router-link>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-row>
  </b-container>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'Moderator',
  data() {
    return {
      items: [],
      searchText: '',
    };
  },
  methods: {
    retrieveUsers() {
      UserService.getAllUsers()
        .then((response) => {
          this.items = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveUsers();
    },
  },
  mounted() {
    this.retrieveUsers();
  },
};
</script>

<style scoped>
.container {
  text-align: center;
}

@media (max-width: 768px) {
  .search-button {
    text-align: center;
    padding-top: 2%;
    margin-left: 25%;
  }

  .products {
    text-align: center;
  }

  .div-buttons {
    text-align: center;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
}

.cursiva {
  font-style: italic;
  font-size: 14px;
}

.div-buttons {
  text-align: center;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5%;
}

.search-b {
  color: rgb(104, 104, 104) !important;
  background-color: rgb(245, 245, 245) !important;
  border: 1px solid #ced4da !important;
  border-radius: 0 4px 4px 0 !important;
}

.search-b:hover {
  color: rgb(104, 104, 104) !important;
  background-color: rgb(233, 233, 233) !important;
  border: 1px solid #ced4da !important;
  border-radius: 0 4px 4px 0 !important;
}

.search-b:focus {
  color: rgb(104, 104, 104) !important;
  background-color: rgb(233, 233, 233) !important;
  border: 1px solid #ced4da !important;
  border-radius: 0 4px 4px 0 !important;
  box-shadow: 0px 0px 1px 2px rgba(172, 172, 172, 0.432) !important;
}

.search-input {
  border-radius: 4px 0px 0px 4px !important;
  border-right: 0 !important;
}

.search-input:focus {
  border-radius: 4px 0px 0px 4px !important;
  border-top: 1px solid #ced4da !important;
  border-left: 1px solid #ced4da !important;
  border-bottom: 1px solid #ced4da !important;
  border-right: 0 !important;
  box-shadow: 0px 0px 1px 2px rgba(172, 172, 172, 0.432) !important;
}

.news-b {
  border: none !important;
  color: white !important;
  background: var(--mango) !important;
  border-radius: 4px 4px 4px 4px !important;
}

.news-b:hover {
  color: white !important;
  background: #ff7818 !important;
}

.availability-button {
  border: none;
  color: var(--mango) !important;
  background: white !important;
  margin: 0;
  border: 1px solid var(--mango) !important;
  border-radius: 4px 4px 4px 4px !important;
}

.availability-button:hover {
  color: white !important;
  background: var(--mango) !important;
  box-shadow: 0px 0px 1px 2px rgba(228, 160, 65, 0.432) !important;
}

.modal-ok-button {
  border: none;
  background: var(--mango) !important;
  color: white !important;
  border: 1px solid var(--mango) !important;
  border-radius: 4px 4px 4px 4px !important;
}

.modal-ok-button:hover {
  color: white !important;
  background: #ff8026 !important;
}
</style>
