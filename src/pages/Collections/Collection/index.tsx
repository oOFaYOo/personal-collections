import React, {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {Button, CircularProgress, Modal} from "@mui/material";
import ItemForm from "../../../components/forms/ItemForm";
import CollectionForm from "../../../components/forms/CollectionForm";
import Table from "../../../components/Table";
import {ModalFormType} from "./type";
// @ts-ignore
import noImg from "../../../svg/no-img.svg";
import api from "../../../api_client";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {ITableItem} from "../../../components/Table/type";
import {useTranslation} from "react-i18next";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {ICollection} from "../../../api_client/CollectionRequests/type";
import {IItem} from "../../../api_client/ItemRequests/type";

function handledConfig (config:ITableItem[], collection:ICollection) {
    let updatedConfig = [...config];
    if(collection) {
        for(let value of Object.values(collection)){
            if(!!value.label && (value.type === 'text' || value.type === 'date')){
                updatedConfig.push({
                    id: value.id,
                    label: value.label,
                    type: value.type
                });
            }
        }
        return updatedConfig;
    }
}

const Collection = () => {
    const {id} = useParams();
    const path = useLocation().pathname;
    const {currentUser} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [openModal, setOpenModal] = useState<ModalFormType>(ModalFormType.Initial);
    const [collection, setCollection] = useState<ICollection | null>(null);
    const [items, setItems] = useState<IItem[] | null>(null);
    const [updateCollection, setUpdateCollection] = useState<boolean>(false);
    const [updateItems, setUpdateItems] = useState<boolean>(false);

    const {t} = useTranslation();

    const config: ITableItem[] = [
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
            id: 'tags',
            label: t("table.tags"),
            type: 'paragraph',
        },
    ];

    useEffect(() => {
        (
            async () => {
                if (!collection || updateCollection) {
                    const response = await api.CollectionRequests.getCollection(id as string);
                    if (response.status === 200) {
                        setCollection(response.data);
                    }
                }
                setUpdateCollection(false);
            }
        )()
    }, [updateCollection])

    useEffect(() => {
        (
            async () => {
                if ((!items && collection) || (updateItems && collection) ) {
                    const response = await api.ItemRequests.getCollectionItems(collection?.id!);
                    if (response.status === 200) {
                        setItems(response.data);
                    }
                }
                setUpdateItems(false)
            }
        )()
    }, [collection, updateItems]);


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
                        ? <ItemForm setOpenModal={() => setOpenModal(ModalFormType.Initial)}
                                    currentCollection={collection as ICollection} setUpdate={setUpdateItems} />
                        : <CollectionForm currentCollection={collection as ICollection}
                                          setOpenModal={() => setOpenModal(ModalFormType.Initial)}
                                          setUpdate={setUpdateCollection}/>
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
                            <div className={'w-full md:h-full h-[30vh] md:ml-4 lg:w-[65%] flex flex-col justify-start'}>
                                <div className={'flex justify-between items-center md:items-start mb-2'}>
                                    <div>
                                        <h1 className={'text-xl font-bold'}>{collection.name}</h1>
                                        <h2 className={'font-semibold italic'}>{t(`theme.${collection.theme}`)}</h2>
                                        <Link to={`/users/${collection.user}`}>
                                            <h3 className={'text-lg font-semibold text-[#1976d2]'}>{t("author")}</h3>
                                        </Link>
                                    </div>
                                    <div className={'flex flex-row justify-between gap-2'}>
                                        {collection?.user === currentUser?.id || currentUser?.isAdmin
                                            ? <>
                                                    {
                                                        items?.length === 0
                                                            ? null
                                                            : <Button size={'small'} variant="outlined"
                                                                      onClick={() => setOpenModal(ModalFormType.Item)}>
                                                                {t('add')}
                                                              </Button>
                                                    }
                                                    <Button size={'small'} variant="outlined"
                                                            onClick={() => setOpenModal(ModalFormType.Collection)}>
                                                        {t("edit")}
                                                    </Button>
                                                    <Button size={'small'} variant="outlined" onClick={async () => {
                                                        await api.CollectionRequests.deleteCollection(id as string);
                                                        document.location = `/users/${collection.user}`;
                                                    }}>
                                                        {t("delete")}
                                                    </Button>
                                                </>
                                            : null
                                        }
                                    </div>
                                </div>
                                <Markdown remarkPlugins={[remarkGfm]}
                                    className={'overflow-y-auto w-full md:w-[80%] md:h-[80%] styled_scrollbar text-justify opacity-70'}>
                                    {collection.description}
                                </Markdown>
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
                            {t('add_long_item')}</Button>
                        </div>
                        : null
                    : <Table pagination={true}
                             filtering={false}
                             config={handledConfig(config, collection!)!}
                             data={items}
                             onRowClick={(e, id) => {
                        document.location = path + '/' + id;
                    }}/>
            }
        </div>
    )
}

export default React.memo(Collection);