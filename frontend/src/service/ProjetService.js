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
}

export default ProjetService;