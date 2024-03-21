import React from "react";

export interface IInput {
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