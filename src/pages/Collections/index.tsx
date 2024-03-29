import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import Table from "../../components/Table"
import {ITableItem} from "../../components/Table/type";
import api from "../../api_client";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {filter} from "../../components/Table/functions";
import {useTranslation} from "react-i18next";
import {ICollection} from "../../api_client/CollectionRequests/type";
import {makeRequest} from "../../functions";
import getConfig from "../../tableConfigs";

const Collections = () => {
    const path = useLocation().pathname;
    const {filterByTheme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [collections, setCollections] = useState<ICollection[] | null>(null);

    const {t} = useTranslation();
    const config: ITableItem[] = getConfig(t, 'table.title').collections;

    useEffect(() => {
        makeRequest(collections, setCollections, api.CollectionRequests.getCollections())
    }, [])

    return (
        <div
            className={'relative w-full flex flex-wrap justify-evenly items-center grow p-4'}>
            {
                !collections
                    ? <CircularProgress/>
                    : <Table pagination={true}
                             data={filter(collections, filterByTheme)}
                             config={config}
                             onRowClick={(e, id) => {
                                 document.location = path + '/' + id;
                             }}/>
            }

        </div>
    )
}

export default React.memo(Collections);