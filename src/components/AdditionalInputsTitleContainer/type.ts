import React from "react";

export interface IAdditionalInputsTitleContainer {
    placeholder:string;
    name:string;
    values: string[];
    setValues: React.Dispatch<React.SetStateAction<string>>[];
}
