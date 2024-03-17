import React from "react";

export interface IAdditionalInputsContainer {
    placeholder:string;
    name:string;
    values: string[];
    setValues: React.Dispatch<React.SetStateAction<string>>[];
}
