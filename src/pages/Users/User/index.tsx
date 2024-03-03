import React from "react";
import Table from "../../../components/Table";
import {Button} from "@mui/material";

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

    return (
        <div
            className={'relative w-full flex flex-col lg:flex-row justify-evenly items-center grow p-4'}>
            <div className={'h-full w-full lg:w-[30%] flex flex-col'}>
                <div className={'w-full h-[300px] flex justify-center items-center'}>
                    <img
                        src={'https://sun9-27.userapi.com/impg/M2gNPOTpINWsFHVOpjc-RSk2rpNKlAfEriopig/ukWQzow150s.jpg?size=1024x1024&quality=96&sign=3908fb39593d5a5b7e8909ce936462bf&type=album'}
                        className={'relative h-full rounded-md shadow-md'}/>
                </div>
                <div className={'w-full flex flex-col'}>
                     <h1 className={'text-xl font-bold text-center my-4'}>Name Lastname</h1>
                     <div className={'flex justify-center gap-2 md:m-0 my-2'}>
                         <Button size={'small'} variant="outlined">Edit</Button>
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
            <div className={'flex relative flex-col justify-center lg:pl-4 h-full w-full lg:w-[70%]'}>
                <div className={'flex flex-row justify-end gap-2 my-4 lg:mb-4'}>
                     <Button size={'small'} variant="outlined">Add</Button>
                </div>
                <Table sorting={true} pagination={true} data={rows} config={headCells} onRowClick={(e, id) => {
                    document.location = '/collections/' + id;
                }}/>
            </div>
        </div>
    )
}

export default User;