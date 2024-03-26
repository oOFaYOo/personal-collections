import {IItem, IItemRequests} from "./type";
import axios from "axios";

class ItemRequests implements IItemRequests {
    async getItems() {

        const response = await axios({method: 'get', url: '/api/items'});
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

    // async uploadItemPicture(itemId: string) {
    //
    //     const response = await axios({method: 'post', url: `/api/items/${itemId}/picture`, data: {}});
    //     return {
    //         status: response.status,
    //         data: undefined,
    //     }
    // }

    async editItemData(itemId: string, item: IItem) {

        const response = await axios({method: 'patch', url: `/api/items/${itemId}`, data: {item: {...item}}});
        return {
            status: response.status,
            data: undefined,
        }
    }
}

export default new ItemRequests();