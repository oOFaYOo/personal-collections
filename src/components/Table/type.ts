import React from "react";

export interface ITableHead {
    onRequestSort: (event: React.MouseEvent, property: string) => void;
    order: OrderType;
    orderBy: string;
    rowCount: number;
    config: ITableItem[];
    filtering?: boolean,
}

export interface ITable {
    pagination?: boolean,
    filtering?: boolean,
    onRowClick?: (event: React.MouseEvent, id: string, row?:{ [p: string]: any }) => void,
    data: any[],
    config: ITableItem[]
}

export type OrderType = 'asc' | 'desc';

export type AdditionalColumnType = 'text' | 'paragraph' | 'number' | 'date' | 'checkbox' | 'picture' | 'action';

export interface ITableItem {
    id: string;
    label: string;
    type: AdditionalColumnType
}

export interface ITableCell {
    row: { [p: string]: any };
    item: ITableItem;
}

export interface ITableRow {
    row: { [p: string]: any };
    config: ITableItem[];
    onRowClick?: (event: React.MouseEvent, id: string, row?:{ [p: string]: any }) => void;
}

export interface IAction {
    name: string;
    callback: any;
    active?: boolean;
}
