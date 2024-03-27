import {IResponse} from "../type";

export interface ISearchRequest {
    getSearchResult:(searchValue:string) => Promise<IResponse<any>>;
    getSearchResultByTag:(tag:string) => Promise<IResponse<any>>;
}