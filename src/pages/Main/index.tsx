import React from "react";
import TagCloud from "../../components/TagCloud";
import Table from "../../components/Table";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {Link} from "react-router-dom";

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
            description: 'description description description description description description description description description description description description description description description description description description description description description description',
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
            <div className={'w-full lg:h-[50%] mb-4 flex lg:flex-row lg:justify-between items-center flex-col'}>
                <div className={'lg:w-[35%] w-full flex flex-row'}>
                        <Table data={rows1} config={headCells1} onRowClick={() => {
                        }}/>
                </div>
                <div className={'mobile:w-full flex grow justify-center items-center'}>
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
                <div className={'lg:w-[35%] w-full flex lg:flex-row-reverse flex-col'}>
                    <Link to={'/users'}
                          className={'lg:w-[50px] w-full flex justify-end lg:justify-center items-center opacity-30 hover:opacity-100'}>
                        <ArrowForwardIosIcon color={'inherit'} fontSize={"large"}/>
                    </Link>
                    <Table data={rows1} config={headCells1} onRowClick={(e, id) => {
                            document.location = '/users/' + id;
                        }}/>
                </div>
            </div>
            <div className={'w-full flex lg:flex-row-reverse flex-col'}>
                <Link to={'/collections'}
                      className={'lg:w-[50px] w-full flex justify-end lg:justify-center items-center opacity-30 hover:opacity-100'}>
                    <ArrowForwardIosIcon color={'inherit'} fontSize={"large"}/>
                </Link>
                <Table data={rows} config={headCells} onRowClick={(e, id) => {
                    document.location = '/collections/' + id;
                }}/>
            </div>
        </div>
    )
}

export default Main;