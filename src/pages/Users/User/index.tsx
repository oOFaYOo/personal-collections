import React, {useEffect, useState} from "react";
import {Button, CircularProgress, Modal} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import Table from "../../../components/Table";
import UserForm from "../../../components/forms/UserForm";
import CollectionForm from "../../../components/forms/CollectionForm";
import {ModalFormType} from "./type";
// @ts-ignore
import noAvatar from "../../../svg/no-profile-picture.svg";
import api from "../../../api_client";
import {useParams} from "react-router-dom";
import {setCurrentUser} from "../../../store/slice";
import {ITableItem} from "../../../components/Table/type";
import {filter} from "../../../components/Table/functions";
import {useTranslation} from "react-i18next";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {IUser} from "../../../api_client/UserRequests/type";
import {ICollection} from "../../../api_client/CollectionRequests/type";

const User = () => {
    const dispatch = useDispatch();
    const {currentUser, filterByTheme} = useSelector((state: RootState) => state.PersonalCollectionsStore);
    const {id} = useParams();

    const [openModal, setOpenModal] = useState<ModalFormType>(ModalFormType.Initial);
    const [user, setUser] = useState<IUser | null>(null);
    const [collections, setCollections] = useState<ICollection[] | null>(null);
    const [updateUser, setUpdateUser] = useState<boolean>(false);
    const [updateCollections, setUpdateCollections] = useState<boolean>(false);

    const {t} = useTranslation();

    const config: ITableItem [] = [
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
            id: 'theme',
            label: t("table.theme"),
            type: 'text',
        },
        {
            id: 'description',
            label: t("table.description"),
            type: 'paragraph'
        }
    ]

    useEffect(() => {
        (
            async () => {
                if (!user || updateUser) {
                    const response = await api.UserRequests.getUser(id as string);
                    if (response.status === 200) {
                        setUser(response.data)
                    }
                }
                setUpdateUser(false);
            }
        )()
    }, [currentUser, updateUser])

    useEffect(() => {
        (
            async () => {
                if (!collections || updateCollections) {
                    const response = await api.CollectionRequests.getUserCollections(id as string);
                    if (response.status === 200) {
                        setCollections(response.data)
                    }
                }
                setUpdateCollections(false);
            }
        )()
    }, [updateCollections])

    return (
        <div
            className={'relative w-full flex flex-col lg:flex-row justify-evenly items-center grow p-4'}>
            {
                <Modal
                    open={!!openModal}
                    onClose={() => {
                        setOpenModal(ModalFormType.Initial);
                    }}
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                    {
                        openModal === ModalFormType.User
                            ? <UserForm user={user as IUser} setUpdate={setUpdateUser}
                                        setOpenModal={() => setOpenModal(ModalFormType.Initial)}/>
                            : <CollectionForm setUpdate={setUpdateCollections}
                                              setOpenModal={() => setOpenModal(ModalFormType.Initial)}/>
                    }
                </Modal>
            }
            {!user
                ? <CircularProgress/>
                : <>
                    <div className={'h-full w-full lg:w-[30%] flex flex-col mb-4'}>
                        <div className={'w-full h-[300px] flex justify-center items-center'}>
                            {
                                user?.picture
                                    ? <img
                                        src={user.picture}
                                        className={'relative h-full rounded-full shadow-md'} alt={'user avatar'}/>
                                    : <img src={noAvatar} alt={'user avatar'}/>
                            }
                        </div>
                        <div className={'w-full flex flex-col grow'}>
                            <h1 className={'text-xl font-bold text-center my-2'}>{user?.name}</h1>
                            <div className={'flex justify-center gap-2 md:mt-4 my-2'}>
                                {
                                    user?.id === currentUser?.id || currentUser?.isAdmin
                                        ? <>
                                            <Button size={'small'} variant="outlined"
                                                    onClick={() => setOpenModal(ModalFormType.User)}>{t("buttons.edit")}</Button>
                                            <Button size={'small'} variant="outlined" onClick={async () => {
                                                const response = await api.UserRequests.deleteUser(id!);
                                                if (response.status === 200) {
                                                    if (currentUser?.id === id) {
                                                        await api.AuthRequests.logout(id!);
                                                        dispatch(setCurrentUser(null));
                                                        localStorage.removeItem('userId');
                                                        document.cookie = `${document.cookie}; max-age=0`;
                                                    }
                                                    document.location = '/users';
                                                }
                                            }}
                                            >{t('buttons.delete')}</Button>
                                        </>
                                        : null
                                }
                            </div>
                            {
                                user?.description
                                    ?
                                    <Markdown
                                        remarkPlugins={[remarkGfm]}
                                        className={'overflow-y-auto p-4 w-full flex grow max-h-[175px] lg:h-[175px] ' +
                                        'styled_scrollbar text-justify'}>
                                        {user?.description}
                                    </Markdown>
                                    : null
                            }
                        </div>
                    </div>
                    <div
                        className={'flex relative flex-col items-center justify-center lg:pl-4 h-full w-full lg:w-[70%]'}>
                        {!collections
                            ? <CircularProgress/>
                            : <>
                                {collections.length === 0
                                    ? null
                                    : user?.id === currentUser?.id || currentUser?.isAdmin
                                        ? <div className={'flex w-full flex-row justify-end gap-2 my-4 lg:mb-4'}>
                                            <Button size={'small'} variant="outlined"
                                                    onClick={() => setOpenModal(ModalFormType.Collection)}>{t('buttons.add')}</Button>
                                        </div>
                                        : null
                                }
                                {
                                    collections.length === 0
                                        ? user?.id === currentUser?.id || currentUser?.isAdmin
                                            ?
                                            <Button size={'large'} variant="outlined"
                                                    onClick={() => setOpenModal(ModalFormType.Collection)}>{t('buttons.add_long_collection')}</Button>
                                            : null
                                        : <Table pagination={true} data={filter(collections, filterByTheme)} config={config}
                                                 onRowClick={(e, id) => {
                                                     document.location = '/collections/' + id;
                                                 }}/>
                                }
                            </>}
                    </div>

                </>
            }
        </div>
    )
}

export default React.memo(User);