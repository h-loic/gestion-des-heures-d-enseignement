<template>
    <div>
        zdihzîd
        <nav class="breadcrumb">
            <router-link class="breadcrumb-item" to="/">Accueil</router-link>
            <router-link class="breadcrumb-item" to="/formation">Formation</router-link>
            <span class="breadcrumb-item active">ajouter-modifier</span>
        </nav>
        <div class="container">
            <div class="form-group">
                <label for="nom">Nom</label>
                <input type="text" id="nom" name="nom" v-model="nom" class="form-control">
            </div>
            <div class="form-group">
                <label for="surnom">Surnom</label>
                <input type="text" id="surnom" name="surnom" v-model="surnom" class="form-control">
            </div>
            <input v-on:click="createFormation" class="btn btn-primary" value="enregistrer">
        </div>
    </div>
</template>

<script>
    import FormationService from "../../service/FormationService";

    export default {
        name: 'Formation-new',
        data() {
            return {
                nom : '',
                surnom : ''
            }
        },
        methods: {
            async createFormation(){
                await FormationService.addFormation(this.nom,this.surnom);
            }
        }
    }

</script>