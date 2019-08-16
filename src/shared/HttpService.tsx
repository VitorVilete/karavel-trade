import axios from 'axios';
import config from '../shared/Config';

export class HttpService {

    public static get(endpoint:string){
        axios.get(`${config.API_ADDRESS + endpoint}`).catch(this.errorHandler);
    }
    
    public static put(endpoint:string, data:any){
        axios.put(`${config.API_ADDRESS + endpoint}`,data).catch(this.errorHandler);
    }

    public static post(endpoint:string, data:any){
        axios.post(`${config.API_ADDRESS + endpoint}`,data).catch(this.errorHandler);
    }

    public static patch(endpoint:string, data:any){
        axios.patch(`${config.API_ADDRESS + endpoint}`,data).catch(this.errorHandler);
    }

    public static delete(endpoint:string, data:any){
        axios.delete(`${config.API_ADDRESS + endpoint}`,data).catch(this.errorHandler);
    }

    //Solution taken from
    //https://stackoverflow.com/questions/49967779/axios-handling-errors
    static errorHandler(error:any){
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
    }
}