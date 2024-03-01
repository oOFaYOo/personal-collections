import React from "react";
import Table from "../../../components/Table";
import {Link, useLocation} from "react-router-dom";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

const headCells:{id:string, label:string, type: 'text' | 'paragraph' | 'number' | 'date' | 'checkbox'}[] = [
    {
        id: 'title',
        label: 'title',
        type: 'text',
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
];

const rows = [
    {id: '2', title: 'sometitle', date: '05.03.2021', amount: 354},
    {id: '3', title: 'sometitle3', date: '05.03.2022', amount: 543},
    {id: '7', title: 'sometitle1', date: '05.03.2015', amount: 154},
    {id: '8', title: 'sometitle', date: '05.03.2021', amount: 354},
    {id: '9', title: 'sometitle3', date: '05.03.2022', amount: 543},
    {id: '1', title: 'sometitle1', date: '05.03.2015', amount: 154},
    {id: '0', title: 'sometitle', date: '05.03.2021', amount: 354},
    {id: '87', title: 'sometitle3', date: '05.03.2022', amount: 543},
    {id: '89', title: 'sometitle1', date: '05.03.2015', amount: 154},
    {id: '34', title: 'sometitle', date: '05.03.2021', amount: 354},
    {id: 'jkljhk', title: 'sometitle3', date: '05.03.2022', amount: 543},
    {id: 'f5f7', title: 'sometitle1', date: '05.03.2015', amount: 154},
    {id: '9mu', title: 'sometitle', date: '05.03.2021', amount: 354},
    {id: 'c45e4', title: 'sometitle3', date: '05.03.2022', amount: 543},
    {id: 'mlkhk', title: 'sometitle1', date: '05.03.2015', amount: 154},
    {id: '6858', title: 'sometitle', date: '05.03.2021', amount: 354},
    {id: '23', title: 'sometitle3', date: '05.03.2022', amount: 543},
    {id: 'mi9hh', title: 'sometitle1', date: '05.03.2015', amount: 154},
];


const Collection = () => {
    // const [conf, setConf] = useState([{title:'title', type:'text'}, {title:'date', type:'date'}]);
    // const [data, setData] = useState([{title:'sometitle', date:'05.03.2021'}]);
    const path = useLocation().pathname;
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    return (
        <div
            className={'relative w-full flex flex-col justify-evenly items-center grow px-4 pb-2'}>
                <div className={'flex mobile:flex-col flex-row mobile:min-h-[500px] min-h-[350px] my-2 p-4 grow justify-between'}>
                    <div className={'mobile:w-full grow h-full flex justify-center items-center bg-red-500'}>
                        <img/>
                    </div>
                    <div className={'mobile:w-full mobile:ml-0 ml-4 w-[65%] flex flex-col justify-between'}>
                        <div className={'flex justify-between items-center mb-2'}>
                            <div>
                                <h1 className={'text-xl font-bold'}>Title</h1>
                                <h2 className={'text-md font-semibold italic'}>theme</h2>
                                <Link to={'/users/:id'}>
                                    <h3 className={'text-lg font-semibold'}>author</h3>
                                </Link>
                            </div>
                            <div className={'flex flex-row justify-between gap-2'}>
                                <Button size={'small'} variant="outlined" color={theme === 'dark' ? 'inherit' : 'primary'}>Add</Button>
                                <Button size={'small'} variant="outlined" color={theme === 'dark' ? 'inherit' : 'primary'}>Edit</Button>
                                <Button size={'small'} variant="outlined" color={theme === 'dark' ? 'inherit' : 'primary'}>Delete</Button>
                            </div>
                        </div>
                        <p className={'overflow-y-auto h-[80%] styled_scrollbar text-justify'}>
                            description description description description description description description description
                            description description description description description description description description
                            description description description description description description description description
                            description description description description description description description description
                        </p>
                    </div>
                </div>
               <Table sorting={true} pagination={true} data={rows} config={headCells} onRowClick={(e, id) => {
                   document.location = path + '/' + id;
               }} />
        </div>
    )
}

export default Collection;