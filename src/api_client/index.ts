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

        const response = await axios({method: 'post', url: '', data:{}});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async signIn(mail: string, password: string) {

        const response = await axios({method: 'get', url: ''});
        return {
            status: response.status,
            data: response.data,
        }
    }

//about user
    async getUsers() {

        const response = await axios({method: 'get', url: ''});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async getUser(id: string) {

        const response = await axios({method: 'get', url: ''});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async deleteUser(id: string) {

        const response = await axios({method: 'post', url: '', data: {}});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async blockUser(id: string) {

        const response = await axios({method: 'post', url: '', data: {}});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async unblockUser(id: string) {

        const response = await axios({method: 'post', url: '', data: {}});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async changeAccessLevel(id: string, isAdmin: boolean) {

        const response = await axios({method: 'post', url: '', data: {}});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async uploadUserPicture(id: string) {

        const response = await axios({method: 'post', url: '', data: {}});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async editUserData(id: string, user: IUserPatch) {

        const response = await axios({method: 'patch', url: '', data: {}});
        return {
            status: response.status,
            data: response.data,
        }
    }

//for main page
    async getAllTags() {

        const response = await axios({method: 'get', url: ''});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async getBiggestCollections() {

        const response = await axios({method: 'get', url: ''});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async getLastItems() {

        const response = await axios({method: 'get', url: ''});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async getRandomUsers() {

        const response = await axios({method: 'get', url: ''});
        return {
            status: response.status,
            data: response.data,
        }
    }

//collections
    async getCollections() {

        const response = await axios({method: 'get', url: ''});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async getCollection(id: string) {

        const response = await axios({method: 'get', url: ''});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async deleteCollection(id: string) {

        const response = await axios({method: 'post', url: '', data: {}});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async addCollection(id: string, collection: ICollection) {

        const response = await axios({method: 'post', url: '', data: {}});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async uploadCollectionPicture(id: string) {

        const response = await axios({method: 'post', url: '', data: {}});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async editCollectionData(id: string, collection: ICollectionPatch) {

        const response = await axios({method: 'patch', url: '', data: {}});
        return {
            status: response.status,
            data: response.data,
        }
    }

//items
    async getItems() {

        const response = await axios({method: 'get', url: ''});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async getItem(id: string) {

        const response = await axios({method: 'get', url: ''});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async deleteItem(id: string) {

        const response = await axios({method: 'post', url: '', data: {}});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async addItem(id: string, item: IItem) {

        const response = await axios({method: 'post', url: '', data: {}});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async uploadItemPicture(id: string) {

        const response = await axios({method: 'post', url: '', data: {}});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async editItemData(id: string, item: IItemPatch) {

        const response = await axios({method: 'patch', url: '', data: {}});
        return {
            status: response.status,
            data: response.data,
        }
    }

//comment
    async getComments(id: string) {

        const response = await axios({method: 'get', url: ''});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async deleteComment(id: string) {

        const response = await axios({method: 'post', url: '', data: {}});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async addComment(id: string, comment: IComment) {

        const response = await axios({method: 'post', url: '', data: {}});
        return {
            status: response.status,
            data: response.data,
        }
    }

//like
    async addLike(id: string) {

        const response = await axios({method: 'post', url: '', data: {}});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async deleteLike(id: string) {

        const response = await axios({method: 'post', url: '', data: {}});
        return {
            status: response.status,
            data: response.data,
        }

    }
}

export default new ApiClient();