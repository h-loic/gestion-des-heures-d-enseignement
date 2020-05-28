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
}

export default EnseignantService;