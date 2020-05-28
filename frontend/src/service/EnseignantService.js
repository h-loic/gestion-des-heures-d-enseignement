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

    static addStatut(nom,surnom,heure_normal_min,heure_normal_max,heure_supp_min,heure_supp_max){
        return axios.post('http://127.0.0.1:3000/enseignant/statut',{nom : nom, surnom : surnom,heure_normal_min : heure_normal_min,
            heure_normal_max : heure_normal_max,heure_supp_min : heure_supp_min,heure_supp_max: heure_supp_max });
    }
}

export default EnseignantService;