import React from "react";

export interface IMultiTextInput  {
    value:string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    name:string;
    placeholder:string;
    size?:"small" | "medium";
    type?: React.HTMLInputTypeAttribute;
    required?:boolean;
}