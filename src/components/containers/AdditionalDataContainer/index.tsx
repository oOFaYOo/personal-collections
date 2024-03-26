import React from "react";
import {IAdditionalDataContainer} from "./type";
import Checkbox from "../../inputs/Checkbox";

const AdditionalDataContainer = ({itemKey, item, date = false}: IAdditionalDataContainer) => {
    return <div className={'flex flex-col'}>
        {
            [1, 2, 3].map((value) => {
                if (item[itemKey + 1] || item[itemKey + 2] || item[itemKey + 3]) {
                    return <>
                        {
                            item.collection[itemKey + value].label
                                ? <h3 className={'font-semibold'}>{item.collection[itemKey + value].label}:
                                    {
                                        itemKey === 'checkbox'
                                            ? <div>
                                                <Checkbox className={'opacity-70'} disabled checked={item[itemKey + value]}/>
                                            </div>
                                            : <p className={'font-normal opacity-70'}>
                                                {date ? item[itemKey + value].split('-').reverse().join('.') : item[itemKey + value]}
                                            </p>
                                    }
                                </h3>
                                : null
                        }
                    </>
                } else return null
            })
        }
    </div>
}

export default AdditionalDataContainer;