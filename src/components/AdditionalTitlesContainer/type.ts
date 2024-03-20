import React from "react";

export interface IAdditionalTitlesContainer {
    title: string,
    values: (string | null)[],
    setValues:  React.Dispatch<React.SetStateAction<(string | null)[]>>,
    placeholder: string
}