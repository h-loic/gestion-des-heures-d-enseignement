<template>
    <div>
        <nav class="breadcrumb">
            <router-link class="breadcrumb-item" to="/">Accueil</router-link>
            <span class="breadcrumb-item active">projet</span>
        </nav>
        <div class="container text-center">
            <div class="row justify-content-around mt-4 mb-4">
                <router-link :to="'/projet/edit/'+projet._id" type="button" class="btn btn-outline-info col-md-6 mt-1 mb-1">modifier projet</router-link>
                <router-link :to="'/projet/intervenant/'+projet._id" type="button" class="btn btn-outline-info col-md-6 mt-1 mb-1">gestion des intervenants</router-link>
            </div>
            <p class="h1 justify-content-start mt-3 mb-3">{{ projet.nom }}</p>

            <router-link :to="'/projet/bilan/' + projet._id" class="col-md-6 btn btn-success mt-1 mb-4">bilan</router-link>

            <div class="row" v-for="formation in projet.formations" v-bind:key="formation._id">
                <router-link :to="'decomposition/'+ projet._id + '/' + formation._id" class="btn btn-info col-12 mb-3">{{ formation.nom }}</router-link>
            </div>
            <br>
            <router-link :to="'/projet/delete/'+ this.projet._id" class="btn btn-danger">supprimer ce projet</router-link>
        </div>
    </div>
</template>

<script>
    import ProjetService from "../../service/ProjetService";

    export default {
        name: 'Projet',
        data() {
            return {
                projet : '',
            }
        },
        async created() {
            try {
                this.projet = await ProjetService.getProjetById(this.$route.params.idProjet);
            } catch (err) {
                this.error = err.message;
            }
        },
    }

</script>