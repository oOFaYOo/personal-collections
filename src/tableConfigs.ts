import {ITableItem} from "./components/Table/type";

function getConfig(t:any, name:string){
    const optionalPart2: ITableItem[] = [
        {
            id: 'theme',
            label: t("table.theme"),
            type: 'text',
        },
        {
            id: 'description',
            label: t("table.description"),
            type: 'paragraph'
        },
    ];
    const optionalPart1: ITableItem[] = [
        {
            id: 'theme',
            label: t("table.theme"),
            type: 'text',
        },
        {
            id: 'tags',
            label: t("table.tags"),
            type: 'paragraph',
        },
    ];
    const base: ITableItem[] = [
        {
            id: 'picture',
            label: '',
            type: 'picture'
        },
        {
            id: 'name',
            label: t(name),
            type: 'text',
        },
    ];

    return {
        users:[...base,
            {id: 'amountCollections', label: t("table.amountCollections"), type: 'text'},
            {id: 'description', label: t("table.description"), type: 'paragraph'},
        ],
        user:[...base,...optionalPart2],
        items:[...base, ...optionalPart1, {id:'userName', label: t("table.userName"), type: 'text'}],
        collections:[...base,...optionalPart2],
        collection:[...base, ...optionalPart1],
        main:{
            users:[...base, {id: 'amountCollections', label: t("table.amountCollections"), type: 'text'}],
            items:[...base,
                {id: 'collectionName', label:  t("table.collectionName"), type: 'text'},
                {id:'userName', label: t("table.userName"), type: 'text'}],
            collections:[...base, ...optionalPart2],
        }
    }
}

export default getConfig;
