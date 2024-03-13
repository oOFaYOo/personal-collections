import React, {useState} from "react";
import InputFileUpload from "../../inputs/UploadImage";
import {Button, Checkbox, FormControlLabel} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import CustomInput from "../../inputs/CustomInput";
import MultiTextInput from "../../inputs/MultiTextInput";
import {IForm} from "../type";
import {ICollection} from "../../../api_client/type";

const InputForm = ({setOpenModal, currentCollection}:IForm & {currentCollection?:ICollection}) => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [name, setName] = useState('');
    const [tags, setTags] = useState('');

    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');

    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [number3, setNumber3] = useState(0);

    const [paragraph1, setParagraph1] = useState();
    const [paragraph2, setParagraph2] = useState();
    const [paragraph3, setParagraph3] = useState();

    const [checkbox1, setCheckbox1] = useState();
    const [checkbox2, setCheckbox2] = useState();
    const [checkbox3, setCheckbox3] = useState();

    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('2024-05-19');
    const [date3, setDate3] = useState('');

    return (
        <form className={`${theme === 'dark' ? 'bg-neutral-900 text-neutral-200' : 'bg-neutral-100 text-neutral-900'}
         p-8 gap-4 outline-none rounded-md shadow-md flex-col justify-evenly items-center overflow-y-auto max-h-[90vh] styled_scrollbar`}
              onSubmit={(e) => {
                  e.preventDefault();
                  setOpenModal(false);
              }}>
            <div className={'flex lg:flex-row gap-2 flex-col items-center justify-between mb-4'}>
                <InputFileUpload/>
                <CustomInput value={name} setValue={setName} placeholder={'Title'} name={'title'} required/>
                <MultiTextInput value={tags} setValue={setTags} name={'tags'} placeholder={"Tag, tag, tag..."} required/>
            </div>
            <div className={'flex flex-col items-center gap-4'}>
                <h3>Additional item Fields</h3>
                <div className={'flex lg:flex-row flex-col justify-evenly gap-2'}>
                    <div className={'flex flex-col gap-2'}>
                        <CustomInput value={text1} setValue={setText1} placeholder={currentCollection?.text1.label!} disabled={!currentCollection?.text1.label}
                                     name={'text1'} size={'small'}/>
                        <CustomInput value={text2} setValue={setText2} placeholder={currentCollection?.text2.label!} disabled={!currentCollection?.text2.label}
                                     name={'text2'} size={'small'}/>
                        <CustomInput value={text3} setValue={setText3} placeholder={currentCollection?.text3.label!} disabled={!currentCollection?.text3.label}
                                     name={'text3'} size={'small'}/>
                    </div>
                    <div className={'flex flex-col gap-2 mx-2'}>
                        <FormControlLabel control={<Checkbox defaultChecked sx={{
                                    padding: 0,
                                    color: 'inherit',
                                    '&.Mui-disabled': {
                                        color: 'inherit',
                                        opacity: '0.3',
                                    }
                                }}/>} label="Bool"/>
                        <FormControlLabel control={<Checkbox defaultChecked sx={{
                                    padding: 0,
                                    color: 'inherit',
                                    '&.Mui-disabled': {
                                        color: 'inherit',
                                        opacity: '0.3',
                                    }
                                }}/>} label="Bool"/>
                        <FormControlLabel control={<Checkbox defaultChecked sx={{
                                    padding: 0,
                                    color: 'inherit',
                                    '&.Mui-disabled': {
                                        color: 'inherit',
                                        opacity: '0.3',
                                    }
                                }}/>} label="Bool"/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <CustomInput value={number1} setValue={setNumber1}} type={'number'} name={'number1'} size={'small'}
                                     placeholder={currentCollection?.number1.label!} disabled={!currentCollection?.number1.label}/>
                        <CustomInput value={number2} setValue={setNumber2}} type={'number'} name={'number2'} size={'small'}
                                     placeholder={currentCollection?.number2.label!} disabled={!currentCollection?.number2.label}/>
                        <CustomInput value={number3} setValue={setNumber3}} type={'number'} name={'number3'} size={'small'}
                                     placeholder={currentCollection?.number3.label!} disabled={!currentCollection?.number3.label}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <CustomInput value={date1} setValue={setDate1} type={'date'} placeholder={'Date'} name={'date1'}
                                     size={'small'}/>
                        <CustomInput value={date2} setValue={setDate2} type={'date'} placeholder={'Date'} name={'date2'}
                                     size={'small'}/>
                        <CustomInput value={date3} setValue={setDate3} type={'date'} placeholder={'Date'} name={'date3'}
                                     size={'small'}/>
                    </div>
                </div>
                <div className={'flex lg:flex-row flex-col gap-2'}>
                    <MultiTextInput value={''} setValue={() => {
                    }} name={'description1'} placeholder={'Paragraph'}/>
                    <MultiTextInput value={''} setValue={() => {
                    }} name={'description2'} placeholder={'Paragraph'}/>
                    <MultiTextInput value={''} setValue={() => {
                    }} name={'description3'} placeholder={'Paragraph'}/>
                </div>
                <Button variant="outlined" type={'submit'}>ok</Button>
            </div>
        </form>
    )
}

export default InputForm;