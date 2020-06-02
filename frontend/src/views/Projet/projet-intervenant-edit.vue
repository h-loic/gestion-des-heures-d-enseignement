<template>
    <div>
        <nav class="breadcrumb">
            <router-link class="breadcrumb-item" to="/">Accueil</router-link>
            <router-link class="breadcrumb-item" :to="'/projet/' + projet._id">Projet {{ projet.nom}}</router-link>
            <router-link class="breadcrumb-item" :to="'/projet/intervenant/' + projet._id">intervenants</router-link>
            <span class="breadcrumb-item active">modifier</span>
        </nav>

        <div class="container">
            <div class="form-group">
                <label for="nombre_heure_minimal">Nombre d'heure minimal</label>
                <input type="text" id="nombre_heure_minimal" name="nombre_heure_minimal" class="form-control" v-model="nombre_heure_minimal">
            </div>
            <div class="form-group">
                <label for="nombre_heure_maximal">Nombre d'heure maximal</label>
                <input type="text" id="nombre_heure_maximal" name="nombre_heure_maximal" class="form-control" v-model="nombre_heure_maximal">
            </div>
            <input v-on:click="editIntervenant()" class="btn btn-primary mt-3" value="enregistrer">
        </div>
    </div>
</template>

<script>
    import ProjetService from "../../service/ProjetService";
    import router from "../../router";

    export default {
        name: 'Projet-intervenant-edit',
        data() {
            return {
                projet : '',
                intervenant : '',
                nombre_heure_minimal : '',
                nombre_heure_maximal : ''
            }
        },
        async created() {
            try {
                let get = await ProjetService.getIntervenantProjet(this.$route.params.idProjet,this.$route.params.idIntervenant);
                this.intervenant = get.intervenant;
                this.projet = get.projet;
                this.nombre_heure_minimal = this.intervenant.nombre_heure_minimal;
                this.nombre_heure_maximal = this.intervenant.nombre_heure_maximal;
            } catch (err) {
                this.error = err.message;
            }
        },
        methods: {
            async editIntervenant(){
                await ProjetService.editIntervenant(this.projet._id,this.intervenant._id,this.nombre_heure_minimal,this.nombre_heure_maximal).then(async res => {
                    console.log(res);
                    if (res.data.err === 1) {
                        alert("erreur : " + res.data.data);
                    } else {
                        router.push("/projet/intervenant/"+ this.$route.params.idProjet);
                    }
                });
            },
        }
    }

</script>