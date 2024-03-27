import React, {useEffect, useState} from "react";
import {Button, CircularProgress, Modal} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import Table from "../../../components/Table";
import UserForm from "../../../components/forms/UserForm";
import CollectionForm from "../../../components/forms/CollectionForm";
import {ModalFormType} from "./type";
import api from "../../../api_client";
import {useParams} from "react-router-dom";
import {setCurrentUser} from "../../../store/slice";
import {filter} from "../../../components/Table/functions";
import {useTranslation} from "react-i18next";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {IUser} from "../../../api_client/UserRequests/type";
import {ICollection} from "../../../api_client/CollectionRequests/type";
import {makeRequest} from "../../../functions";
import getConfig from "../../../tableConfigs";
// @ts-ignore
import noAvatar from "../../../svg/no-profile-picture.svg";

const User = () => {
    const dispatch = useDispatch();
    const {currentUser, filterByTheme} = useSelector((state: RootState) => state.PersonalCollectionsStore);
    const {id} = useParams();

    const [openModal, setOpenModal] = useState<ModalFormType>(ModalFormType.Initial);
    const [user, setUser] = useState<{user:IUser, collections: ICollection[]} | null>(null);
    const [updateUser, setUpdateUser] = useState<boolean>(false);

    const {t} = useTranslation();
    const config = getConfig(t, 'table.name').user;

    useEffect(() => {
        makeRequest(user, setUser, api.UserRequests.getUser(id as string), updateUser, setUpdateUser)
    }, [currentUser, updateUser])

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
                            ? <UserForm user={user?.user as IUser} setUpdate={setUpdateUser}
                                        setOpenModal={() => setOpenModal(ModalFormType.Initial)}/>
                            : <CollectionForm setUpdate={setUpdateUser}
                                              setOpenModal={() => setOpenModal(ModalFormType.Initial)}/>
                    }
                </Modal>
            }
            {!user
                ? <CircularProgress/>
                : <>
                    <section className={'h-full w-full lg:w-[30%] flex flex-col mb-4'}>
                        <div className={'w-full h-[300px] flex justify-center items-center'}>
                            {
                                user.user.picture
                                ? <div
                                        className={'relative h-[300px] w-[300px] rounded-full shadow-md overflow-hidden ' +
                                            'flex justify-center items-center bg-neutral-100'}>
                                        <img src={user.user.picture ? user.user.picture : noAvatar} className={'relative max-w-[140%]'} alt={'user avatar'}/>
                                    </div>
                                : <img src={noAvatar} alt={'user avatar'}/>
                            }
                        </div>
                        <div className={'w-full flex flex-col grow'}>
                            <h1 className={'text-xl font-bold text-center my-2'}>{user?.user.name}</h1>
                            <div className={'flex justify-center gap-2 md:mt-4 my-2'}>
                                {
                                    user?.user.id === currentUser?.id || currentUser?.isAdmin
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
                                user?.user.description
                                    ?
                                    <Markdown
                                        remarkPlugins={[remarkGfm]}
                                        className={'overflow-y-auto p-4 w-full flex grow max-h-[175px] lg:h-[175px] ' +
                                            'styled_scrollbar text-justify'}>
                                        {user?.user.description}
                                    </Markdown>
                                    : null
                            }
                        </div>
                    </section>
                    <section
                        className={'flex relative flex-col items-center justify-center lg:pl-4 h-full w-full lg:w-[70%]'}>
                        {!user?.collections
                            ? <CircularProgress/>
                            : <>
                                {user?.collections.length === 0
                                    ? null
                                    : user?.user.id === currentUser?.id || currentUser?.isAdmin
                                        ? <div className={'flex w-full flex-row justify-end gap-2 my-4 lg:mb-4'}>
                                            <Button size={'small'} variant="outlined"
                                                    onClick={() => setOpenModal(ModalFormType.Collection)}>{t('buttons.add')}</Button>
                                        </div>
                                        : null
                                }
                                {
                                    user?.collections.length === 0
                                        ? user?.user.id === currentUser?.id || currentUser?.isAdmin
                                            ?
                                            <Button size={'large'} variant="outlined"
                                                    onClick={() => setOpenModal(ModalFormType.Collection)}>{t('buttons.add_long_collection')}</Button>
                                            : null
                                        : <Table pagination={true} data={filter(user?.collections, filterByTheme)}
                                                 config={config}
                                                 onRowClick={(e, id) => {
                                                     document.location = '/collections/' + id;
                                                 }}/>
                                }
                            </>}
                    </section>

                </>
            }
        </div>
    )
}

export default React.memo(User);