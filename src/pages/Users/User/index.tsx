import React, {useState} from "react";
import Table from "../../../components/Table";
import {Button, Fab, Modal, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
// @ts-ignore
import noAvatar from "../../../svg/no-profile-picture.svg";
import InputFileUpload from "../../../components/UploadImage";
import UserForm from "../../../components/forms/UserForm";
import CollectionForm from "../../../components/forms/CollectionForm";

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
        picture: ''
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture: ''
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture: ''
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture: ''
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture: ''
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture: ''
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture: ''
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture: ''
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture: ''
    },
];


const User = () => {
    // const [conf, setConf] = useState([{title:'title', type:'text'}, {title:'date', type:'date'}]);
    // const [data, setData] = useState([{title:'sometitle', date:'05.03.2021'}]);
    const [openModal, setOpenModal] = useState(false);

    const collection = [1];
    const avatar = 'f';

    return (
        <div
            className={'relative w-full flex flex-col lg:flex-row justify-evenly items-center grow p-4'}>
            {
                <Modal
                    open={openModal}
                    onClose={()=> {
                        setOpenModal(false);
                    }}
                    sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
                >
                    <CollectionForm />
                    {/*<UserForm />*/}
                </Modal>
            }
            <div className={'h-full w-full lg:w-[30%] flex flex-col mb-4'}>
                <div className={'w-full h-[300px] flex justify-center items-center'}>
                    {
                        avatar
                        ? <img
                                src={'https://sun9-27.userapi.com/impg/M2gNPOTpINWsFHVOpjc-RSk2rpNKlAfEriopig/ukWQzow150s.jpg?size=1024x1024&quality=96&sign=3908fb39593d5a5b7e8909ce936462bf&type=album'}
                        className={'relative h-full rounded-full shadow-md'}/>
                        :    <img src={noAvatar}/>
                    }
                </div>
                <div className={'w-full flex flex-col'}>
                     <h1 className={'text-xl font-bold text-center my-4'}>Name Lastname</h1>
                     <div className={'flex justify-center gap-2 md:m-0 my-2'}>
                         <Button size={'small'} variant="outlined" onClick={()=>setOpenModal(true)}>Edit</Button>
                         <Button size={'small'} variant="outlined">Delete</Button>
                     </div>
                            <p className={'overflow-y-auto p-4 w-full h-[175px] styled_scrollbar text-justify'}>
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
                {collection.length === 0
                    ? null
                    : <div className={'flex w-full flex-row justify-end gap-2 my-4 lg:mb-4'}>
                        <Button size={'small'} variant="outlined">Add</Button>
                    </div>
                }
                {
                    collection.length === 0
                    ?    <Button size={'large'} variant="outlined">create your first collection</Button>
                    :    <Table sorting={true} pagination={true} data={rows} config={headCells} onRowClick={(e, id) => {
                            document.location = '/collections/' + id;
                        }}/>
                }
            </div>
        </div>
    )
}

export default User;