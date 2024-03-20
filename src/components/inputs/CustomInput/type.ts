import React from "react";

export interface ICustomInput {
    value:string;
    setValue: (string:string)=>void;
    name:string;
    placeholder:string;
    size?:"small" | "medium";
    type?: React.HTMLInputTypeAttribute;
    required?:boolean;
    disabled?:boolean;
    multiline?:boolean;
}