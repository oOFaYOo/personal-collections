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
import {ICollection, IUser} from "../../../api_client/type";
import api from "../../../api_client";
import {useParams} from "react-router-dom";
import {setCurrentUser} from "../../../store/slice";
import {ITableItem} from "../../../components/Table/type";

const config: ITableItem [] = [
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

const User = () => {
    const dispatch = useDispatch();
    const {currentUser, filterByTheme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const {id} = useParams();

    const [openModal, setOpenModal] = useState<ModalFormType>(ModalFormType.Initial);
    const [user, setUser] = useState<IUser | null>(null);
    const [collections, setCollections] = useState<ICollection[] | null>(null);
    const [updateUser, setUpdateUser] = useState<boolean>(false);
    const [updateCollections, setUpdateCollections] = useState<boolean>(false);

    useEffect(() => {
        (
            async () => {
                if (!user || updateUser) {
                    const response = await api.getUser(id as string);
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
                    const response = await api.getUserCollections(id as string);
                    if (response.status === 200) {
                        setCollections(response.data)
                    }
                }
                setUpdateCollections(false);
            }
        )()
    }, [updateCollections])

    function filter(rows: any) {
        let arrByTheme = filterByTheme.filter((item) => item.filtered);
        if (arrByTheme.length === 0 || arrByTheme.length === filterByTheme.length) {
            return rows;
        } else {
            return rows.filter((row: any) =>
                arrByTheme.find(condition =>
                    row.theme === condition.collectionTheme
                )
            )
        }
    }

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
                            ? <UserForm user={user as IUser} setUpdate={() => setUpdateUser(!updateUser)}
                                        setOpenModal={() => setOpenModal(ModalFormType.Initial)}/>
                            : <CollectionForm setUpdate={() => setUpdateCollections(!updateCollections)} setOpenModal={() => setOpenModal(ModalFormType.Initial)}/>
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
                                        className={'relative h-full rounded-full shadow-md'}/>
                                    : <img src={noAvatar}/>
                            }
                        </div>
                        <div className={'w-full flex flex-col grow'}>
                            <h1 className={'text-xl font-bold text-center my-2'}>{user?.name}</h1>
                            <div className={'flex justify-center gap-2 md:mt-4 my-2'}>
                                {
                                    user?.id === currentUser?.id || currentUser?.isAdmin
                                        ? <>
                                            <Button size={'small'} variant="outlined"
                                                    onClick={() => setOpenModal(ModalFormType.User)}>Edit</Button>
                                            <Button size={'small'} variant="outlined" onClick={async () => {
                                                const response = await api.deleteUser(id!);
                                                if (response.status === 200) {
                                                    if (currentUser?.id === id) {
                                                        api.logout(id);
                                                        dispatch(setCurrentUser(null));
                                                        localStorage.removeItem('userId');
                                                        document.cookie = `${document.cookie}; max-age=0`;
                                                    }
                                                    document.location = '/users';
                                                }
                                            }}
                                            >Delete</Button>
                                        </>
                                        : null
                                }
                            </div>
                            {
                                user?.description
                                    ?
                                    <p className={'overflow-y-auto p-4 w-full flex grow max-h-[175px] lg:h-[175px] styled_scrollbar text-justify'}>
                                        {user?.description}
                                    </p>
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
                                                    onClick={() => setOpenModal(ModalFormType.Collection)}>Add</Button>
                                        </div>
                                        : null
                                }
                                {
                                    collections.length === 0
                                        ? user?.id === currentUser?.id || currentUser?.isAdmin
                                            ?
                                            <Button size={'large'} variant="outlined"
                                                    onClick={() => setOpenModal(ModalFormType.Collection)}>create your first collection</Button>
                                            : null
                                        : <Table pagination={true} data={filter(collections)} config={config}
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

export default User;