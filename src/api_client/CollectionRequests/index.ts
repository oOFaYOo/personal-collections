import axios from "axios";
import {ICollectionRequests, ICollection} from "./type";

class CollectionRequests implements ICollectionRequests {
    async getCollections() {

        const response = await axios({method: 'get', url: '/api/collections'});
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

    // async uploadCollectionPicture(collectionId: string) {
    //
    //     const response = await axios({method: 'post', url: `/api/collections/${collectionId}/picture`});
    //     return {
    //         status: response.status,
    //         data: undefined,
    //     }
    // }

    async editCollectionData(collectionId: string, collection: ICollection) {

        const response = await axios({
            method: 'patch',
            url: `/api/collections/${collectionId}`,
            data: {collection: {...collection}}
        });
        return {
            status: response.status,
            data: undefined,
        }
    }
}

export default new CollectionRequests();