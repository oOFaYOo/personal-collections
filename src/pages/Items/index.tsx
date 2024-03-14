import React, {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import Table from "../../components/Table"
import {ITableItem} from "../../components/Table/type";
import {IItem} from "../../api_client/type";
import api from "../../api_client";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {filter} from "../../components/Table/functions";

const config: ITableItem[] = [
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
      id:'userName',
      label: 'Author',
      type: 'text',
    },
    {
        id: 'tags',
        label: 'Tags',
        type: 'paragraph',
    }
];

const Items = () => {
    const {filterByTheme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [items, setItems] = useState<IItem[] | null>(null);

    useEffect(() => {
        (
            async () => {
                if (!items) {
                    const response = await api.getItems();
                    if (response.status === 200) {
                        setItems(response.data)
                    }
                }
            }
        )()
    }, [])

    return (
        <div
            className={'relative w-full flex flex-wrap justify-evenly items-center grow p-4'}>
            {
                !items
                ? <CircularProgress />
                : <Table pagination={true}
                         data={filter(items, filterByTheme)}
                         config={config}
                         onRowClick={(e, id, row) => {
                        document.location = `/collections/${row?.collection.id}/${id}`;
                    }} />
            }

        </div>
    )
}

export default Items;