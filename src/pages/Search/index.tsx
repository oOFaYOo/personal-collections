import React, {useEffect, useState} from "react";
import {useDebounce} from "@uidotdev/usehooks";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import api from "../../api_client";
import Table from "../../components/Table";
import {CircularProgress} from "@mui/material";
import {useTranslation} from "react-i18next";
import {ITableItem} from "../../components/Table/type";
import getConfig from "../../tableConfigs";
import {IItem} from "../../api_client/ItemRequests/type";
import {setSearchTag, setSearchValue} from "../../store/slice";

const Search = () => {
    const dispatch = useDispatch();
    const {searchValue, searchTag} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const {t} = useTranslation();
    const config: ITableItem[] = getConfig(t, 'table.title').collection;

    const [items, setItems] = useState<IItem[] | null>(null);
    const debouncedSearchTerm = useDebounce(searchValue, 1000);

    useEffect(() => {
        (
            async () => {
                if (debouncedSearchTerm || searchValue || localStorage.searchValue) {
                    const response = await api.SearchRequest.getSearchResult(searchValue === ''
                        ? localStorage.searchValue
                        : searchValue);
                    if (response.status === 200) {
                        setItems(response.data);
                    }
                    return;
                }
                if (searchTag || localStorage.searchTag) {
                    const response = await api.SearchRequest.getSearchResultByTag(searchTag === ''
                    ? localStorage.searchTag
                    : searchTag);
                    if (response.status === 200) {
                        setItems(response.data);
                        dispatch(setSearchTag(''));
                        localStorage.removeItem('searchTag');
                    }
                }
            }
        )()
    }, [debouncedSearchTerm])

    return (
        <div
            className={'relative w-full flex flex-wrap justify-evenly items-center grow p-4'}>
            {
                !items
                    ? <CircularProgress/>
                    : items.length === 0
                        ? <p className={'text-3xl opacity-30'}>Nothing found</p>
                        : <Table pagination={true}
                                 data={items}
                                 config={config}
                                 onRowClick={(e, id, row) => {
                                     document.location = `/collections/${row?.collection.id}/${id}`;
                                 }}/>
            }
        </div>
    )
}

export default Search;