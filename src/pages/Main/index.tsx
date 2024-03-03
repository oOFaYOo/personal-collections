import React from "react";
import TagCloud from "../../components/TagCloud";
import Table from "../../components/Table";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {dark} from "@mui/material/styles/createPalette";

const Main = () => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

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
            description: 'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description',
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

    const tags = [
        { value: 'jQuery', count: 25 },
        { value: 'MongoDB', count: 18 },
        { value: 'JavaScript', count: 38 },
        { value: 'React', count: 30 },
        { value: 'Nodejs', count: 28 },
        { value: 'Express.js', count: 25 },
        { value: 'HTML5', count: 33 },
        { value: 'CSS3', count: 20 },
        { value: 'Webpack', count: 22 },
        { value: 'Babel.js', count: 7 },
        { value: 'ECMAScript', count: 25 },
        { value: 'Jest', count: 15 },
        { value: 'Mocha', count: 17 },
        { value: 'React Native', count: 27 },
        { value: 'Angular.js', count: 30 },
        { value: 'TypeScript', count: 15 },
        { value: 'Flow', count: 30 },
        { value: 'NPM', count: 11 },
        { value: 'jQuery', count: 25 },
        { value: 'MongoDB', count: 18 },
        { value: 'JavaScript', count: 38 },
        { value: 'React', count: 30 },
        { value: 'Nodejs', count: 28 },
        { value: 'Express.js', count: 25 },
        { value: 'HTML5', count: 33 },
        { value: 'CSS3', count: 20 },
        { value: 'Webpack', count: 22 },
        { value: 'Babel.js', count: 7 },
        { value: 'ECMAScript', count: 25 },
        { value: 'Jest', count: 15 },
        { value: 'Mocha', count: 17 },
        { value: 'React Native', count: 27 },
        { value: 'Angular.js', count: 30 },
        { value: 'TypeScript', count: 15 },
        { value: 'Flow', count: 30 },
        { value: 'NPM', count: 11 },
        { value: 'jQuery', count: 25 },
        { value: 'MongoDB', count: 18 },
        { value: 'JavaScript', count: 38 },
        { value: 'React', count: 30 },
        { value: 'Nodejs', count: 28 },
        { value: 'Express.js', count: 25 },
        { value: 'HTML5', count: 33 },
        { value: 'CSS3', count: 20 },
        { value: 'Webpack', count: 22 },
        { value: 'Babel.js', count: 7 },
        { value: 'ECMAScript', count: 25 },
        { value: 'Jest', count: 15 },
        { value: 'Mocha', count: 17 },
        { value: 'React Native', count: 27 },
        { value: 'Angular.js', count: 30 },
        { value: 'TypeScript', count: 15 },
        { value: 'Flow', count: 30 },
        { value: 'NPM', count: 11 },
        { value: 'jQuery', count: 25 },
        { value: 'MongoDB', count: 18 },
        { value: 'JavaScript', count: 38 },
        { value: 'React', count: 30 },
        { value: 'Nodejs', count: 28 },
        { value: 'Express.js', count: 25 },
        { value: 'HTML5', count: 33 },
        { value: 'CSS3', count: 20 },
        { value: 'Webpack', count: 22 },
        { value: 'Babel.js', count: 7 },
        { value: 'ECMAScript', count: 25 },
        { value: 'Jest', count: 15 },
        { value: 'Mocha', count: 17 },
        { value: 'React Native', count: 27 },
        { value: 'Angular.js', count: 30 },
        { value: 'TypeScript', count: 15 },
        { value: 'Flow', count: 30 },
        { value: 'NPM', count: 11 },
        { value: 'jQuery', count: 25 },
        { value: 'MongoDB', count: 18 },
        { value: 'JavaScript', count: 38 },
        { value: 'React', count: 30 },
        { value: 'Nodejs', count: 28 },
        { value: 'Express.js', count: 25 },
        { value: 'HTML5', count: 33 },
        { value: 'CSS3', count: 20 },
        { value: 'Webpack', count: 22 },
        { value: 'Babel.js', count: 7 },
        { value: 'ECMAScript', count: 25 },
        { value: 'Jest', count: 15 },
        { value: 'Mocha', count: 17 },
        { value: 'React Native', count: 27 },
        { value: 'Angular.js', count: 30 },
        { value: 'TypeScript', count: 15 },
        { value: 'Flow', count: 30 },
        { value: 'NPM', count: 11 },
        { value: 'jQuery', count: 25 },
        { value: 'MongoDB', count: 18 },
        { value: 'JavaScript', count: 38 },
        { value: 'React', count: 30 },
        { value: 'Nodejs', count: 28 },
        { value: 'Express.js', count: 25 },
        { value: 'HTML5', count: 33 },
        { value: 'CSS3', count: 20 },
        { value: 'Webpack', count: 22 },
        { value: 'Babel.js', count: 7 },
        { value: 'ECMAScript', count: 25 },
        { value: 'Jest', count: 15 },
        { value: 'Mocha', count: 17 },
        { value: 'React Native', count: 27 },
        { value: 'Angular.js', count: 30 },
        { value: 'TypeScript', count: 15 },
        { value: 'Flow', count: 30 },
        { value: 'NPM', count: 11 },
    ];

    return (
        <div
            className={'relative w-full flex p-2 lg:flex-row flex-col justify-center items-center grow'}>
            <div className={'lg:w-[30%] w-full contrast-75 max-h-[40vh] lg:max-h-[85vh] overflow-y-auto styled_scrollbar'}>
                <TagCloud tags={tags} onClick={(tag: string) => alert(tag)} theme={theme}/>
            </div>
            <div className={'lg:w-[70%] lg:p-0 pt-4 w-full h-[85vh] flex flex-col justify-between'}>
                <div className={'mobile:h-auto h-[30%] pl-4 w-full flex justify-between items-center mobile:flex-col'}>
                        <div className={'mobile:w-full w-[50%] flex flex-row mobile:mb-2'}>
                            <Table data={rows1} config={headCells1} onRowClick={() => {
                            }}/>
                            <div className={'max-w-[50px] min-w-[50px]'}></div>
                        </div>
                        <div className={'mobile:w-full w-[50%] flex flex-row-reverse '}>
                            <Link to={'/users'}
                                  className={'max-w-[50px] min-w-[50px] w-full flex justify-end lg:justify-center items-center opacity-30 hover:opacity-100'}>
                                <ArrowForwardIosIcon color={'inherit'} fontSize={"large"}/>
                            </Link>
                            <Table data={rows1} config={headCells1} onRowClick={(e, id) => {
                                document.location = '/users/' + id;
                            }}/>
                        </div>
                </div>
                <div className={'sm:max-h-[67%] w-full flex justify-end items-center'}>
                    <div className={'pl-4 grow h-full flex flex-row-reverse overflow-x-auto'}>
                        <Link to={'/collections'}
                              className={'max-w-[50px] min-w-[50px] flex justify-end lg:justify-center items-center opacity-30 hover:opacity-100'}>
                            <ArrowForwardIosIcon color={'inherit'} fontSize={"large"}/>
                        </Link>
                        <Table data={rows} config={headCells} onRowClick={(e, id) => {
                            document.location = '/collections/' + id;
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;