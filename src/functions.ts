import {ITableItem} from "./components/Table/type";
import {IUser} from "./api_client/UserRequests/type";
import {IItem} from "./api_client/ItemRequests/type";
import {ICollection} from "./api_client/CollectionRequests/type";
import api from "./api_client";
import {useLocation} from "react-router-dom";

export async function makeRequest(
    data: any,
    setData: React.Dispatch<React.SetStateAction<any>>,
    request: Promise<{ status: number, data: any }>,
    update?: boolean,
    setUpdate?: React.Dispatch<React.SetStateAction<boolean>>, handler?: (data: any) => any) {
    if (!data || update) {
        const response = await request;
        if (response.status === 200) {
            setData(handler ? handler(response.data) : response.data);
        }
    }
    if (setUpdate) setUpdate(false);
}

export function handleConfigActions(config: ITableItem[], currentUser: IUser) {
    if (!config.find(c => c.id === 'action') && currentUser && currentUser.isAdmin) {
        config.push({
            id: 'action',
            label: '',
            type: 'action'
        });
    }

    if (config.find(c => c.id === 'action') && (!currentUser || !currentUser.isAdmin)) {
        config.pop();
    }
    return config;
}

export function handleConfigTextDate(config: ITableItem[], collection: ICollection) {
    let updatedConfig = [...config];
    if (collection) {
        for (let value of Object.values(collection)) {
            if (!!value.label && (value.type === 'text' || value.type === 'date')) {
                updatedConfig.push({
                    id: value.id,
                    label: value.label,
                    type: value.type
                });
            }
        }
        return updatedConfig;
    }
}

export function getAccordionData(item: IItem) {
    const accordionData = [];
    if (item.paragraph1) accordionData.push({
        title: (item.collection as ICollection).paragraph1.label,
        details: item.paragraph1
    })
    if (item.paragraph2) accordionData.push({
        title: (item.collection as ICollection).paragraph2.label,
        details: item.paragraph2
    })
    if (item.paragraph3) accordionData.push({
        title: (item.collection as ICollection).paragraph3.label,
        details: item.paragraph3
    })
    return accordionData;
}