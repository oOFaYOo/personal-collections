import React, {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {Button, CircularProgress, Modal} from "@mui/material";
import ItemForm from "../../../components/forms/ItemForm";
import CollectionForm from "../../../components/forms/CollectionForm";
import Table from "../../../components/Table";
import {ModalFormType} from "./type";
import api from "../../../api_client";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {ITableItem} from "../../../components/Table/type";
import {useTranslation} from "react-i18next";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {ICollection} from "../../../api_client/CollectionRequests/type";
import {IItem} from "../../../api_client/ItemRequests/type";
import {handleConfigTextDate, makeRequest} from "../../../functions";
import getConfig from "../../../tableConfigs";
// @ts-ignore
import noImg from "../../../svg/no-img.svg";

const Collection = () => {
    const {id} = useParams();
    const path = useLocation().pathname;
    const {currentUser} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [openModal, setOpenModal] = useState<ModalFormType>(ModalFormType.Initial);
    const [collection, setCollection] = useState<{ collection: ICollection, items: IItem[] } | null>(null);
    const [updateCollection, setUpdateCollection] = useState<boolean>(false);

    const {t} = useTranslation();
    const config: ITableItem[] = getConfig(t, 'table.title').collection;

    useEffect(() => {
        makeRequest(collection, setCollection,
            api.CollectionRequests.getCollection(id as string), updateCollection, setUpdateCollection)
    }, [updateCollection])

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
                                    currentCollection={collection?.collection as ICollection}
                                    setUpdate={setUpdateCollection}/>
                        : <CollectionForm currentCollection={collection?.collection as ICollection}
                                          setOpenModal={() => setOpenModal(ModalFormType.Initial)}
                                          setUpdate={setUpdateCollection}/>
                    }
                </Modal>
            }
            {
                !collection
                    ? <CircularProgress/>
                    : <>
                        <section
                            className={`${collection ? 'justify-between' : 'items-center justify-center'} 
                flex flex-col md:flex-row md:max-h-[40vh] mt-4 mb-[20px] w-full grow`}>
                            <div
                                className={'w-full lg:w-[35%] h-[300px] grow md:h-full flex justify-center items-center'}>
                                <div
                                    className={'relative h-[300px] w-[300px] md:h-[270px] md:w-[270px] rounded-full shadow-md overflow-hidden ' +
                                        'flex justify-center items-center bg-neutral-100'}>
                                    <img src={collection?.collection.picture ? collection?.collection.picture : noImg}
                                         className={'relative max-w-[140%]'} alt={'collection avatar'}/>
                                </div>
                            </div>
                            <div className={'w-full md:h-full h-[30vh] md:ml-4 lg:w-[65%] flex flex-col justify-start'}>
                                <div className={'flex justify-between items-center md:items-start mb-2'}>
                                    <div>
                                        <h1 className={'text-xl font-bold'}>{collection?.collection.name}</h1>
                                        <h2 className={'font-semibold italic'}>{t(`theme.${collection?.collection.theme}`)}</h2>
                                        <Link to={`/users/${collection?.collection.user}`}>
                                            <h3 className={'text-lg font-semibold text-[#1976d2]'}>{t("author")}</h3>
                                        </Link>
                                    </div>
                                    <div className={'flex flex-row justify-between gap-2'}>
                                        {collection?.collection.user === currentUser?.id || currentUser?.isAdmin
                                            ? <>
                                                {
                                                    collection?.items?.length === 0
                                                        ? null
                                                        : <Button size={'small'} variant="outlined"
                                                                  onClick={() => setOpenModal(ModalFormType.Item)}>
                                                            {t('buttons.add')}
                                                        </Button>
                                                }
                                                <Button size={'small'} variant="outlined"
                                                        onClick={() => setOpenModal(ModalFormType.Collection)}>
                                                    {t("buttons.edit")}
                                                </Button>
                                                <Button size={'small'} variant="outlined" onClick={async () => {
                                                    await api.CollectionRequests.deleteCollection(id as string);
                                                    document.location = `/users/${collection.collection.user}`;
                                                }}>
                                                    {t("buttons.delete")}
                                                </Button>
                                            </>
                                            : null
                                        }
                                    </div>
                                </div>
                                <Markdown remarkPlugins={[remarkGfm]}
                                          className={'overflow-y-auto w-full md:w-[80%] md:h-[80%] styled_scrollbar text-justify opacity-70'}>
                                    {collection.collection.description}
                                </Markdown>
                            </div>
                        </section>
                        {
                            collection?.items.length === 0
                                ? collection?.collection.user === currentUser?.id || currentUser?.isAdmin
                                    ? <div className={'my-8'}><Button size={'large'} variant="outlined"
                                                                      onClick={() => setOpenModal(ModalFormType.Item)}>
                                        {t('buttons.add_long_item')}</Button>
                                    </div>
                                    :
                                    null
                                :
                                <Table pagination={true}
                                       filtering={false}
                                       config={handleConfigTextDate(config, collection.collection!)!}
                                       data={collection?.items}
                                       onRowClick={(e, id) => {
                                           document.location = path + '/' + id;
                                       }}/>
                        }
                    </>
            }
        </div>
    )
}

export default React.memo(Collection);