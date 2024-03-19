import React from "react";
import CustomInput from "../inputs/CustomInput";
import {IAdditionalInputsTitleContainer} from "./type";

const AdditionalInputsTitleContainer = ({placeholder, name, values, setValues} : IAdditionalInputsTitleContainer) => {

    return (
        <div className={'flex flex-col gap-2'}>
            {
                values.map((value, i) => {
                    return <CustomInput emptyEffect={!value} value={value} setValue={setValues[i]}
                                        placeholder={placeholder} key={value + `${i}`}
                                        name={name + `${i+1}`} size={'small'}/>
                })
            }
        </div>
    )
}

export default AdditionalInputsTitleContainer;