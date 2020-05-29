import axios from 'axios';

class EnseignantService {

    static getEnseignants(){
        return new Promise ((resolve,reject) => {
            axios.get('http://127.0.0.1:3000/enseignant').then((res) => {
                const data = res.data;
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }

    static getStatuts(){
        return new Promise ((resolve,reject) => {
            axios.get('http://127.0.0.1:3000/enseignant/statut').then((res) => {
                const data = res.data;
                resolve(data);
            })
                .catch((err)=> {
                    reject(err);
                })
        });
    }

    static getEnseignantById(idEnseignant){
        return new Promise ((resolve,reject) => {
            axios.get('http://127.0.0.1:3000/enseignant/getEnseignant/'+idEnseignant).then((res) => {
                const data = res.data;
                resolve(data);
            })
                .catch((err)=> {
                    reject(err);
                })
        });
    }

    static getStatutbyId(id){
        return new Promise ((resolve,reject) => {
            axios.get('http://127.0.0.1:3000/enseignant/getStatut/'+id).then((res) => {
                const data = res.data;
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }

    static addStatut(nom,surnom,heure_normal_min,heure_normal_max,heure_supp_min,heure_supp_max){
        return axios.post('http://127.0.0.1:3000/enseignant/statut',{nom : nom, surnom : surnom,heure_normal_min : heure_normal_min,
            heure_normal_max : heure_normal_max,heure_supp_min : heure_supp_min,heure_supp_max: heure_supp_max });
    }

    static addEnseignant(nom,prenom,surnom,email,statut){
        return axios.post('http://127.0.0.1:3000/enseignant',{nom : nom,prenom : prenom, surnom : surnom,
        email : email, statut : statut});
    }

    static editStatut(nom,surnom,heure_normal_min,heure_normal_max,heure_supp_min,heure_supp_max,idStatut){
        return axios.post('http://127.0.0.1:3000/enseignant/statut/'+idStatut,{nom : nom, surnom : surnom,heure_normal_min : heure_normal_min,
            heure_normal_max : heure_normal_max,heure_supp_min : heure_supp_min,heure_supp_max: heure_supp_max });
    }

    static editEnseignant(nom,prenom,surnom,email,statut, idEnseignant){
        return axios.post('http://127.0.0.1:3000/enseignant/'+ idEnseignant ,{nom : nom,prenom : prenom, surnom : surnom,
            email : email, statut : statut});
    }

    static deleteStatut(idStatut){
        return axios.get('http://127.0.0.1:3000/enseignant/statut/delete/'+idStatut);
    }

}

export default EnseignantService;