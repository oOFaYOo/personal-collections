import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import TagCloud from "../../components/TagCloud";
import Table from "../../components/Table";
import api from "../../api_client";
import {ICollection, IItem, IUser} from "../../api_client/type";
import {filter} from "../../components/Table/functions";
import {ITableItem} from "../../components/Table/type";
import {CircularProgress} from "@mui/material";

const collectionsConfig: ITableItem [] = [
    {
        id: 'picture',
        label: '',
        type: 'picture'
    },
    {
        id: 'name',
        label: 'Title',
        type: 'text',
    },
    {
        id: 'theme',
        label: 'Theme',
        type: 'text',
    },
    {
        id: 'description',
        label: 'Description',
        type: 'paragraph'
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
        label: 'Name',
        type: 'text',
    },
    {
        id: 'amountCollections',
        label: 'Collections',
        type: 'number',
    }
];

const itemsConfig: ITableItem[] = [
    {
        id: 'picture',
        label: '',
        type: 'picture'
    },
    {
        id: 'name',
        label: 'Title',
        type: 'text',
    },
    {
        id: 'collectionName',
        label: 'Collection',
        type: 'text',
    },
    {
        id:'userName',
        label: 'Author',
        type: 'text',
    }
];

const Main = () => {

    const {theme, filterByTheme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [collections, setCollections] = useState<ICollection[] | null>(null);
    const [items, setItems] = useState<IItem & {collectionName:string}[] | null>(null);
    const [users, setUsers] = useState<IUser[] | null>(null);
    const [tags, setTags] = useState<{value:string, count:number}[] | null>(null);

    useEffect(() => {
        (
            async () => {
                if (!collections) {
                    const response = await api.getBiggestCollections();
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
                    const response = await api.getRandomUsers();
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
                    const response = await api.getLastItems();
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
                    const response = await api.getAllTags();
                    if (response.status === 200) {
                        let comparingObj:{[key:string]:number} = {};
                        response.data.split(', ').forEach((tag:string) => {
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
            className={`${tags ? 'items-start' : 'items-center'} relative w-full flex p-2 lg:flex-row flex-col-reverse justify-start grow gap-4`}>
            <div className={`${tags ? 'overflow-y-auto styled_scrollbar' : ''} 
            flex flex-col items-center justify-start lg:w-[20%] w-full contrast-75 max-h-[40vh] lg:max-h-[85vh]`}>
                {
                    !tags
                    ? <CircularProgress/>
                    : <TagCloud tags={tags} onClick={(tag: string) => alert(tag)}/>
                }
            </div>
            <div className={`${collections && users ? 'justify-start' : 'justify-center items-center'} lg:w-[80%] lg:p-0 pt-4 w-full lg:h-[85vh] flex flex-col`}>
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
                                    <Table data={items} config={itemsConfig}/>
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