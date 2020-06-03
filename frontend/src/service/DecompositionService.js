/* eslint-disable no-async-promise-executor */
import axios from 'axios';


class ProjetService {

    static getDecomposition(idProjet, idFormation){
        return new Promise ((resolve,reject) => {
            axios.get('http://127.0.0.1:3000/projet/decomposition/'+ idProjet +'/'+idFormation).then((res) => {
                const data = res.data;
                resolve(data);
            })
                .catch((err)=> {
                    reject(err);
                })
        });
    }
}

export default ProjetService;