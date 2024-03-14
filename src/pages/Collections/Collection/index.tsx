import React, {useEffect, useMemo, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {Button, CircularProgress, Modal} from "@mui/material";
import ItemForm from "../../../components/forms/ItemForm";
import CollectionForm from "../../../components/forms/CollectionForm";
import Table from "../../../components/Table";
import {ModalFormType} from "./type";
// @ts-ignore
import noImg from "../../../svg/no-img.svg";
import {ICollection, IItem} from "../../../api_client/type";
import api from "../../../api_client";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {ITableItem} from "../../../components/Table/type";
import {filter} from "../../../components/Table/functions";

const config: ITableItem[] = [
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
        id: 'tags',
        label: 'Tags',
        type: 'paragraph',
    },
    {
        id: 'text1',
        label: 'text',
        type: 'text',
    },
    {
        id: 'text2',
        label: 'text',
        type: 'text',
    },
    {
        id: 'text3',
        label: 'text',
        type: 'text',
    },
    {
        id: 'date1',
        label: 'date',
        type: 'date',
    },
    {
        id: 'date2',
        label: 'date',
        type: 'date',
    },
    {
        id: 'date3',
        label: 'date',
        type: 'date',
    },
];

const Collection = () => {
    const {id} = useParams();
    const path = useLocation().pathname;
    const {currentUser, filterByTheme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [openModal, setOpenModal] = useState<ModalFormType>(ModalFormType.Initial);
    const [collection, setCollection] = useState<ICollection | null>(null);
    const [items, setItems] = useState<IItem[] | null>(null);
    const [updateCollections, setUpdateCollections] = useState<boolean>(false);

    useEffect(() => {
        (
            async () => {
                if (!collection || updateCollections) {
                    const response = await api.getCollection(id as string);
                    if (response.status === 200) {
                        setCollection(response.data);
                    }
                }
                setUpdateCollections(false);
            }
        )()
    }, [updateCollections])

    useEffect(() => {
        (
            async () => {
                if (!items && collection) {
                    const response = await api.getCollectionItems(collection?.id!);
                    if (response.status === 200) {
                        setItems(response.data);
                    }
                }
            }
        )()
    }, [collection])

    return (
        <div
            className={'relative w-full flex flex-col justify-evenly items-center grow px-4 pb-2'}>
            {
                <Modal
                    open={!!openModal}
                    onClose={() => {
                        setOpenModal(ModalFormType.Initial);
                    }}
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                    {openModal === ModalFormType.Item
                        ? <ItemForm setOpenModal={() => setOpenModal(ModalFormType.Initial)} currentCollection={collection as ICollection} />
                        : <CollectionForm currentCollection={collection as ICollection}
                                          setOpenModal={() => setOpenModal(ModalFormType.Initial)}
                                          setUpdate={setUpdateCollections}/>
                    }
                </Modal>
            }
            <div
                className={`${collection ? 'justify-between' : 'items-center justify-center'} 
                flex flex-col md:flex-row md:max-h-[40vh] mt-4 mb-[20px] w-full grow`}>
                {
                    !collection
                        ? <CircularProgress/>
                        : <>
                            <div className={'w-full lg:w-[35%] h-[300px] grow md:h-full flex justify-center items-center'}>
                                {
                                    !!collection.picture
                                        ? <img
                                            src={collection.picture}
                                            className={'relative h-full rounded-full shadow-md'}/>
                                        : <div
                                            className={'relative h-[300px] w-[300px] rounded-full shadow-md overflow-hidden ' +
                                                'flex justify-center items-center bg-neutral-100'}>
                                            <img src={noImg} className={'relative max-w-[140%]'}/></div>
                                }
                            </div>
                            <div className={'w-full md:h-full h-[30vh] md:ml-4 lg:w-[65%] flex flex-col justify-between'}>
                                <div className={'flex justify-between items-center md:items-start mb-2'}>
                                    <div>
                                        <h1 className={'text-xl font-bold'}>{collection.name}</h1>
                                        <h2 className={'font-semibold italic'}>{collection.theme}</h2>
                                        <Link to={`/users/${collection.user}`}>
                                            <h3 className={'text-lg font-semibold text-[#1976d2]'}>author</h3>
                                        </Link>
                                    </div>
                                    <div className={'flex flex-row justify-between gap-2'}>
                                        {collection?.user === currentUser?.id || currentUser?.isAdmin
                                            ? <>
                                                    {
                                                        items?.length === 0
                                                            ? null
                                                            : <Button size={'small'} variant="outlined"
                                                                      onClick={() => setOpenModal(ModalFormType.Item)}>Add</Button>
                                                    }
                                                    <Button size={'small'} variant="outlined"
                                                            onClick={() => setOpenModal(ModalFormType.Collection)}>
                                                        Edit
                                                    </Button>
                                                    <Button size={'small'} variant="outlined" onClick={async () => {
                                                        await api.deleteCollection(id as string);
                                                        document.location = `/users/${collection.user}`;
                                                    }}>
                                                        Delete
                                                    </Button>
                                                </>
                                            : null
                                        }
                                    </div>
                                </div>
                                <p className={'overflow-y-auto w-full md:w-[80%] md:h-[80%] styled_scrollbar text-justify opacity-70'}>
                                    {collection.description}
                                </p>
                            </div>
                        </>
                }
            </div>
            {!items
                ? <CircularProgress/>
                : items.length === 0
                    ? collection?.user === currentUser?.id || currentUser?.isAdmin
                        ? <div className={'my-8'}><Button size={'large'} variant="outlined"
                                                          onClick={() => setOpenModal(ModalFormType.Item)}>
                            add your first item</Button>
                        </div>
                        : null
                    : <Table pagination={true} data={filter(items, filterByTheme)} config={config} onRowClick={(e, id) => {
                        document.location = path + '/' + id;
                    }}/>
            }
        </div>
    )
}

export default Collection;