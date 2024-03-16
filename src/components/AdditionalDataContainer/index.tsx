import React from "react";
import {IAdditionalDataContainer} from "./type";

const AdditionalDataContainer = ({keys, item, date = false} : IAdditionalDataContainer) => {

    if (item[keys[0]] || item[keys[1]] || item[keys[2]]) {
        return (
            <div className={'flex flex-col'}>
                {
                    keys.map((value, i) => {
                        if (item[value]) {
                            return <h3 className={'font-semibold'}>{item.collection[value].label}:
                                <p className={'font-normal opacity-70'}>
                                    {date ? item[value].split('-').reverse().join('.') : item[value]}
                                </p>
                            </h3>
                        } else return null
                    })
                }
            </div>
        )
    } else return null
}

export default AdditionalDataContainer;