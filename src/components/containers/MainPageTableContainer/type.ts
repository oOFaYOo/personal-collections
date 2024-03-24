import {ITableItem} from "../../Table/type";

export interface IMainPageTableContainer {
    data: any[];
    config: ITableItem[];
    className: string;
    url: string;
    onRowClick: (e: React.MouseEvent<Element, MouseEvent>, id:string, row: {[p: string]: any}) => void;
}