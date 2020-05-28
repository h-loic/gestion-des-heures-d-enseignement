/* eslint-disable no-async-promise-executor */
import axios from 'axios';

class FormationService {

    static getFormations(){
        return new Promise ((resolve,reject) => {
            axios.get('http://127.0.0.1:3000/formation').then((res) => {
                const data = res.data;
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }

    static addFormation(nom,surnom){
        return axios.post('http://127.0.0.1:3000/formation',{nom : nom, surnom : surnom });
    }

    static addPeriode(nom,surnom,duree,nombre_groupe_CM,nombre_groupe_TD,nombre_groupe_TP,nombre_groupe_Partiel,idFormation){
        return axios.post('http://127.0.0.1:3000/formation/add-periode/' + idFormation,
            {nom : nom, surnom : surnom, duree : duree,nombre_groupe_CM :nombre_groupe_CM, nombre_groupe_TD : nombre_groupe_TD,
                nombre_groupe_TP :nombre_groupe_TP , nombre_groupe_Partiel : nombre_groupe_Partiel});
    }

    static getFormationbyId(id){
        return new Promise ((resolve,reject) => {
            axios.get('http://127.0.0.1:3000/formation/getFormation/'+id).then((res) => {
                const data = res.data;
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }

    static editFormation(nom,surnom,id){
        return axios.post('http://127.0.0.1:3000/formation/'+id,{nom : nom, surnom : surnom });
    }

    static deleteFormation(nom,surnom,id){
        return axios.get('http://127.0.0.1:3000/formation/delete/'+id);
    }
}

export default FormationService;