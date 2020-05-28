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

    static getFormationbyId(id){
        return new Promise ((resolve,reject) => {
            axios.get('http://127.0.0.1:3000/formation/edit/'+id).then((res) => {
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
}

export default FormationService;