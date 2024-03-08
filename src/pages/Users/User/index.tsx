import React, {useEffect, useState} from "react";
import {Button, Modal} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import Table from "../../../components/Table";
import UserForm from "../../../components/forms/UserForm";
import CollectionForm from "../../../components/forms/CollectionForm";
import {ModalFormType} from "./type";
// @ts-ignore
import noAvatar from "../../../svg/no-profile-picture.svg";
import {IUser} from "../../../api_client/type";
import api from "../../../api_client";
import {useParams} from "react-router-dom";


const headCells: { id: string, label: string, type: 'text' | 'paragraph' | 'number' | 'date' | 'checkbox' | 'picture' }[] = [
    {
        id: 'picture',
        label: '',
        type: 'picture'
    },
    {
        id: 'title',
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

const rows = [
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture: 'other'
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture: 'other'
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture: 'other'
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture: 'other'
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture: 'other'
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture: 'other'
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture: 'other'
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture: 'other'
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture: 'other'
    },
];

const User = () => {
    const {currentUser} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const {id} = useParams();

    const [openModal, setOpenModal] = useState<ModalFormType>(ModalFormType.Initial);
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        (
            async () => {
                const response = await api.getUser(id as string);
                if (response.status === 200) {
                    setUser(response.data)
                }
            }
        )()
    }, [])

    const collections = [1];

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
                            ? <UserForm/>
                            : <CollectionForm/>
                    }
                </Modal>
            }
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
                                    <Button size={'small'} variant="outlined">Delete</Button>
                                </>
                                : null
                        }
                    </div>
                    <p className={'overflow-y-auto p-4 w-full flex grow h-[175px] styled_scrollbar text-justify'}>
                        {user?.description}
                    </p>
                </div>
            </div>
            <div className={'flex relative flex-col items-center justify-center lg:pl-4 h-full w-full lg:w-[70%]'}>
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
                            ? <Button size={'large'} variant="outlined">create your first collection</Button>
                            : null
                        : <Table pagination={true} data={rows} config={headCells} onRowClick={(e, id) => {
                            document.location = '/collections/' + id;
                        }}/>
                }
            </div>
        </div>
    )
}

export default User;