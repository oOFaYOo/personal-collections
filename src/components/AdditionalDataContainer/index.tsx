import React from "react";
import {IAdditionalDataContainer} from "./type";
import {Checkbox} from "@mui/material";

const AdditionalDataContainer = ({itemKey, item, date = false}: IAdditionalDataContainer) => {
    return <div className={'flex flex-col'}>
        {
            [1, 2, 3].map((value) => {
                if (item[itemKey + 1] || item[itemKey + 2] || item[itemKey + 3]) {
                    return <>
                        {
                            item[itemKey + value] || itemKey ===  'checkbox'
                                ? <h3 className={'font-semibold'}>{item.collection[itemKey + value].label}:
                                    {
                                        itemKey === 'checkbox'
                                            ? <div>
                                                <Checkbox disabled defaultChecked={item[itemKey + value]} sx={{
                                                    padding: 0,
                                                    color: 'inherit',
                                                    opacity: '0.7',
                                                    '&.Mui-disabled': {
                                                        color: 'inherit',
                                                        opacity: '0.3',
                                                    }
                                                }}/>
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