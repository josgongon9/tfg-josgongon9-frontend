<template>
  <b-container>
    <b-row align-h="center" class="mt-5 mb-5">
      <b-col cols="12">
        <b-card
          class="text-center mx-auto"
          align-self="center"
          style="max-width: 400px"
        >
          <h3>Modificar mi usuario:</h3>
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
                  :disabled="isAdmin != true"
                  min="1"
                  max="100"
                ></b-form-spinbutton>
              </b-form-group>

              <div>
                <b-row align-h="center">
                  <div>
                    <b-button type="submit" class="btn btn-success mt-2"
                      ><font-awesome-icon icon="save" /> Guardar Cambios </b-button
                    >&nbsp;
                    <b-button
                      class="btn btn-danger mt-2"
                      v-on:click="deleteUser()"
                      ><font-awesome-icon icon="trash-alt" /> Borrar
                      Usuario</b-button
                    >
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
  </b-container>
</template>

<script>
import UserService from '../services/user.service';
export default {
  name: 'viewUser',
  data() {
    return {
      errores: [],
      currentUser: [],
      show: true,
      isAdmin: false,
      isMod: false,
      roles: [],
    };
  },

  mounted() {
    this.getUser(this.$route.params.id);
    this.getUserRol();
  },
  methods: {
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
    onSubmit() {
      this.errores.pop();
      this.currentUser.roles = this.roles;
      UserService.update(this.currentUser.id, this.currentUser)
        .then((response) => {
          alert('Datos actualizados con éxito.');
        })
        .catch((e) => {
          this.errores.push(e);
        });
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
          'Está a punto de eliminar su cuenta. Este proceso no tiene marcha atrás,¿Seguro que desea continuar? '
        )
      ) {
        UserService.delete(this.currentUser.id)
          .then((response) => {
            if (response.status == 204) {
              alert(
                'Se ha eliminado su cuenta satisfactoriamente. será redirigido a la vista de inicio'
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