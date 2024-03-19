import axios from "axios";
import {ILike, ILikeRequests} from "./type";

class LikeRequests implements ILikeRequests {
    async getLikes(itemId: string) {

        const response = await axios({method: 'get', url: `/api/likes/${itemId}`});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async addLike(like: ILike) {

        const response = await axios({method: 'post', url: '/api/likes', data: {like: {...like}}});
        return {
            status: response.status,
            data: undefined,
        }
    }

    async deleteLike(likeId: string) {

        const response = await axios({method: 'delete', url: `/api/likes`, data: {likeId: likeId}});
        return {
            status: response.status,
            data: undefined,
        }

    }
}

export default new LikeRequests();