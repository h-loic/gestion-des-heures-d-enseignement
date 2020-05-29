<template>
    <div>
        <nav class="breadcrumb">
            <router-link class="breadcrumb-item" to="/">Accueil</router-link>
            <router-link class="breadcrumb-item" to="/enseignant">Enseignant</router-link>
            <router-link class="breadcrumb-item" to="/enseignant/statut">Statut</router-link>
            <span class="breadcrumb-item active">ajouter-modifier</span>
        </nav>
        <div class="container">
            <div class="form-group">
                <label for="nom">Nom</label>
                <input type="text" id="nom" name="nom" class="form-control" v-model="nom">
            </div>
            <div class="form-group">
                <label for="surnom">Surnom</label>
                <input type="text" id="surnom" name="surnom" class="form-control" v-model="surnom">
            </div>
            <div class="form-group">
                <label for="heure_normal_min">nombre d'heure normal minimal</label>
                <input type="text" id="heure_normal_min" name="heure_normal_min" class="form-control" v-model="heure_normal_min">
            </div>
            <div class="form-group">
                <label for="heure_normal_max">nombre d'heure normal maximal</label>
                <input type="text" id="heure_normal_max" name="heure_normal_max" class="form-control" v-model="heure_normal_max">
            </div>
            <div class="form-group">
                <label for="heure_supp_min">nombre d'heure sup. minimal</label>
                <input type="text" id="heure_supp_min" name="heure_supp_min" class="form-control" v-model="heure_supp_min">
            </div>
            <div class="form-group">
                <label for="heure_supp_max">nombre d'heure sup. maximal</label>
                <input type="text" id="heure_supp_max" name="heure_supp_max" class="form-control" v-model="heure_supp_max">
            </div>
            <input v-on:click="editStatut()" class="btn btn-primary" value="enregistrer">
        </div>
    </div>
</template>

<script>
    import router from "../../router/index"
    import EnseignantService from "../../service/EnseignantService";

    export default {
        name: 'Statut-edit',
        data() {
            return {
                statut : '',
                nom : '',
                surnom : '',
                heure_normal_min : '',
                heure_normal_max : '',
                heure_supp_min : '',
                heure_supp_max : '',
            }
        },
        async created() {
            try {
                this.statut = await EnseignantService.getStatutbyId(this.$route.params.idStatut);
                this.nom = this.statut.nom;
                this.surnom = this.statut.surnom;
                this.heure_normal_min = this.statut.heure_normal_min;
                this.heure_normal_max = this.statut.heure_normal_max;
                this.heure_supp_min = this.statut.heure_supp_min;
                this.heure_supp_max = this.statut.heure_supp_max;
            } catch (err) {
                this.error = err.message;
            }
        },
        methods: {
            async editStatut(){
                await EnseignantService.editStatut(this.nom,this.surnom,this.heure_normal_min,this.heure_normal_max,
                    this.heure_supp_min,this.heure_supp_max,this.statut._id).then(res =>{
                    if (res.data.err === 1){
                        alert("erreur : " + res.data.data);
                    }else{
                        router.push("/enseignant/statut");
                    }
                })
            }
        }
    }

</script>