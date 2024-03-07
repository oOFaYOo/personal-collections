import React, {useState} from "react";
import {Button, Modal} from "@mui/material";
import Table from "../../../components/Table";
import UserForm from "../../../components/forms/UserForm";
import CollectionForm from "../../../components/forms/CollectionForm";
import {ModalFormType} from "./type";
// @ts-ignore
import noAvatar from "../../../svg/no-profile-picture.svg";


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
    const [openModal, setOpenModal] = useState<ModalFormType>(ModalFormType.Initial);

    const collections = [1];
    const avatar = 'а';

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
                        avatar
                            ? <img
                                src={'https://sun9-27.userapi.com/impg/M2gNPOTpINWsFHVOpjc-RSk2rpNKlAfEriopig/ukWQzow150s.jpg?size=1024x1024&quality=96&sign=3908fb39593d5a5b7e8909ce936462bf&type=album'}
                                className={'relative h-full rounded-full shadow-md'}/>
                            : <img src={noAvatar}/>
                    }
                </div>
                <div className={'w-full flex flex-col grow'}>
                    <h1 className={'text-xl font-bold text-center my-2'}>Name Lastname</h1>
                    <div className={'flex justify-center gap-2 md:mt-4 my-2'}>
                        <Button size={'small'} variant="outlined"
                                onClick={() => setOpenModal(ModalFormType.User)}>Edit</Button>
                        <Button size={'small'} variant="outlined">Delete</Button>
                    </div>
                    <p className={'overflow-y-auto p-4 w-full flex grow h-[175px] styled_scrollbar text-justify'}>
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                    </p>
                </div>
            </div>
            <div className={'flex relative flex-col items-center justify-center lg:pl-4 h-full w-full lg:w-[70%]'}>
                {collections.length === 0
                    ? null
                    : <div className={'flex w-full flex-row justify-end gap-2 my-4 lg:mb-4'}>
                        <Button size={'small'} variant="outlined"
                                onClick={() => setOpenModal(ModalFormType.Collection)}>Add</Button>
                    </div>
                }
                {
                    collections.length === 0
                        ? <Button size={'large'} variant="outlined">create your first collection</Button>
                        : <Table pagination={true} data={rows} config={headCells} onRowClick={(e, id) => {
                            document.location = '/collections/' + id;
                        }}/>
                }
            </div>
        </div>
    )
}

export default User;