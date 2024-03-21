import React from "react";
import {ICollection} from "../../api_client/CollectionRequests/type";
import {IItem} from "../../api_client/ItemRequests/type";
import {AdditionalColumnType} from "../Table/type";

export interface IAdditionalFormDataContainer {
    type: AdditionalColumnType,
    title: string,
    currentCollection: ICollection,
    currentItem: IItem,
    values: (string | boolean)[],
    setValues: React.Dispatch<React.SetStateAction<(string | boolean)[]>>
}