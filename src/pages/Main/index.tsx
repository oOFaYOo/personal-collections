import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import TagCloud from "../../components/TagCloud";
import api from "../../api_client";
import {filter} from "../../components/Table/functions";
import {ITableItem} from "../../components/Table/type";
import {CircularProgress} from "@mui/material";
import {useTranslation} from "react-i18next";
import {IItem} from "../../api_client/ItemRequests/type";
import {IUser} from "../../api_client/UserRequests/type";
import {ICollection} from "../../api_client/CollectionRequests/type";
import {makeRequest} from "../../functions";
import getConfig from "../../tableConfigs";
import {setSearchTag, setSearchValue} from "../../store/slice";
import MainPageTableContainer from "../../components/containers/MainPageTableContainer";

const Main = () => {
    const dispatch = useDispatch();
    const {filterByTheme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const {t} = useTranslation();
    const collectionsConfig: ITableItem[] = getConfig(t, 'table.title').main.collections as ITableItem[];
    const itemsConfig: ITableItem[] = getConfig(t, 'table.title').main.items as ITableItem[];
    const usersConfig: ITableItem [] = getConfig(t, 'table.name').main.users as ITableItem[];

    const [data, setData] = useState<{
        tags: string,
        collections: ICollection[],
        items: (IItem & { collectionName: string })[],
        users: IUser[]
    } | null>(null);

    useEffect(() => {
        makeRequest(data, setData, api.MainPageRequests.getMain())
    }, [])

    return (
        <div
            className={`items-center relative w-full flex p-2 lg:flex-row flex-col-reverse 
            justify-center grow gap-4`}>
            {
                data
                    ? <>
                        <div className={`${data.tags ? 'overflow-y-auto styled_scrollbar' : ''} 
            flex flex-col items-center justify-start lg:w-[20%] w-full contrast-75 max-h-[40vh] lg:max-h-[85vh]`}>
                            <TagCloud tags={
                                (() => {
                                    let comparingObj: { [key: string]: number } = {};
                                    data.tags.split(' ').filter((value: string) => !!value).forEach((tag: string) => {
                                        if (comparingObj[tag]) comparingObj[tag] += comparingObj[tag]
                                        else comparingObj[tag] = 1
                                    });
                                    return (Object.entries(comparingObj)).map(value => {
                                        return {value: value[0], count: value[1]}
                                    })
                                })()
                            } onClick={(tag: string) => {
                                localStorage.searchTag = tag;
                                dispatch(setSearchTag(tag));
                                dispatch(setSearchValue(''));
                                localStorage.removeItem('searchValue');
                                document.location = '/search'
                            }}/>
                        </div>
                        <div
                            className={`${data.collections && data.users && data.items ? 'justify-start' : 'justify-center items-center'} lg:w-[80%] lg:p-0 
            pt-4 w-full lg:h-[85vh] flex flex-col`}>
                            <div
                                className={'h-auto mb-8 lg:h-[30%] gap-4 lg:pl-4 w-full flex justify-between items-center flex-col md:flex-row'}>
                                <MainPageTableContainer data={data.items.map((item: IItem & { collectionName: string }) => {
                                    return {...item, collectionName: (item.collection as ICollection).name}
                                })} config={itemsConfig} url={'/items'}
                                                        onRowClick={(e, id, row) => {
                                                            document.location = '/collections/' + row?.collection.id + '/' + id;
                                                        }} className={'md:w-[50%]'}/>
                                <MainPageTableContainer
                                    data={data.users.sort((a: IUser, b: IUser) => b.amountCollections - a.amountCollections)}
                                    config={usersConfig} url={'/users'}
                                    onRowClick={(e, id, row) => {
                                        document.location = '/users/' + id;
                                    }} className={'md:w-[50%]'}/>
                            </div>
                            <div className={'w-full flex justify-end items-center'}>
                                <MainPageTableContainer data={filter(data.collections, filterByTheme)}
                                                        config={collectionsConfig}
                                                        url={'/collections'}
                                                        onRowClick={(e, id, row) => {
                                                            document.location = '/collections/' + id;
                                                        }} className={'mb-4 pb-2 overflow-x-auto lg:pl-4'}/>
                            </div>
                        </div>
                    </>
                    : <CircularProgress/>
            }
        </div>
    )
}

export default React.memo(Main);