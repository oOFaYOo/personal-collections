import React from "react";
import {Link} from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import TagCloud from "../../components/TagCloud";
import Table from "../../components/Table";

const Main = () => {

    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const headCells: { id: string, label: string, type: 'text' | 'paragraph' | 'number' | 'date' | 'checkbox' | 'picture' }[] = [
        {
            id: 'picture',
            label: '',
            type: 'picture',
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

    const headCells1: { id: string, label: string, type: 'text' | 'paragraph' | 'number' | 'date' | 'checkbox' | 'picture' }[] = [
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
            id: 'collection',
            label: 'Collection',
            type: 'text',
        },
        {
            id: 'author',
            label: 'Author',
            type: 'text'
        },

    ];

    const headCells2: { id: string, label: string, type: 'text' | 'paragraph' | 'number' | 'date' | 'checkbox' | 'picture' }[] = [
        {
            id: 'picture',
            label: '',
            type: 'picture'
        },
        {
            id: 'name',
            label: 'Name',
            type: 'text',
        },
        {
            id: 'amountC',
            label: 'Collections',
            type: 'number',
        },
        {
            id: 'amountI',
            label: 'Items',
            type: 'number'
        },
    ];

    const rows = [
        {
            id: '123543',
            picture: 'other',
            title: 'Sometitle',
            theme: 'Books',
            description: 'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description',
        },
        {
            id: '123543',
            picture: 'other',
            title: 'Sometitle',
            theme: 'Books',
            description: 'description description description description description description description description description description description description',
        },
        {
            id: '123543',
            picture: 'other',
            title: 'Sometitle',
            theme: 'Books',
            description: 'description description description description description description description description description description description description',
        },
        {
            id: '123543',
            picture: 'other',
            title: 'Sometitle',
            theme: 'Books',
            description: 'description description description description description description description description description description description description',
        },
        {
            id: '123543',
            picture: 'other',
            title: 'Sometitle',
            theme: 'Books',
            description: 'description description description description description description description description description description description description',
        },

    ];

    const rows1 = [
        {
            id: '123543',
            title: 'Sometitle',
            collection: 'Books',
            author: 'Alex Trt',
            picture: 'other'
        },
        {
            id: '123543',
            title: 'Sometitle',
            collection: 'Books',
            author: 'Alex Trt',
            picture: 'other'
        },
        {
            id: '123543',
            title: 'Sometitle',
            collection: 'Books',
            author: 'Alex Trt',
            picture: 'other'
        },
    ];
    const rows2 = [
        {
            id: '123543',
            picture: 'user',
            name: 'Sometitle',
            amountC: 4,
            amountI: 13,
        },
        {
            id: '123543',
            picture: 'user',
            name: 'Sometitle',
            amountC: 4,
            amountI: 13,
        },
        {
            id: '123543',
            picture: 'user',
            name: 'Sometitle',
            amountC: 4,
            amountI: 13,
        },
    ];

    const tags = [
        {value: 'jQuery', count: 25},
        {value: 'MongoDB', count: 18},
        {value: 'JavaScript', count: 38},
        {value: 'React', count: 30},
        {value: 'Nodejs', count: 28},
        {value: 'Express.js', count: 25},
        {value: 'HTML5', count: 33},
        {value: 'CSS3', count: 20},
        {value: 'Webpack', count: 22},
        {value: 'Babel.js', count: 7},
        {value: 'ECMAScript', count: 25},
        {value: 'Jest', count: 15},
        {value: 'Mocha', count: 17},
        {value: 'React Native', count: 27},
        {value: 'Angular.js', count: 30},
        {value: 'TypeScript', count: 15},
        {value: 'Flow', count: 30},
        {value: 'NPM', count: 11},
        {value: 'jQuery', count: 25},
        {value: 'jQuery', count: 25},
        {value: 'MongoDB', count: 18},
        {value: 'JavaScript', count: 38},
        {value: 'React', count: 30},
        {value: 'Nodejs', count: 28},
        {value: 'Express.js', count: 25},
        {value: 'HTML5', count: 33},
        {value: 'CSS3', count: 20},
        {value: 'Webpack', count: 22},
        {value: 'Babel.js', count: 7},
        {value: 'ECMAScript', count: 25},
        {value: 'Jest', count: 15},
        {value: 'Mocha', count: 17},
        {value: 'React Native', count: 27},
        {value: 'Angular.js', count: 30},
        {value: 'TypeScript', count: 15},
        {value: 'Flow', count: 30},
        {value: 'NPM', count: 11},
        {value: 'jQuery', count: 25},
    ];

    return (
        <div
            className={'relative w-full flex p-2 lg:flex-row flex-col-reverse justify-center items-center grow gap-4'}>
            <div className={`${theme === 'dark' ? 'shadow-black/70' : ''} justify-start rounded-md shadow-md lg:w-[20%] 
            w-full contrast-75 max-h-[40vh] lg:max-h-[85vh] overflow-y-auto styled_scrollbar`}>
                <TagCloud tags={tags} onClick={(tag: string) => alert(tag)}/>
            </div>
            <div className={'lg:w-[80%] lg:p-0 pt-4 w-full md:h-[85vh] flex flex-col justify-between'}>
                <div
                    className={'h-auto mb-8 md:h-[30%] lg:pl-4 w-full flex justify-between items-center flex-col md:flex-row'}>
                    <div className={'w-full md:w-[50%] mobile:flex-col flex flex-row-reverse md:mb-0 mb-8'}>
                        <Link to={'/items'}
                              className={'max-w-[50px] min-w-[50px] mobile:min-w-full flex justify-end lg:justify-center ' +
                                  'items-center opacity-30 hover:opacity-100'}>
                            <ArrowForwardIosIcon color={'inherit'} fontSize={"large"}/>
                        </Link>
                        <Table data={rows1} config={headCells1}/>
                    </div>
                    <div className={'w-full md:w-[50%] mobile:flex-col flex flex-row-reverse'}>
                        <Link to={'/users'}
                              className={'max-w-[50px] min-w-[50px] mobile:min-w-full flex justify-end lg:justify-center ' +
                                  'items-center opacity-30 hover:opacity-100'}>
                            <ArrowForwardIosIcon color={'inherit'} fontSize={"large"}/>
                        </Link>
                        <Table data={rows2} config={headCells2} onRowClick={(e, id) => {
                            document.location = '/users/' + id;
                        }}/>
                    </div>
                </div>
                <div className={'sm:max-h-[67%] w-full flex justify-end items-center'}>
                    <div
                        className={'lg:pl-4 grow mb-4 pb-2 h-full flex mobile:flex-col flex-row-reverse overflow-x-auto'}>
                        <Link to={'/collections'}
                              className={'max-w-[50px] min-w-[50px] mobile:min-w-full flex justify-end lg:justify-center ' +
                                  'items-center opacity-30 hover:opacity-100'}>
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