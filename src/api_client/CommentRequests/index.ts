import axios from "axios";
import {IComment} from "./type";
import {ILike} from "../LikeRequests/type";

class CommentRequests{

    async getComments(itemId: string) {

        const response = await axios({method: 'get', url: `/api/comments/${itemId}`});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async deleteComment(commentId: string) {

        const response = await axios({method: 'delete', url: `/api/comments/${commentId}`, data:{commentId:commentId}});
        return {
            status: response.status,
            data: undefined,
        }
    }

    async addComment(comment: IComment) {

        const response = await axios({method: 'post', url: `/api/comments`, data: {comment: {...comment}}});
        return {
            status: response.status,
            data: undefined,
        }
    }

//like
    async getLikes(itemId:string) {

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

        const response = await axios({method: 'delete', url: `/api/likes`, data: {likeId:likeId}});
        return {
            status: response.status,
            data: undefined,
        }

    }

    async getSearchResult(searchValue:string) {
        const response = await axios({method: 'get', url: `/api/search?value=${searchValue}`});
        return {
            status: response.status,
            data: response.data,
        }
    }
}

export default new CommentRequests();