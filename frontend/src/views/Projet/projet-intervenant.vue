<template>
    <div>
        <nav class="breadcrumb">
            <router-link class="breadcrumb-item" to="/">Accueil</router-link>
            <router-link class="breadcrumb-item" :to="'/projet/'+projet._id">Projet {{ projet.nom}}</router-link>
            <span class="breadcrumb-item active">Intervenants</span>
        </nav>
        <div class="container">
            <div class="row justify-content-around mt-4 mb-4">
                <b-dropdown text="Sélectionner un intervenant">
                    <b-dropdown-item
                                     v-for="enseignant in enseignants_non_intervenants" v-bind:key="enseignant._id" v-on:click="addIntervenant(enseignant._id)">
                        {{ enseignant.nom}} {{ enseignant.prenom }}
                    </b-dropdown-item>
                </b-dropdown>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <h4>liste des intervenants</h4>
                    <table class="table">
                        <thead class="thead-dark">
                        <tr>
                            <th scope="col">surnom</th>
                            <th scope="col">nom</th>
                            <th scope="col">statut</th>
                            <th scope="col">heure à faire</th>
                            <th scope="col">heure sup possible</th>
                            <th scope="col">heure min max</th>
                            <th scope="col">actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="intervenant in projet.intervenants" v-bind:key="intervenant._id">
                            <td scope="row">{{ intervenant.enseignant.surnom}}</td>
                            <td>{{ intervenant.enseignant.nom }}</td>
                            <td>{{ intervenant.enseignant.statut.nom }}</td>
                            <td>{{ intervenant.enseignant.statut.heure_normal_min }}-{{ intervenant.enseignant.statut.heure_normal_max }}</td>
                            <td>{{ intervenant.enseignant.statut.heure_supp_min }}-{{ intervenant.enseignant.statut.heure_supp_max }}</td>
                            <td>{{ intervenant.nombre_heure_minimal }}-{{ intervenant.nombre_heure_maximal }}</td>
                            <td>
                                <router-link :to="'/projet/intervenant/edit/'+projet._id+'/'+intervenant._id"><svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>
                                    <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>
                                </svg></router-link>
                                <a v-on:click="deleteIntervenant(intervenant._id)" class="text-danger" style="margin-left: auto;margin-right: auto"><svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
                                </svg>
                                </a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ProjetService from "../../service/ProjetService";

    export default {
        name: 'Projet-intervenant',
        data() {
            return {
                projet : '',
                enseignants : '',
                enseignants_non_intervenants : []
            }
        },
        async created() {
            try {
                let get = await ProjetService.getProjetsEtIntervenant(this.$route.params.idProjet);
                this.projet = get.projet;
                this.enseignants = get.enseignants;
                this.enseignants_non_intervenants = [];
                let est_contenu = false;
                for (let i = 0; i < this.enseignants.length; i++){
                    est_contenu = false;
                    for (let j = 0; j < this.projet.intervenants.length; j++){
                        if (this.projet.intervenants[j].enseignant._id === this.enseignants[i]._id){
                            est_contenu = true;
                        }
                    }
                    if (!est_contenu){
                        this.enseignants_non_intervenants.push(this.enseignants[i]);
                    }
                }
            } catch (err) {
                this.error = err.message;
            }
        },
        methods: {
            async addIntervenant(idEnseignant){
                await ProjetService.addIntervenant(this.projet._id,idEnseignant).then(async res => {
                    if (res.data.err === 1) {
                        alert("erreur : " + res.data.data);
                    } else {
                        let get = await ProjetService.getProjetsEtIntervenant(this.$route.params.idProjet);
                        this.projet = get.projet;
                        this.enseignants = get.enseignants;
                        this.enseignants_non_intervenants = [];
                        let est_contenu = false;
                        for (let i = 0; i < this.enseignants.length; i++){
                            est_contenu = false;
                            for (let j = 0; j < this.projet.intervenants.length; j++){
                                if (this.projet.intervenants[j].enseignant._id === this.enseignants[i]._id){
                                    est_contenu = true;
                                }
                            }
                            if (!est_contenu){
                                this.enseignants_non_intervenants.push(this.enseignants[i]);
                            }
                        }
                    }
                });
            },
            async deleteIntervenant(idIntervenant){
                await ProjetService.deleteIntervenant(this.projet._id,idIntervenant).then( async res =>{
                    if (res.data.err === 1){
                        alert("erreur : " + res.data.data);
                    } else{
                        let get = await ProjetService.getProjetsEtIntervenant(this.$route.params.idProjet);
                        this.projet = get.projet;
                        this.enseignants = get.enseignants;
                        this.enseignants_non_intervenants = [];
                        let est_contenu = false;
                        for (let i = 0; i < this.enseignants.length; i++){
                            est_contenu = false;
                            for (let j = 0; j < this.projet.intervenants.length; j++){
                                if (this.projet.intervenants[j].enseignant._id === this.enseignants[i]._id){
                                    est_contenu = true;
                                }
                            }
                            if (!est_contenu){
                                this.enseignants_non_intervenants.push(this.enseignants[i]);
                            }
                        }
                    }
                })
            }
        }
    }

</script>