<template>
    <div>
        <nav class="breadcrumb">
            <router-link class="breadcrumb-item" to="/">Accueil</router-link>
            <span class="breadcrumb-item active">ajouter-modifier projet</span>
        </nav>
        <div class="container">
            <div class="form-group">
                <label for="nom">Nom</label>
                <input type="text" id="nom" name="nom" class="form-control" v-model="nom">
            </div>
            <div class="form-group">
                <label for="date_debut">date de début</label>
                <input type="date" id="date_debut" name="date_debut" class="form-control" v-model="date_debut">
            </div>
            <div class="form-group">
                <label for="date_fin">date de fin</label>
                <input type="date" id="date_fin" name="date_fin" class="form-control" v-model="date_fin">
            </div>
            <label for="label">formations </label>
            <div class="form-check" id="label">
                <div v-for="formation in formations" v-bind:key="formation._id">
                    <br>
                    <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" name="formations" v-model="formations">
                        {{ formation.nom }}
                    </label>
                </div>
            </div>
            <input v-on:click="createProjet()" class="btn btn-primary mt-3" value="enregistrer">
        </div>
    </div>
</template>

<script>
    import router from "../../router/index"
    import ProjetService from "../../service/ProjetService";

    export default {
        name: 'Projet-new',
        data() {
            return {
                formations : '',
                nom : '',
                date_debut : '',
                date_fin : '',
            }
        },
        async created() {
            try {
                this.formations = await ProjetService.getFormations();
            } catch (err) {
                this.error = err.message;
            }
        },
        methods: {
            async createProjet(){
                await ProjetService.addProjet(this.nom,this.date_debut,this.date_fin,this.formations).then(res =>{
                    if (res.data.err === 1){
                        alert("erreur : " + res.data.data);
                    }else{
                        router.push("");
                    }
                })
            }
        }
    }

</script>