<template>
    <div>
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
                <input type="text" id="surnom" name="surnom" v-model="surnom" class="form-control">{{ formation.nom }}
            </div>
            <input v-on:click="editFormation" class="btn btn-primary" value="enregistrer">
        </div>
    </div>
</template>

<script>
    import FormationService from "../../service/FormationService";
    import router from "../../router/index"

    export default {
        name: 'Formation-new',
        data() {
            return {
                formation : '',
                nom : '',
                surnom : ''
            }
        },
        async created() {
            try {
                this.formation = await FormationService.getFormationbyId(this.$route.params.idFormation);
                this.nom = this.formation.nom;
                this.surnom = this.formation.surnom;
            } catch (err) {
                this.error = err.message;
            }
        },
        methods: {
            async editFormation(){
                await FormationService.editFormation(this.nom,this.surnom,this.formation._id).then(res =>{
                    if (res.data.err === 1){
                        alert("erreur : " + res.data.data);
                    }else{
                        router.push("/formation");
                    }
                })
            }
        }
    }

</script>