<template>
    <div>
        <nav class="breadcrumb">
            <router-link class="breadcrumb-item" to="/">Accueil</router-link>
            <router-link class="breadcrumb-item" to="/formation">Formation</router-link>
            <span class="breadcrumb-item active">ajouter-modifier-periode</span>
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
                <label for="duree">Duree</label>
                <input type="text" id="duree" name="duree" class="form-control" v-model="duree">
            </div>
            <div class="form-group">
                <label for="nombre_groupe_CM">Nombre groupe CM</label>
                <input type="text" id="nombre_groupe_CM" name="nombre_groupe_CM" class="form-control" v-model="nombre_groupe_CM">
            </div>
            <div class="form-group">
                <label for="nombre_groupe_TD">Nombre groupe TD</label>
                <input type="text" id="nombre_groupe_TD" name="nombre_groupe_TD" class="form-control" v-model="nombre_groupe_TD">
            </div>
            <div class="form-group">
                <label for="nombre_groupe_TP">Nombre groupe TP</label>
                <input type="text" id="nombre_groupe_TP" name="nombre_groupe_TP" class="form-control" v-model="nombre_groupe_TP">
            </div>
            <div class="form-group">
                <label for="nombre_groupe_Partiel">Nombre groupe partiel</label>
                <input type="text" id="nombre_groupe_Partiel" name="nombre_groupe_Partiel" class="form-control" v-model="nombre_groupe_Partiel">
            </div>
            <input v-on:click="createPeriode(formation._id)" class="btn btn-primary" value="enregistrer">
        </div>
    </div>
</template>

<script>
    import FormationService from "../../service/FormationService";
    import router from "../../router/index"

    export default {
        name: 'Formation-add-periode',
        data() {
            return {
                formation : '',
                nom : '',
                surnom : '',
                duree : '',
                nombre_groupe_CM : '',
                nombre_groupe_TD : '',
                nombre_groupe_TP : '',
                nombre_groupe_Partiel : ''
            }
        },
        async created() {
            try {
                this.formation = await FormationService.getFormationbyId(this.$route.params.idFormation);
            } catch (err) {
                this.error = err.message;
            }
        },
        methods: {
            async createPeriode(idFormation){
                await FormationService.addPeriode(this.nom,this.surnom,this.duree,this.nombre_groupe_CM,
                    this.nombre_groupe_TD,this.nombre_groupe_TP,this.nombre_groupe_Partiel,idFormation).then(res =>{
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