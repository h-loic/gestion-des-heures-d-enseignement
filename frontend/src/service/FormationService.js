/* eslint-disable no-async-promise-executor */
import axios from 'axios';

class FormationService {

    static getFormations(){
        return new Promise ((resolve,reject) => {
            axios.get('http://127.0.0.1:3000/formation').then((res) => {
                const data = res.data;
                console.log(data);
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }
}

export default FormationService;