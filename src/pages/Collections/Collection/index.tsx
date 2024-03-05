import React, {useState} from "react";
import Table from "../../../components/Table";
import {Link, useLocation} from "react-router-dom";
import {Button, Modal} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
// @ts-ignore
import noImg from "../../../svg/no-img.svg";
import ItemForm from "../../../components/forms/ItemForm";
import CollectionForm from "../../../components/forms/CollectionForm";

const headCells: { id: string, label: string, type: 'text' | 'paragraph' | 'number' | 'date' | 'checkbox' | 'picture' }[] = [
    {
        id: 'picture',
        label: '',
        type: 'picture'
    },
    {
        id: 'id',
        label: 'ID',
        type: 'text',
    },
    {
        id: 'title',
        label: 'Title',
        type: 'text',
    },
    {
        id: 'tags',
        label: 'Tags',
        type: 'paragraph',
    },
    {
        id: 'date',
        label: 'date',
        type: 'date',
    },
    {
        id: 'amount',
        label: 'amount',
        type: 'number'
    },
    {
        id: 'somebool',
        label: 'somebool',
        type: 'checkbox'
    },
];

const rows = [
    {
        id: '2',
        tags: '#dfhj #fjgdlk #gfj #hdjfhkd #kdfngd #fjbd #gssydg',
        title: 'sometitle',
        somebool: true,
        date: '05.03.2021',
        amount: 354,
        picture: 'other'
    },
    {
        id: '3',
        tags: '#dfhj #fjgdlk #gfj #hdjfhkd #kdfngd #fjbd #gssydg',
        title: 'sometitle3',
        somebool: false,
        date: '05.03.2022',
        amount: 543,
        picture: 'other'
    },
    {
        id: '7',
        tags: '#dfhj #fjgdlk #gfj #hdjfhkd #kdfngd #fjbd #gssydg',
        title: 'sometitle1',
        somebool: true,
        date: '05.03.2015',
        amount: 154,
        picture: 'other'
    },
    {
        id: '8',
        tags: '#dfhj #fjgdlk #gfj #hdjfhkd #kdfngd #fjbd #gssydg',
        title: 'sometitle',
        somebool: false,
        date: '05.03.2021',
        amount: 354,
        picture: 'other'
    },
    {
        id: '9',
        tags: '#dfhj #fjgdlk #gfj #hdjfhkd #kdfngd #fjbd #gssydg',
        title: 'sometitle3',
        somebool: true,
        date: '05.03.2022',
        amount: 543,
        picture: 'other'
    },
    {
        id: '1',
        tags: '#dfhj #fjgdlk #gfj #hdjfhkd #kdfngd #fjbd #gssydg',
        title: 'sometitle1',
        somebool: false,
        date: '05.03.2015',
        amount: 154,
        picture: 'other'
    },
    {
        id: '0',
        tags: '#dfhj #fjgdlk #gfj #hdjfhkd #kdfngd #fjbd #gssydg',
        title: 'sometitle',
        somebool: true,
        date: '05.03.2021',
        amount: 354,
        picture: 'other'
    },
    {
        id: '87',
        tags: '#dfhj #fjgdlk #gfj #hdjfhkd #kdfngd #fjbd #gssydg',
        title: 'sometitle3',
        somebool: false,
        date: '05.03.2022',
        amount: 543,
        picture: 'other'
    },
    {
        id: '89',
        tags: '#dfhj #fjgdlk #gfj #hdjfhkd #kdfngd #fjbd #gssydg',
        title: 'sometitle1',
        somebool: true,
        date: '05.03.2015',
        amount: 154,
        picture: 'other'
    },
    {
        id: '34',
        tags: '#dfhj #fjgdlk #gfj #hdjfhkd #kdfngd #fjbd #gssydg',
        title: 'sometitle',
        somebool: false,
        date: '05.03.2021',
        amount: 354,
        picture: 'other'
    },
    {
        id: 'jkljhk',
        tags: '#dfhj #fjgdlk #gfj #hdjfhkd #kdfngd #fjbd #gssydg',
        title: 'sometitle3',
        somebool: true,
        date: '05.03.2022',
        amount: 543,
        picture: 'other'
    },
    {
        id: 'f5f7',
        tags: '#dfhj #fjgdlk #gfj #hdjfhkd #kdfngd #fjbd #gssydg',
        title: 'sometitle1',
        somebool: false,
        date: '05.03.2015',
        amount: 154,
        picture: 'other'
    },
    {
        id: '9mu',
        tags: '#dfhj #fjgdlk #gfj #hdjfhkd #kdfngd #fjbd #gssydg',
        title: 'sometitle',
        somebool: true,
        date: '05.03.2021',
        amount: 354,
        picture: 'other'
    },
    {
        id: 'c45e4',
        tags: '#dfhj #fjgdlk #gfj #hdjfhkd #kdfngd #fjbd #gssydg',
        title: 'sometitle3',
        somebool: false,
        date: '05.03.2022',
        amount: 543,
        picture: 'other'
    },
    {
        id: 'mlkhk',
        tags: '#dfhj #fjgdlk #gfj #hdjfhkd #kdfngd #fjbd #gssydg',
        title: 'sometitle1',
        somebool: true,
        date: '05.03.2015',
        amount: 154,
        picture: 'other'
    },
    {
        id: '6858',
        tags: '#dfhj #fjgdlk #gfj #hdjfhkd #kdfngd #fjbd #gssydg',
        title: 'sometitle',
        somebool: false,
        date: '05.03.2021',
        amount: 354,
        picture: 'other'
    },
    {
        id: '23',
        tags: '#dfhj #fjgdlk #gfj #hdjfhkd #kdfngd #fjbd #gssydg',
        title: 'sometitle3',
        somebool: true,
        date: '05.03.2022',
        amount: 543,
        picture: 'other'
    },
    {
        id: 'mi9hh',
        tags: '#dfhj #fjgdlk #gfj #hdjfhkd #kdfngd #fjbd #gssydg',
        title: 'sometitle1',
        somebool: false,
        date: '05.03.2015',
        amount: 154,
        picture: 'other'
    },
];


