<template>
    <div>
        <nav class="breadcrumb">
            <router-link class="breadcrumb-item" to="/">Accueil</router-link>
            <router-link class="breadcrumb-item" to="/enseignant">Enseignant</router-link>
            <span class="breadcrumb-item active">ajouter-modifier</span>
        </nav>
        <div class="container">
            <div class="form-group">
                <label for="nom">Nom</label>
                <input type="text" id="nom" name="nom" class="form-control" v-model="nom">
            </div>
            <div class="form-group">
                <label for="prenom">Prénom</label>
                <input type="text" id="prenom" name="prenom" class="form-control" v-model="prenom">
            </div>
            <div class="form-group">
                <label for="prenom">Surnom</label>
                <input type="text" id="surnom" name="surnom" class="form-control" v-model="surnom">
            </div>
            <div class="form-group">
                <label for="email">email</label>
                <input type="text" id="email" name="email" class="form-control" v-model="email">
            </div>

            <label for="statut">Statut </label>
            <select v-model="statut" id="statut" class="form-control">
                <option disabled value="">Choisissez</option>
                <option v-for="statut in statuts" v-bind:key="statut._id" :value="statut._id">{{ statut.nom }}</option>
            </select>
            <input v-on:click="editEnseignant()" class="btn btn-primary mt-3" value="enregistrer">
        </div>
    </div>
</template>

<script>
    import router from "../../router/index"
    import EnseignantService from "../../service/EnseignantService";

    export default {
        name: 'Enseignant-edit',
        data() {
            return {
                enseignant : '',
                statuts : '',
                nom : '',
                prenom : '',
                surnom : '',
                email : '',
                statut : ''
            }
        },
        async created() {
            try {
                this.statuts = await EnseignantService.getStatuts();
                this.enseignant = await EnseignantService.getEnseignantById(this.$route.params.idEnseignant);
                this.nom = this.enseignant.nom;
                this.prenom = this.enseignant.prenom;
                this.surnom = this.enseignant.surnom;
                this.email = this.enseignant.email;
                this.statut = this.enseignant.statut;
            } catch (err) {
                this.error = err.message;
            }
        },
        methods: {
            async editEnseignant(){
                await EnseignantService.editEnseignant(this.nom,this.prenom,this.surnom,this.email,
                    this.statut,this.enseignant._id).then(res =>{
                    if (res.data.err === 1){
                        alert("erreur : " + res.data.data);
                    }else{
                        router.push("/enseignant");
                    }
                })
            }
        }
    }

</script>