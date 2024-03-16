import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import Table from "../../components/Table"
import {ITableItem} from "../../components/Table/type";
import {ICollection} from "../../api_client/type";
import api from "../../api_client";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {filter} from "../../components/Table/functions";

const config: ITableItem [] = [
    {
        id: 'picture',
        label: '',
        type: 'picture'
    },
    {
        id: 'name',
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

const Collections = () => {
    const path = useLocation().pathname;
    const {filterByTheme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [collections, setCollections] = useState<ICollection[] | null>(null);

    useEffect(() => {
        (
            async () => {
                if (!collections) {
                    const response = await api.getCollections();
                    if (response.status === 200) {
                        setCollections(response.data)
                    }
                }
            }
        )()
    }, [])

    return (
        <div
            className={'relative w-full flex flex-wrap justify-evenly items-center grow p-4'}>
            {
                !collections
                ? <CircularProgress />
                : <Table pagination={true}
                         data={filter(collections, filterByTheme)}
                         config={config}
                         onRowClick={(e, id) => {
                        document.location = path + '/' + id;
                    }} />
            }

        </div>
    )
}

export default React.memo(Collections);