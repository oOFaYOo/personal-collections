import axios from "axios";
import {IMainPageRequests} from "./type";

class MainPageRequests implements IMainPageRequests {
    async getAll() {

        const response = await axios({
            method: 'get',
            url: '/api/main'
        });
        return {
            status: response.status,
            data: response.data,
        }
    }
    // async getAllTags() {
    //
    //     const response = await axios({
    //         method: 'get',
    //         url: '/api/main/tags'
    //     });
    //     return {
    //         status: response.status,
    //         data: response.data,
    //     }
    // }
    //
    // async getBiggestCollections() {
    //
    //     const response = await axios(
    //         {
    //             method: 'get',
    //             url: '/api/main/collections'
    //         });
    //     return {
    //         status: response.status,
    //         data: response.data,
    //     }
    // }
    //
    // async getLastItems() {
    //
    //     const response = await axios({
    //         method: 'get',
    //         url: '/api/main/items'
    //     });
    //     return {
    //         status: response.status,
    //         data: response.data,
    //     }
    // }
    //
    // async getRandomUsers() {
    //
    //     const response = await axios({
    //         method: 'get',
    //         url: '/api/main/users'
    //     });
    //     return {
    //         status: response.status,
    //         data: response.data,
    //     }
    // }
}

export default new MainPageRequests();