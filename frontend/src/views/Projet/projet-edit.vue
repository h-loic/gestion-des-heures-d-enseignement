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

            <div class="form-group form-check" v-for="formation in formations" v-bind:key="formation._id">
                <label class="form-check-label" :for="formation._id">
                    <input type="checkbox"  v-model="formations_select" :id="formation._id" :value="formation._id"
                    >{{  formation.nom}}
                </label>
            </div>
            <input v-on:click="editProjet()" class="btn btn-primary mt-3" value="enregistrer">
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
                formations_select : [],
                projet : '',
                formations : '',
                nom : '',
                date_debut : '',
                date_fin : ''
            }
        },
        async created() {
            try {
                this.formations = await ProjetService.getFormations();
                this.projet = await ProjetService.getProjetById(this.$route.params.idProjet);
                this.nom = this.projet.nom;
                this.date_debut = this.projet.date_debut.split('T')[0];
                this.date_fin = this.projet.date_fin.split('T')[0];
            } catch (err) {
                this.error = err.message;
            }
        },
        methods: {
            async editProjet(){
                await ProjetService.editProjet(this.nom,this.date_debut,this.date_fin,this.formations_select,this.$route.params.idProjet).then( res =>{
                    if (res.data.err === 1){
                        alert("erreur : " + res.data.data);
                    }else{
                        router.push("/projet/"+ this.projet._id);
                    }
                })
            }
        }
    }

</script>