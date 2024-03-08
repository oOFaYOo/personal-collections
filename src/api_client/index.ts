import {
    IApiClient,
    ICollection,
    ICollectionPatch,
    IComment,
    IItem,
    IItemPatch,
    IUserPatch
} from "./type";

const axios = require('axios');

class ApiClient implements IApiClient {
    async signUp(name: string, mail: string, password: string) {

        const response = await axios({
            method: 'post',
            url: '/api/signup',
            data:{
                name:name,
                mail:mail,
                password:password
            }
        });
        return {
            status: response.status,
            data: undefined,
        }
    }

    async signIn(mail: string, password: string) {

        const response = await axios({
            method: 'post',
            url: '/api/signin',
            data:{
                mail:mail,
                password:password
            }
        });
        return {
            status: response.status,
            data: undefined,
        }
    }

    async getCurrentUser() {

        const response = await axios({
            method: 'get',
            url: `/api/users/me`
        });
        return {
            status: response.status,
            data: response.data,
        }
    }
//about user
    async getUsers() {

        const response = await axios({
            method: 'get',
            url: '/api/users'
        });
        return {
            status: response.status,
            data: response.data,
        }
    }

    async getUser(id: string) {

        const response = await axios({
            method: 'get',
            url: `/api/users/${id}`
        });
        return {
            status: response.status,
            data: response.data,
        }
    }

    async deleteUser(id: string) {

        const response = await axios({
            method: 'delete',
            url: `/api/users/${id}`,
        });
        return {
            status: response.status,
            data: undefined,
        }
    }

    async blockUser(id: string) {

        const response = await axios({
            method: 'post',
            url: `/api/users/${id}/block`,
            });
        return {
            status: response.status,
            data: undefined,
        }
    }

    async unblockUser(id: string) {

        const response = await axios({
            method: 'post',
            url: `/api/users/${id}/unblock`,
            });
        return {
            status: response.status,
            data: undefined,
        }
    }

    async changeAccessLevel(id: string, isAdmin: boolean) {

        const response = await axios({method: 'post', url: '', data: {isAdmin:isAdmin}});
        return {
            status: response.status,
            data: undefined,
        }
    }

    async uploadUserPicture(id: string) {

        const response = await axios({
            method: 'post',
            url: `/api/users/${id}/picture`,
            data: {}});
        return {
            status: response.status,
            data: undefined,
        }
    }

    async editUserData(id: string, user: IUserPatch) {

        const response = await axios({
            method: 'patch',
            url: `/api/users/${id}/edit`,
            data: {}});
        return {
            status: response.status,
            data: undefined,
        }
    }

//for main page
    async getAllTags() {

        const response = await axios({
            method: 'get',
            url: '/api/main/tags'
        });
        return {
            status: response.status,
            data: response.data,
        }
    }

    async getBiggestCollections() {

        const response = await axios(
            {method: 'get',
                url: '/api/main/collections'
            });
        return {
            status: response.status,
            data: response.data,
        }
    }

    async getLastItems() {

        const response = await axios({
            method: 'get',
            url: '/api/main/items'
        });
        return {
            status: response.status,
            data: response.data,
        }
    }

    async getRandomUsers() {

        const response = await axios({
            method: 'get',
            url: '/api/main/users'
        });
        return {
            status: response.status,
            data: response.data,
        }
    }

//collections
    async getCollections() {

        const response = await axios({method: 'get', url: '/api/collections'});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async getCollection(id: string) {

        const response = await axios({method: 'get', url: `/api/collections/${id}`});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async deleteCollection(id: string) {

        const response = await axios({method: 'delete', url: `/api/collections/${id}`});
        return {
            status: response.status,
            data: undefined,
        }
    }

    async addCollection(id: string, collection: ICollection) {

        const response = await axios({method: 'post', url: `/api/collections/create`, data: {id:id, collection:collection}});
        return {
            status: response.status,
            data: undefined,
        }
    }

    async uploadCollectionPicture(id: string) {

        const response = await axios({method: 'post', url: `/api/collections/${id}/picture`, data: {}});
        return {
            status: response.status,
            data: undefined,
        }
    }

    async editCollectionData(id: string, collection: ICollectionPatch) {

        const response = await axios({method: 'patch', url: `/api/collections/${id}`, data: {collection:collection}});
        return {
            status: response.status,
            data: undefined,
        }
    }

//items
    async getItems() {

        const response = await axios({method: 'get', url: '/api/items'});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async getItem(id: string) {

        const response = await axios({method: 'get', url: `/api/items/${id}`});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async deleteItem(id: string) {

        const response = await axios({method: 'delete', url: `/api/items/${id}`});
        return {
            status: response.status,
            data: undefined,
        }
    }

    async addItem(id: string, item: IItem) {

        const response = await axios({method: 'post', url: `/api/items`, data: {id:id, item:item}});
        return {
            status: response.status,
            data: undefined,
        }
    }

    async uploadItemPicture(id: string) {

        const response = await axios({method: 'post', url: `/api/items/${id}`, data: {}});
        return {
            status: response.status,
            data: undefined,
        }
    }

    async editItemData(id: string, item: IItemPatch) {

        const response = await axios({method: 'patch', url: `/api/items/${id}`, data: {item:item}});
        return {
            status: response.status,
            data: undefined,
        }
    }

//comment
    async getComments(id: string) {

        const response = await axios({method: 'get', url: `/api/comments`, data:{id:id}});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async deleteComment(id: string) {

        const response = await axios({method: 'delete', url: `/api/comments/${id}`});
        return {
            status: response.status,
            data: undefined,
        }
    }

    async addComment(id: string, comment: IComment) {

        const response = await axios({method: 'post', url: `/api/comments`, data: {id:id, comment:comment}});
        return {
            status: response.status,
            data: undefined,
        }
    }

//like
    async addLike(id: string) {

        const response = await axios({method: 'post', url: '/api/likes', data: {id:id}});
        return {
            status: response.status,
            data: undefined,
        }
    }

    async deleteLike(id: string) {

        const response = await axios({method: 'delete', url: `/api/likes/${id}`, data: {}});
        return {
            status: response.status,
            data: undefined,
        }

    }
}

export default new ApiClient();