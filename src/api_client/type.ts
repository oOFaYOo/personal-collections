export interface ISearchRequest {
    getSearchResult:(searchValue:string) => Promise<IResponse<any>>;
    getSearchResultByTag:(tag:string) => Promise<IResponse<any>>;
}

export interface IResponse<T> {
    status: number;
    data?: T;
}
