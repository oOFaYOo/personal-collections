import React from "react";
import Table from "../../../components/Table";
import {Link, useLocation} from "react-router-dom";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

const headCells:{id:string, label:string, type: 'text' | 'paragraph' | 'number' | 'date' | 'checkbox' | 'picture'}[] = [
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
    const path = useLocation().pathname;
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    return (
        <div
            className={'relative w-full flex flex-row justify-evenly items-center grow px-4 pb-2'}>
            <div></div>
            <div></div>
            {/*<div className={'flex flex-col md:flex-row md:max-h-[45vh] my-4 grow justify-between'}>*/}
            {/*    <div className={'w-full lg:w-[35%] h-[300px] grow md:h-full flex justify-center items-center'}>*/}
            {/*        <img*/}
            {/*            src={'https://sun9-27.userapi.com/impg/M2gNPOTpINWsFHVOpjc-RSk2rpNKlAfEriopig/ukWQzow150s.jpg?size=1024x1024&quality=96&sign=3908fb39593d5a5b7e8909ce936462bf&type=album'}*/}
            {/*            className={'relative h-full rounded-md shadow-md'}/>*/}
            {/*    </div>*/}
            {/*    <div className={'w-full md:h-full h-[30vh] md:ml-4 lg:w-[65%] flex flex-col justify-between'}>*/}
            {/*        <div className={'flex justify-between items-center mb-2'}>*/}
            {/*            <div>*/}
            {/*                <h1 className={'text-xl font-bold'}>Title</h1>*/}
            {/*                <h2 className={'font-semibold italic'}>theme</h2>*/}
            {/*            </div>*/}
            {/*            <div className={'flex flex-row justify-between gap-2'}>*/}
            {/*                <Button size={'small'} variant="outlined">Add</Button>*/}
            {/*                <Button size={'small'} variant="outlined">Edit</Button>*/}
            {/*                <Button size={'small'} variant="outlined">Delete</Button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <p className={'overflow-y-auto w-full md:h-[80%] styled_scrollbar text-justify opacity-70'}>*/}
            {/*            description description description description description description description description*/}
            {/*            description description description description description description description description*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<Table sorting={true} pagination={true} data={rows} config={headCells} onRowClick={(e, id) => {*/}
            {/*    document.location = path + '/' + id;*/}
            {/*}}/>*/}
        </div>
    )
}

export default User;