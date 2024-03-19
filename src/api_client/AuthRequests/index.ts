import axios, {AxiosError} from "axios";
import {IAuthRequests} from "./type";

class AuthRequests implements IAuthRequests {
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
}

export default new AuthRequests()