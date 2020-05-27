<template>
  <div>
    <div id="test">
      <nav class="breadcrumb">
        <router-link class="breadcrumb-item" to="/">Accueil</router-link>
        <span class="breadcrumb-item active">formation</span>
      </nav>
      <div class="container">
        <div class="row justify-content-around mt-4 mb-4">
          <router-link to="/formation/new" type="button" class="btn btn-outline-info col-md-5 align-content-center">ajouter une formation</router-link>
        </div>
        <div class="row">
          <div class="col-md-12">
            <h4>liste des formations</h4>
            <table class="table">
              <thead class="thead-dark">
              <tr>
                <th scope="col">surnom</th>
                <th scope="col">nom</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col">actions</th>
              </tr>
              </thead>
              <div v-for="formation in formations" v-bind:key="formation._id">
                <tr class="table-secondary">
                  <td scope="row">{{ formation.surnom}}</td>
                  <td>{{ formation.nom }}</td>
                  <td></td>
                  <td></td>
                  <td>
                    <router-link :to="'formation/edit/'+formation._id"><svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>
                      <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>
                    </svg></router-link>
                    <router-link :to="'formation/delete/'+ formation._id" class="text-danger" style="margin-left: auto;margin-right: auto"><svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
                    </svg>
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>nom (surnom)</td>
                  <td>durée en semaine</td>
                  <td>nombre groupe CM/TD/TP/Partiel</td>
                  <td>actions</td>
                </tr>
                <div v-for="formation_periode in formation.periode" v-bind:key="formation_periode._id">
                  <tr>
                    <td></td>
                    <td>{{ formation_periode.nom_periode }}</td>
                    <td>{{ formation_periode.duree }}</td>
                    <td>{{ formation_periode.nombre_groupe_CM }} / {{ formation_periode.nombre_groupe_TD }} / {{ formation_periode.nombre_groupe_TP }} / {{ formation_periode.nombre_groupe_Partiel }}</td>
                    <td>
                      <router-link :to="'/formation/edit-periode/' + formation._id +'/'+formation_periode._id"><svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>
                        <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>
                      </svg></router-link>
                      <router-link :to="'formation/delete-periode/'+formation._id +'/'+formation_periode._id " class="text-danger" style="margin-left: auto;margin-right: auto"><svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
                      </svg>
                      </router-link>
                    </td>
                  </tr>
                </div>
                <tr>
                  <td colspan="5"><router-link :to="'formation/add-periode/'+formation._id"><svg class="bi bi-plus-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/>
                    <path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd"/>
                    <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>
                  </svg> ajouter une période à la formation {{ formation.surnom}}</router-link></td>
                </tr>
              </div>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FormationService from "../../service/FormationService";

  export default {
    name: 'Formation',
    data() {
      return {
        formations : '',
        error : ''
      }
    },
    async created() {
      try {
        this.formations = await FormationService.getFormations();
      } catch (err) {
        this.error = err.message;
      }
    }
  }
</script>
