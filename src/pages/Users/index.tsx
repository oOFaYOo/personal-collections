import React from "react";
import Table from "../../components/Table"
import {useLocation} from "react-router-dom";

const headCells:{id:string, label:string, type: 'text' | 'paragraph' | 'number' | 'date' | 'checkbox' | 'picture' | 'action'}[] = [
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
    {
        id: 'action',
        label: '',
        type: 'action'
    },
];

const rows = [
    {
        id: '123543',
        picture: 'user',
        name: 'Sometitle',
        amountC: 4,
        amountI: 13,
        action: [{name:'admin', callback:(id:string)=>{alert(id)}, active:false}, {name:'block', callback:()=>{}, active:false}, {name:'delete', callback:()=>{}}]
    },
    {
        id: '123543',
        picture: 'user',
        name: 'Sometitle',
        amountC: 4,
        amountI: 13,
        action: [{name:'admin', callback:(id:string)=>{alert(id)}, active:true}, {name:'block', callback:()=>{}, active:false}, {name:'delete', callback:()=>{}}]
    },
    {
        id: '123543',
        picture: 'user',
        name: 'Sometitle',
        amountC: 4,
        amountI: 13,
        action: [{name:'admin', callback:(id:string)=>{alert(id)}, active:false}, {name:'block', callback:()=>{}, active:true}, {name:'delete', callback:()=>{}}]
    },
    {
        id: '123543',
        picture: 'user',
        name: 'Sometitle',
        amountC: 4,
        amountI: 13,
        action: [{name:'admin', callback:(id:string)=>{alert(id)}, active:true}, {name:'block', callback:()=>{}, active:true}, {name:'delete', callback:()=>{}}]
    },
    {
        id: '123543',
        picture: 'user',
        name: 'Sometitle',
        amountC: 4,
        amountI: 13,
        action: [{name:'admin', callback:(id:string)=>{alert(id)}, active:false}, {name:'block', callback:()=>{}, active:false}, {name:'delete', callback:()=>{}}]
    },
    {
        id: '123543',
        picture: 'user',
        name: 'Sometitle',
        amountC: 4,
        amountI: 13,
        action: [{name:'admin', callback:(id:string)=>{alert(id)}, active:true}, {name:'block', callback:()=>{}, active:true}, {name:'delete', callback:()=>{}}]
    },
    {
        id: '123543',
        picture: 'user',
        name: 'Sometitle',
        amountC: 4,
        amountI: 13,
        action: [{name:'admin', callback:(id:string)=>{alert(id)}, active:true}, {name:'block', callback:()=>{}, active:true}, {name:'delete', callback:()=>{}}]
    },
    {
        id: '123543',
        picture: 'user',
        name: 'Sometitle',
        amountC: 4,
        amountI: 13,
        action: [{name:'admin', callback:(id:string)=>{alert(id)}, active:false}, {name:'block', callback:()=>{}, active:false}, {name:'delete', callback:()=>{}}]
    },
    {
        id: '123543',
        picture: 'user',
        name: 'Sometitle',
        amountC: 4,
        amountI: 13,
        action: [{name:'admin', callback:(id:string)=>{alert(id)}, active:false}, {name:'block', callback:()=>{}, active:true}, {name:'delete', callback:()=>{}}]
    },
];

const Users = () => {
    // const [conf, setConf] = useState([{title:'title', type:'text'}, {title:'date', type:'date'}]);
    // const [data, setData] = useState([{title:'sometitle', date:'05.03.2021'}]);
    const path = useLocation().pathname;

    return (
        <div
            className={'relative w-full flex flex-wrap justify-evenly items-center grow p-4'}>
               <Table pagination={true} sorting={true} data={rows} config={headCells} onRowClick={(e, id) => {
                   document.location = path + '/' + id;
               }} />
        </div>
    )
}

export default Users;