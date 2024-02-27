import React, {useState} from "react";
import Table from "../../components/Table"

const Collections = () => {
    // const [conf, setConf] = useState([{title:'title', type:'text'}, {title:'date', type:'date'}]);
    // const [data, setData] = useState([{title:'sometitle', date:'05.03.2021'}]);

    return (
        <div
            className={'relative w-full flex flex-wrap justify-evenly items-center grow'}>
               <Table />
        </div>
    )
}

export default Collections;