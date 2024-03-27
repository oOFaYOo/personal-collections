import axios from "axios";
import {ISearchRequest} from "./type";

class SearchRequest implements ISearchRequest {

    async getSearchResult(searchValue:string) {
        const response = await axios({method: 'get', url: `/api/search?value=${searchValue}`});
        return {
            status: response.status,
            data: response.data,
        }
    }

    async getSearchResultByTag(tag:string) {
        const response = await axios({method: 'get', url: `/api/search/tag?value=${tag}`});
        return {
            status: response.status,
            data: response.data,
        }
    }
}

export default new SearchRequest();