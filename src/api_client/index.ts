import axios from "axios";
import {ISearchRequest} from "./type";
import AuthRequests from "./AuthRequests";
import CollectionRequests from "./CollectionRequests";
import ItemRequests from "./ItemRequests";
import UserRequests from "./UserRequests";
import CommentRequests from "./CommentRequests";
import MainPageRequests from "./MainPageRequests";
import LikeRequests from "./LikeRequests";

class SearchRequest implements ISearchRequest {

    async getSearchResult(searchValue:string) {
        const response = await axios({method: 'get', url: `/api/search?value=${searchValue}`});
        return {
            status: response.status,
            data: response.data,
        }
    }
}

export default {
    AuthRequests: AuthRequests,
    CollectionRequests: CollectionRequests,
    ItemRequests: ItemRequests,
    UserRequests: UserRequests,
    CommentRequests: CommentRequests,
    MainPageRequests: MainPageRequests,
    LikeRequests: LikeRequests,
    SearchRequest: new SearchRequest(),
}





