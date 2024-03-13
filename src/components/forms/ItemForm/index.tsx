import React, {useState} from "react";
import InputFileUpload from "../../inputs/UploadImage";
import {Button, Checkbox, FormControlLabel} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import CustomInput from "../../inputs/CustomInput";
import MultiTextInput from "../../inputs/MultiTextInput";
import {IForm} from "../type";
import {ICollection} from "../../../api_client/type";

const InputForm = ({setOpenModal, currentCollection}: IForm & { currentCollection?: ICollection }) => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [name, setName] = useState('');
    const [tags, setTags] = useState('');

    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');

    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [number3, setNumber3] = useState('');

    const [paragraph1, setParagraph1] = useState('');
    const [paragraph2, setParagraph2] = useState('');
    const [paragraph3, setParagraph3] = useState('');

    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [checkbox3, setCheckbox3] = useState(false);

    const [date1, setDate1] = useState(''); //2024-05-19
    const [date2, setDate2] = useState('');
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
                <MultiTextInput value={tags} setValue={setTags} name={'tags'} placeholder={"Tag, tag, tag..."}
                                required/>
            </div>
            <div className={'flex flex-col items-center gap-4'}>
                <h3 className={'font-semibold'}>Additional item Fields</h3>
                <div className={'flex lg:flex-row flex-col justify-evenly gap-2'}>
                    <div className={'flex flex-col gap-2'}>
                        <p className={'text-center italic h-6'}>{currentCollection?.text1.label}</p>
                        <CustomInput value={text1} setValue={setText1} name={'text1'} size={'small'}
                                     placeholder={currentCollection?.text1.label ? 'Text' : ''}
                                     disabled={!currentCollection?.text1.label}/>

                        <p className={'text-center italic h-6'}>{currentCollection?.text2.label}</p>
                        <CustomInput value={text2} setValue={setText2} name={'text2'} size={'small'}
                                     placeholder={currentCollection?.text2.label ? 'Text' : ''}
                                     disabled={!currentCollection?.text2.label}/>

                        <p className={'text-center italic h-6'}>{currentCollection?.text3.label}</p>
                        <CustomInput value={text3} setValue={setText3} name={'text3'} size={'small'}
                                     placeholder={currentCollection?.text3.label ? 'Text' : ''}
                                     disabled={!currentCollection?.text3.label}/>
                    </div>
                    <div className={'flex flex-col gap-2 mx-2'}>
                        <p className={'text-center h-6 italic md:mb-4'}>{currentCollection?.checkbox1.label}</p>
                        <Checkbox value={checkbox1} onChange={(e) => setCheckbox1(e.currentTarget.checked)}
                                  disabled={!currentCollection?.checkbox1.label} sx={{
                            padding: 0,
                            color: 'inherit',
                            '&.Mui-disabled': {
                                color: 'inherit',
                                opacity: '0.3',
                            }
                        }}/>
                        <p className={'text-center h-6 italic md:mb-4'}>{currentCollection?.checkbox2.label}</p>
                        <Checkbox value={checkbox2} onChange={(e) => setCheckbox2(e.currentTarget.checked)}
                                  disabled={!currentCollection?.checkbox2.label} sx={{
                            padding: 0,
                            color: 'inherit',
                            '&.Mui-disabled': {
                                color: 'inherit',
                                opacity: '0.3',
                            }
                        }}/>
                        <p className={'text-center h-6 italic md:mb-4'}>{currentCollection?.checkbox3.label}</p>
                        <Checkbox value={checkbox3} onChange={(e) => setCheckbox3(e.currentTarget.checked)}
                                  disabled={!currentCollection?.checkbox3.label} sx={{
                            padding: 0,
                            color: 'inherit',
                            '&.Mui-disabled': {
                                color: 'inherit',
                                opacity: '0.3',
                            }
                        }}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <p className={'text-center italic h-6'}>{currentCollection?.number1.label}</p>
                        <CustomInput value={number1} setValue={setNumber1} type={'number'} name={'number1'}
                                     size={'small'}
                                     placeholder={currentCollection?.number1.label! ? 'Number' : ''}
                                     disabled={!currentCollection?.number1.label}/>
                        <p className={'text-center italic h-6'}>{currentCollection?.number2.label}</p>
                        <CustomInput value={number2} setValue={setNumber2} type={'number'} name={'number2'}
                                     size={'small'}
                                     placeholder={currentCollection?.number2.label! ? 'Number' : ''}
                                     disabled={!currentCollection?.number2.label}/>
                        <p className={'text-center italic h-6'}>{currentCollection?.number3.label}</p>
                        <CustomInput value={number3} setValue={setNumber3} type={'number'} name={'number3'}
                                     size={'small'}
                                     placeholder={currentCollection?.number3.label! ? 'Number' : ''}
                                     disabled={!currentCollection?.number3.label}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <p className={'text-center italic h-6'}>{currentCollection?.date1.label}</p>
                        <CustomInput value={date1} setValue={setDate1} type={'date'} placeholder={''} name={'date1'}
                                     size={'small'} disabled={!currentCollection?.date1.label}/>
                        <p className={'text-center italic h-6'}>{currentCollection?.date2.label}</p>
                        <CustomInput value={date2} setValue={setDate2} type={'date'} placeholder={''} name={'date2'}
                                     size={'small'} disabled={!currentCollection?.date2.label}/>
                        <p className={'text-center italic h-6'}>{currentCollection?.date3.label}</p>
                        <CustomInput value={date3} setValue={setDate3} type={'date'} placeholder={''} name={'date3'}
                                     size={'small'} disabled={!currentCollection?.date3.label}/>
                    </div>
                </div>
                <div className={'flex lg:flex-row w-full justify-between flex-col gap-2'}>
                    <div>
                        <p className={'text-center italic h-6'}>{currentCollection?.paragraph1.label}</p>
                        <MultiTextInput value={paragraph1} setValue={setParagraph1} name={'paragraph1'}
                                        placeholder={currentCollection?.paragraph1.label ? 'Long text' : ''}
                                     disabled={!currentCollection?.paragraph1.label}/>
                    </div>
                    <div>
                        <p className={'text-center italic h-6'}>{currentCollection?.paragraph2.label}</p>
                        <MultiTextInput value={paragraph2} setValue={setParagraph2} name={'paragraph2'}
                                        placeholder={currentCollection?.paragraph2.label ? 'Long text' : ''}
                                     disabled={!currentCollection?.paragraph2.label}/>
                    </div>
                    <div>
                        <p className={'text-center italic h-6'}>{currentCollection?.paragraph3.label}</p>
                        <MultiTextInput value={paragraph3} setValue={setParagraph3} name={'paragraph3'}
                                        placeholder={currentCollection?.paragraph3.label ? 'Long text' : ''}
                                     disabled={!currentCollection?.paragraph3.label}/>
                    </div>
                </div>
                <Button variant="outlined" type={'submit'}>ok</Button>
            </div>
        </form>
    )
}

export default InputForm;