const Collection = () => {
    // const [conf, setConf] = useState([{title:'title', type:'text'}, {title:'date', type:'date'}]);
    // const [data, setData] = useState([{title:'sometitle', date:'05.03.2021'}]);
    const path = useLocation().pathname;
    const [openModal, setOpenModal] = useState<'item' | 'collection' | string>('');
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const items = [1];
    const avatar = 'g';

    return (
        <div
            className={'relative w-full flex flex-col justify-evenly items-center grow px-4 pb-2'}>
            {
                <Modal
                    open={!!openModal}
                    onClose={()=> {
                        setOpenModal('');
                    }}
                    sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
                >
                    {   openModal === 'item'
                        ? <ItemForm/>
                        : <CollectionForm/>
                    }
                </Modal>
            }
            <div className={'flex flex-col md:flex-row md:max-h-[40vh] my-4 grow justify-between'}>
                <div className={'w-full lg:w-[35%] h-[300px] grow md:h-full flex justify-center items-center'}>
                    {
                        avatar
                            ? <img
                                src={'https://sun9-27.userapi.com/impg/M2gNPOTpINWsFHVOpjc-RSk2rpNKlAfEriopig/ukWQzow150s.jpg?size=1024x1024&quality=96&sign=3908fb39593d5a5b7e8909ce936462bf&type=album'}
                                className={'relative h-full rounded-full shadow-md'}/>
                            : <div
                                className={'relative h-[300px] w-[300px] rounded-full shadow-md overflow-hidden flex justify-center items-center bg-neutral-100'}>
                                <img src={noImg} className={'relative max-w-[140%]'}/></div>
                    }
                </div>
                <div className={'w-full md:h-full h-[30vh] md:ml-4 lg:w-[65%] flex flex-col justify-between'}>
                    <div className={'flex justify-between items-center mb-2'}>
                        <div>
                            <h1 className={'text-xl font-bold'}>Title</h1>
                            <h2 className={'font-semibold italic'}>theme</h2>
                            <Link to={'/users/:id'}>
                                <h3 className={'text-lg font-semibold'}>author</h3>
                            </Link>
                        </div>
                        <div className={'flex flex-row justify-between gap-2'}>
                            {
                                items.length === 0
                                    ? null
                                    : <Button size={'small'} variant="outlined" onClick={()=>setOpenModal('item')}>Add</Button>
                            }
                            <Button size={'small'} variant="outlined" onClick={()=>setOpenModal('collection')}>Edit</Button>
                            <Button size={'small'} variant="outlined">Delete</Button>
                        </div>
                    </div>
                    <p className={'overflow-y-auto w-full md:h-[80%] styled_scrollbar text-justify opacity-70'}>
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                        description description description description description description description description
                    </p>
                </div>
            </div>
            {
                items.length === 0
                    ? <div className={'my-8'}><Button size={'large'} variant="outlined" onClick={()=>setOpenModal('item')}>
                        add your first item</Button>
                        </div>
                    : <Table sorting={true} pagination={true} data={rows} config={headCells} onRowClick={(e, id) => {
                        document.location = path + '/' + id;
                    }}/>
            }
        </div>
    )
}

export default Collection;