import React from "react";
import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomInput from "../inputs/CustomInput";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {IAdditionalTitlesContainer} from "./type";
import {useTranslation} from "react-i18next";

const AdditionalTitlesContainer = ({title, values, setValues}:IAdditionalTitlesContainer) => {
    const {t} = useTranslation();
    return (
        <div className={'flex flex-col gap-2 lg:w-[230px] w-full'}>
            <h3 className={'w-[calc(100%-24px)] text-center italic font-semibold'}>{`${title} ${t('fields')}`}</h3>
            {
                !values.includes(null)
                    ? null
                    : <Button className={'w-[calc(100%-24px)]'} size={'small'} variant="outlined" onClick={()=>{
                        const arr = [...values];
                        arr[values.indexOf(null)] = '';
                        setValues(arr)
                    }}>
                        <AddIcon fontSize={'small'}/>{t('buttons.addfield')}
                    </Button>
            }
            {
                values.map((value, index) => {
                    if(value === null) return null;
                    else return <div className={'flex'}>
                        <CustomInput
                            value={value}
                            name={''}
                            key={index}
                            size={'small'}
                            type={'text'}
                            required
                            placeholder={`${t('titleof')} ${t('field')}`}
                            setValue={(string)=>{
                                const arr = [...values];
                                arr[index] = string;
                                setValues(arr);
                            }}
                        />
                        <button onClick={()=>{
                            const arr = [...values];
                            arr[index] = null;
                            setValues(arr);
                        }
                        }><DeleteOutlineIcon className={'cursor-pointer opacity-30 hover:opacity-100'} />
                        </button>
                    </div>
                })
            }
        </div>
    )
}

export default AdditionalTitlesContainer;