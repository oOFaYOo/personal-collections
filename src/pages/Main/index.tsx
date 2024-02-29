import React from "react";
import TagCloud from "../../components/TagCloud";
import MainTileContainer from "../../components/Main-TileContainer";
import Table from "../../components/Table";

const arr = [1, 1, 1, 1, 1];

const Main = () => {

    const headCells: { id: string, label: string, type: 'text' | 'paragraph' | 'number' | 'date' | 'checkbox' }[] = [
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
        {
            id: 'amount',
            label: 'Amount of items',
            type: 'number'
        },

    ];

    const headCells1: { id: string, label: string, type: 'text' | 'paragraph' | 'number' | 'date' | 'checkbox' }[] = [
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
            id: 'amount',
            label: 'Amount of items',
            type: 'number'
        },

    ];

    const rows = [
        {
            id: '123543',
            title: 'Sometitle',
            theme: 'Books',
            description: 'description description description description description description description description description description description description',
            amount: 13
        },
        {
            id: '123543',
            title: 'Sometitle',
            theme: 'Books',
            description: 'description description description description description description description description description description description description',
            amount: 13
        },
        {
            id: '123543',
            title: 'Sometitle',
            theme: 'Books',
            description: 'description description description description description description description description description description description description',
            amount: 13
        },
        {
            id: '123543',
            title: 'Sometitle',
            theme: 'Books',
            description: 'description description description description description description description description description description description description',
            amount: 13
        },
        {
            id: '123543',
            title: 'Sometitle',
            theme: 'Books',
            description: 'description description description description description description description description description description description description',
            amount: 13
        },

    ];

    const rows1 = [
        {
            id: '123543',
            title: 'Sometitle',
            theme: 'Books',
            description: 'description',
            amount: 13
        },
        {
            id: '123543',
            title: 'Sometitle',
            theme: 'Books',
            description: 'description',
            amount: 13
        },
        {
            id: '123543',
            title: 'Sometitle',
            theme: 'Books',
            description: 'description',
            amount: 13
        },
    ];

    return (
        <div
            className={'relative w-full flex p-2 flex-col justify-between items-center grow'}>
            <div className={'w-full lg:h-[50%] flex lg:flex-row justify-evenly items-center flex-col'}>
                <MainTileContainer
                    children={
                        <Table data={rows1} config={headCells1} onRowClick={() => {
                        }}/>
                    }/>
                <div className={'min-w-[300px] mobile:w-full flex justify-center items-center'}>
                    <TagCloud tags={[
                        "VSCode",
                        "TypeScript",
                        "React",
                        "Preact",
                        "Parcel",
                        "Jest",
                        "Next",
                        "ESLint",
                        "Framer Motion",
                        "Three.js",
                    ]} onClick={(tag: string, ev: MouseEvent) => alert(tag)}/>
                </div>
                <MainTileContainer
                    showMore={{path:'/users', side:'right'}}
                    children={
                        <Table data={rows1} config={headCells1} onRowClick={(e, id) => {
                            document.location = '/users/' + id;
                        }}/>
                    }/>
            </div>
            <MainTileContainer
                showMore={{path:'/collections', side:'left'}}
                children={
                    <Table data={rows} config={headCells} onRowClick={(e, id) => {
                        document.location = '/collections/' + id;
                    }}/>
                }/>
        </div>
    )
}

export default Main;