import axios from "axios";
import {IComment} from "./type";

class CommentRequests{

    async getComments(itemId: string) {

        const response = await axios({method: 'get', url: `/api/comments/${itemId}`});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async deleteComment(commentId: string) {

        const response = await axios({method: 'delete', url: `/api/comments/${commentId}`});
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
}

export default new CommentRequests();