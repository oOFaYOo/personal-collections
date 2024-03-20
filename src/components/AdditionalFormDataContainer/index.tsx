import React from "react";
import CustomInput from "../inputs/CustomInput";
import {useTranslation} from "react-i18next";
import {Checkbox} from "@mui/material";
import {IAdditionalFormDataContainer} from "./type";

const AdditionalFormDataContainer = ({title, type, currentCollection, currentItem, values, setValues} : IAdditionalFormDataContainer) => {
    const {t} = useTranslation();
    return (
        <>
            <h3 className={'text-center font-semibold italic'}>
                {title}
            </h3>
            <div className={`${type === 'checkbox' ? 'md:justify-evenly' : 'md:justify-between'} w-full flex gap-2 md:flex-row flex-col`}>
                {
                    values.map((value, i) => {
                            // @ts-ignore
                            const cC = currentCollection[type + (i + 1)].label;
                            if (type === 'checkbox') {
                                return (
                                    <div key={i} className={'flex md:flex-col flex-row-reverse justify-end gap-4 md:gap-0'}>
                                        <h4 className={'text-center italic h-6'}>{cC}</h4>
                                        <Checkbox
                                            checked={value as boolean}
                                            onChange={(e) => {
                                                const arr = [...values];
                                                arr[i] = e.currentTarget.checked;
                                                setValues(arr);
                                            }}
                                            disabled={!cC && !currentItem}
                                            sx={{
                                                padding: 0,
                                                color: 'inherit',
                                                '&.Mui-disabled': {
                                                    color: 'inherit',
                                                    opacity: '0.3',
                                                }
                                            }}/>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={i}>
                                        <h4 className={'text-center italic h-6'}>{cC}</h4>
                                        <CustomInput
                                            value={value as string}
                                            setValue={(string) => {
                                                const arr = [...values];
                                                arr[i] = string;
                                                setValues(arr);
                                            }}
                                            name={''}
                                            type={type === 'paragraph' ? 'text' : type}
                                            size={type === 'paragraph' ? 'medium' : 'small'}
                                            multiline={type === 'paragraph'}
                                            placeholder={cC ? type === 'paragraph'? t('longtext') : t(type !== 'date' ? type : '') : ''}
                                            disabled={!cC && !currentItem}/>
                                    </div>)
                            }

                        }
                    )
                }
            </div>
        </>
    )
}

export default React.memo(AdditionalFormDataContainer);