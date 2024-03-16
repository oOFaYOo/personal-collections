import React from "react";
import CustomInput from "../inputs/CustomInput";
import {IAdditionalInputsContainer} from "./type";

const AdditionalInputsContainer = ({placeholder, name, values, setValues} : IAdditionalInputsContainer) => {

    return (
        <div className={'flex flex-col gap-2'}>
            {
                values.map((value, i) => {
                    return <CustomInput emptyEffect={!value} value={value} setValue={setValues[i]}
                                        placeholder={placeholder}
                                        name={name + `${i+1}`} size={'small'}/>
                })
            }
        </div>
    )
}

export default AdditionalInputsContainer;