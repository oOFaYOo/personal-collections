import React, {useState} from "react";
import Table from "../../../components/Table";
import {useLocation} from "react-router-dom";

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

    return (
        <div
            className={'relative w-full flex flex-col justify-evenly items-center grow'}>
                <div className={'flex mobile:flex-col flex-row mobile:min-h-[500px] my-2 p-4 grow justify-evenly'}>
                    <div className={'mobile:w-full w-[43%] h-full flex justify-center items-center bg-red-500'}>
                        <img/>
                    </div>
                    <div className={'mobile:w-full w-[43%] flex flex-col justify-between'}>
                        <h1>Title</h1>
                        <h3>theme</h3>
                        <p className={'overflow-y-auto h-[80%] styled_scrollbar'}>
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