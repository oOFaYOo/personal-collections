import axios from "axios";
import {IUserRequests} from "./type";

class UserRequests implements IUserRequests {
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

    async editUserData(userId: string, data: FormData) {
        const response = await axios({
            method: 'patch',
            url: `/api/users/${userId}/edit`,
            data: Object.fromEntries(data)
        });
        return {
            status: response.status,
            data: undefined,
        }
    }
}

export default new UserRequests();