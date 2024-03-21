import React, {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import Table from "../../components/Table"
import {ITableItem} from "../../components/Table/type";
import api from "../../api_client";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {filter} from "../../components/Table/functions";
import {useTranslation} from "react-i18next";
import {IItem} from "../../api_client/ItemRequests/type";
import {makeRequest} from "../../functions";
import getConfig from "../../tableConfigs";

const Items = () => {
    const {filterByTheme} = useSelector((state: RootState) => state.PersonalCollectionsStore);
    const [items, setItems] = useState<IItem[] | null>(null);

    const {t} = useTranslation();
    const config: ITableItem[] = getConfig(t, 'table.title').items as ITableItem[];

    useEffect(() => {
        makeRequest(items, setItems, api.ItemRequests.getItems())
    }, [])

    return (
        <div
            className={'relative w-full flex flex-wrap justify-evenly items-center grow p-4'}>
            {
                !items
                    ? <CircularProgress/>
                    : <Table pagination={true}
                             data={filter(items, filterByTheme)}
                             config={config}
                             onRowClick={(e, id, row) => {
                                 document.location = `/collections/${row?.collection.id}/${id}`;
                             }}/>
            }
        </div>
    )
}

export default React.memo(Items);