import axios, {AxiosError} from "axios";
import {
    IApiClient,
    ICollection,
    IComment,
    IItem, ILike, IResponse,
    IUser
} from "./type";

class ApiClient implements IApiClient {
    async signUp(name: string, email: string, password: string) {
        try {
            const response = await axios({
                method: 'post',
                url: '/api/signup',
                data: {
                    name: name,
                    email: email,
                    password: password
                }
            });
            return {
                status: response.status,
                data: response.data,
            }
        } catch (error) {
            let e = error as AxiosError;
            return {
                status: e?.response?.status ?? 0,
                data: e?.response?.data ?? ''
            }
        }
    }

    async signIn(email: string, password: string) {
        try {
            const response = await axios({
                method: 'post',
                url: '/api/signin',
                data: {
                    email: email,
                    password: password
                }
            });
            return {
                status: response.status,
                data: response.data,
            }
        } catch (error) {
            let e = error as AxiosError;
            return {
                status: e?.response?.status ?? 0,
                data: e?.response?.data ?? ''
            }
        }
    }

    async logout(userId: string) {

        const response = await axios({
            method: 'delete',
            url: '/api/logout',
            data: {
                userId: userId,
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
            url: '/api/users/current'
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

    async getUser(userId: string) {

        const response = await axios({
            method: 'get',
            url: `/api/users/${userId}`
        });
        return {
            status: response.status,
            data: response.data,
        }
    }

    async deleteUser(userId: string) {
        const response = await axios({
            method: 'delete',
            url: `/api/users/${userId}`,
        });
        return {
            status: response.status,
            data: undefined,
        }
    }

    async blockUser(userId: string) {

        const response = await axios({
            method: 'post',
            url: `/api/users/${userId}/block`,
        });
        return {
            status: response.status,
            data: undefined,
        }
    }

    async unblockUser(userId: string) {

        const response = await axios({
            method: 'post',
            url: `/api/users/${userId}/unblock`,
        });
        return {
            status: response.status,
            data: undefined,
        }
    }

    async changeAccessLevel(userId: string, isAdmin: boolean) {

        const response = await axios({method: 'post', url: `/api/users/${userId}/access`, data: {isAdmin: isAdmin}});
        return {
            status: response.status,
            data: undefined,
        }
    }

    async uploadUserPicture(userId: string, picture: File) {

        const response = await axios({
            method: 'post',
            url: `/api/users/${userId}/picture`,
            headers: {
                "Content-Type": picture.type,
            },
            data: picture
        });
        return {
            status: response.status,
            data: undefined,
        }
    }

    async editUserData(userId: string, user: {name: string, description: string}) {

        const response = await axios({
            method: 'patch',
            url: `/api/users/${userId}/edit`,
            data: {name:user.name, description:user.description}
        });
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
            {
                method: 'get',
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

    async getUserCollections(userId:string) {

        const response = await axios({method: 'get', url: `/api/user/collections/${userId}`});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async getCollection(collectionId: string) {

        const response = await axios({method: 'get', url: `/api/collections/${collectionId}`});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async deleteCollection(collectionId: string) {

        const response = await axios({method: 'delete', url: `/api/collections/${collectionId}`});
        return {
            status: response.status,
            data: undefined,
        }
    }

    async addCollection(userId: string, collection: ICollection) {

        const response = await axios({
            method: 'post',
            url: `/api/collections/create`,
            data: {userId: userId, collection: {...collection}}
        });
        return {
            status: response.status,
            data: undefined,
        }
    }

    async uploadCollectionPicture(collectionId: string) {

        const response = await axios({method: 'post', url: `/api/collections/${collectionId}/picture`, data: {}});
        return {
            status: response.status,
            data: undefined,
        }
    }

    async editCollectionData(collectionId: string, collection: ICollection) {

        const response = await axios({
            method: 'patch',
            url: `/api/collections/${collectionId}`,
            data: {collection: {...collection}}});
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

    async getCollectionItems(collectionId:string) {
        const response = await axios({method: 'get', url: `/api/collection/items/${collectionId}`});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async getItem(itemId: string) {

        const response = await axios({method: 'get', url: `/api/items/${itemId}`});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async deleteItem(itemId: string) {

        const response = await axios({method: 'delete', url: `/api/items/${itemId}`});
        return {
            status: response.status,
            data: undefined,
        }
    }

    async addItem(collectionId: string, item: IItem) {

        const response = await axios({method: 'post', url: `/api/items`, data: {collectionId: collectionId, item: {...item}}});
        return {
            status: response.status,
            data: undefined,
        }
    }

    async uploadItemPicture(itemId: string) {

        const response = await axios({method: 'post', url: `/api/items/${itemId}/picture`, data: {}});
        return {
            status: response.status,
            data: undefined,
        }
    }

    async editItemData(itemId: string, item: IItem) {

        const response = await axios({method: 'patch', url: `/api/items/${itemId}`, data: {item: {...item}}});
        return {
            status: response.status,
            data: undefined,
        }
    }

//comment
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

export default new ApiClient();