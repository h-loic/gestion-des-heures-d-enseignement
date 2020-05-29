/* eslint-disable no-async-promise-executor */
import axios from 'axios';


class ProjetService {

    static getProjets(){
        return new Promise ((resolve,reject) => {
            axios.get('http://127.0.0.1:3000/accueil').then((res) => {
                const data = res.data;
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }

    static getFormations(){
        return new Promise ((resolve,reject) => {
            axios.get('http://127.0.0.1:3000/projet/getFormations').then((res) => {
                const data = res.data;
                resolve(data);
            })
                .catch((err)=> {
                    reject(err);
                })
        });
    }

    static addProjet(nom,date_debut,date_fin,formations){
        return axios.post('http://127.0.0.1:3000/projet',{nom : nom, date_debut : date_debut, date_fin : date_fin, formations : formations });
    }

    static getProjetById(id){
        return new Promise ((resolve,reject) => {
            axios.get('http://127.0.0.1:3000/projet/getProjet/'+id).then((res) => {
                const data = res.data;
                resolve(data);
            })
                .catch((err)=> {
                    reject(err);
                })
        });
    }

    static deleteProjet(idProjet){
        return axios.get('http://127.0.0.1:3000/projet/delete/'+idProjet);
    }
}

export default ProjetService;