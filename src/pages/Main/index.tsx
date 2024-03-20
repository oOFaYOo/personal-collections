import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import TagCloud from "../../components/TagCloud";
import Table from "../../components/Table";
import api from "../../api_client";
import {filter} from "../../components/Table/functions";
import {ITableItem} from "../../components/Table/type";
import {CircularProgress} from "@mui/material";
import {useTranslation} from "react-i18next";
import {IItem} from "../../api_client/ItemRequests/type";
import {IUser} from "../../api_client/UserRequests/type";
import {ICollection} from "../../api_client/CollectionRequests/type";

const Main = () => {

    const {theme, filterByTheme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [collections, setCollections] = useState<ICollection[] | null>(null);
    const [items, setItems] = useState<IItem & {collectionName:string}[] | null>(null);
    const [users, setUsers] = useState<IUser[] | null>(null);
    const [tags, setTags] = useState<{value:string, count:number}[] | null>(null);

    const {t} = useTranslation();

    const collectionsConfig: ITableItem [] = [
        {
            id: 'picture',
            label: '',
            type: 'picture'
        },
        {
            id: 'name',
            label: t("table.title"),
            type: 'text',
        },
        {
            id: 'theme',
            label: t("table.theme"),
            type: 'text',
        },
        {
            id: 'description',
            label: t("table.description"),
            type: 'paragraph'
        },
    ];

    const itemsConfig: ITableItem[] = [
        {
            id: 'picture',
            label: '',
            type: 'picture'
        },
        {
            id: 'name',
            label: t("table.title"),
            type: 'text',
        },
        {
            id: 'collectionName',
            label:  t("table.collectionName"),
            type: 'text',
        },
        {
            id:'userName',
            label: t("table.userName"),
            type: 'text',
        },
    ];

    const usersConfig: ITableItem [] = [
        {
            id: 'picture',
            label: '',
            type: 'picture'
        },
        {
            id: 'name',
            label: t("table.name"),
            type: 'text',
        },
        {
            id: 'amountCollections',
            label: t("table.amountCollections"),
            type: 'text',
        }
    ];

    useEffect(() => {
        (
            async () => {
                if (!collections) {
                    const response = await api.MainPageRequests.getBiggestCollections();
                    if (response.status === 200) {
                        setCollections(response.data);
                    }
                }
            }
        )()
    }, [])

    useEffect(() => {
        (
            async () => {
                if (!users) {
                    const response = await api.MainPageRequests.getRandomUsers();
                    if (response.status === 200) {
                        setUsers(response.data.sort((a:IUser,b:IUser) => b.amountCollections - a.amountCollections));
                    }
                }
            }
        )()
    }, [])

    useEffect(() => {
        (
            async () => {
                if (!items) {
                    const response = await api.MainPageRequests.getLastItems();
                    if (response.status === 200) {
                        setItems(response.data.map((item:IItem & {collectionName:string}) => {
                            return {...item, collectionName: (item.collection as ICollection).name}
                        }));
                    }
                }
            }
        )()
    }, [])

    useEffect(() => {
        (
            async () => {
                if (!tags) {
                    const response = await api.MainPageRequests.getAllTags();
                    if (response.status === 200) {
                        let comparingObj:{[key:string]:number} = {};
                        response.data.split(' ').filter((value:string) => !!value).forEach((tag:string) => {
                            if(comparingObj[tag]) comparingObj[tag]+=comparingObj[tag]
                            else comparingObj[tag] = 1
                        });
                        setTags((Object.entries(comparingObj)).map(value => {
                            return {value:value[0], count:value[1]}
                        }));
                    }
                }
            }
        )()
    }, [])

    return (
        <div
            className={`${tags ? 'items-start' : 'items-center'} relative w-full flex p-2 lg:flex-row flex-col-reverse 
            justify-start grow gap-4`}>
            <div className={`${tags ? 'overflow-y-auto styled_scrollbar' : ''} 
            flex flex-col items-center justify-start lg:w-[20%] w-full contrast-75 max-h-[40vh] lg:max-h-[85vh]`}>
                {
                    !tags
                    ? <CircularProgress/>
                    : <TagCloud tags={tags} onClick={(tag: string) => {}}/>
                }
            </div>
            <div className={`${collections && users ? 'justify-start' : 'justify-center items-center'} lg:w-[80%] lg:p-0 
            pt-4 w-full lg:h-[85vh] flex flex-col`}>
                {
                    collections && users && items
                        ? <>
                            <div
                                className={'h-auto mb-8 lg:h-[30%] lg:pl-4 w-full flex justify-between items-center flex-col md:flex-row'}>
                                <div className={'w-full md:w-[50%] mobile:flex-col flex flex-row-reverse md:mb-0 mb-8'}>
                                    <Link to={'/items'}
                                          className={'max-w-[50px] min-w-[50px] mobile:min-w-full flex justify-end lg:justify-center ' +
                                              'items-center opacity-30 hover:opacity-100'}>
                                        <ArrowForwardIosIcon color={'inherit'} fontSize={"large"}/>
                                    </Link>
                                    <Table data={items} config={itemsConfig} onRowClick={(e, id, row) => {
                                        document.location = '/collections/'+ row?.collection.id + '/' + id;
                                    }}/>
                                </div>
                                <div className={'w-full md:w-[50%] mobile:flex-col flex flex-row-reverse'}>
                                    <Link to={'/users'}
                                          className={'max-w-[50px] min-w-[50px] mobile:min-w-full flex justify-end lg:justify-center ' +
                                              'items-center opacity-30 hover:opacity-100'}>
                                        <ArrowForwardIosIcon color={'inherit'} fontSize={"large"}/>
                                    </Link>
                                    <Table data={users} config={usersConfig} onRowClick={(e, id) => {
                                        document.location = '/users/' + id;
                                    }}/>
                                </div>
                            </div>
                            <div className={'sm:max-h-[67%] w-full flex justify-end items-center'}>
                                <div
                                    className={'lg:pl-4 grow mb-4 pb-2 h-full flex mobile:flex-col flex-row-reverse overflow-x-auto'}>
                                    <Link to={'/collections'}
                                          className={'max-w-[50px] min-w-[50px] mobile:min-w-full flex justify-end lg:justify-center ' +
                                              'items-center opacity-30 hover:opacity-100'}>
                                        <ArrowForwardIosIcon color={'inherit'} fontSize={"large"}/>
                                    </Link>
                                    <Table data={filter(collections, filterByTheme)} config={collectionsConfig}
                                           onRowClick={(e, id) => {
                                               document.location = '/collections/' + id;
                                           }}/>
                                </div>
                            </div>
                        </>
                        : <CircularProgress/>
                }
            </div>

        </div>
    )
}

export default Main;