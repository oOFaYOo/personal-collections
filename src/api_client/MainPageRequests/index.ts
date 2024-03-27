import axios from "axios";
import {IMainPageRequests} from "./type";

class MainPageRequests implements IMainPageRequests {
    async getMain() {

        const response = await axios({
            method: 'get',
            url: '/api/main'
        });
        return {
            status: response.status,
            data: response.data,
        }
    }
}

export default new MainPageRequests();