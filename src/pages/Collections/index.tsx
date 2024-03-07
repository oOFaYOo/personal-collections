import React from "react";
import {useLocation} from "react-router-dom";
import Table from "../../components/Table"


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
        picture:'other',
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture:'other',
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture:'other',
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture:'other',
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture:'other',
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture:'other',
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture:'other',
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture:'other',
    },
    {
        id: '123543',
        title: 'Sometitle',
        theme: 'Books',
        description: 'description description description description description description',
        picture:'other',
    },
];


const Collections = () => {
    const path = useLocation().pathname;

    return (
        <div
            className={'relative w-full flex flex-wrap justify-evenly items-center grow p-4'}>
               <Table pagination={true} data={rows} config={headCells} onRowClick={(e, id) => {
                   document.location = path + '/' + id;
               }} />
        </div>
    )
}

export default Collections;