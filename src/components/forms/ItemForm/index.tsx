import React, {useState} from "react";
import InputFileUpload from "../../inputs/UploadImage";
import {Button, Checkbox, FormControlLabel} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import CustomInput from "../../inputs/CustomInput";
import MultiTextInput from "../../inputs/MultiTextInput";
import {IForm} from "../type";
import {ICollection, ThemeType} from "../../../api_client/type";
import api from "../../../api_client";

const InputForm = ({setOpenModal, currentCollection}: IForm & { currentCollection?: ICollection }) => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [name, setName] = useState<string>('');
    const [tags, setTags] = useState<string>('');

    const [text1, setText1] = useState<string>('');
    const [text2, setText2] = useState<string>('');
    const [text3, setText3] = useState<string>('');

    const [number1, setNumber1] = useState<string>('');
    const [number2, setNumber2] = useState<string>('');
    const [number3, setNumber3] = useState<string>('');

    const [paragraph1, setParagraph1] = useState<string>('');
    const [paragraph2, setParagraph2] = useState<string>('');
    const [paragraph3, setParagraph3] = useState<string>('');

    const [checkbox1, setCheckbox1] = useState<boolean>(false);
    const [checkbox2, setCheckbox2] = useState<boolean>(false);
    const [checkbox3, setCheckbox3] = useState<boolean>(false);

    const [date1, setDate1] = useState<string>(''); //2024-05-19
    const [date2, setDate2] = useState<string>('');
    const [date3, setDate3] = useState<string>('');

    return (
        <form className={`${theme === 'dark' ? 'bg-neutral-900 text-neutral-200' : 'bg-neutral-100 text-neutral-900'}
         p-8 gap-4 outline-none rounded-md shadow-md flex-col justify-evenly items-center overflow-y-auto max-h-[90vh] styled_scrollbar`}
              onSubmit={async (e) => {
                  e.preventDefault();
                  if(!currentCollection) return;
                  const itemData = {
                      id: '',
                      userName: "",
                      userId: "",
                      collection: currentCollection.id, //id
                      theme: currentCollection.theme,
                      picture: 'https://sun9-25.userapi.com/impg/bhxPhGp-bsNvt26biI4iW-AfXvChjFzwSyrAag/7PUrA45ib50.jpg?size=1024x1024&quality=96&sign=398f408bfcb4e22d3489f6702dfc2709&type=album',
                      name: name,
                      tags: tags,
                      text1: text1,
                      text2: text2,
                      text3: text3,
                      paragraph1: paragraph1,
                      paragraph2: paragraph2,
                      paragraph3: paragraph3,
                      number1: number1.toString(),
                      number2: number2.toString(),
                      number3: number3.toString(),
                      date1: date1,
                      date2: date2,
                      date3: date3,
                      checkbox1: checkbox1,
                      checkbox2: checkbox2,
                      checkbox3: checkbox3,
                  }
                  await api.addItem(currentCollection?.id as string, {...itemData});
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
                <div className={'flex lg:flex-row flex-col w-full justify-between gap-2'}>
                    <div className={'flex flex-col gap-2'}>
                        <p className={'text-center italic h-6'}>{currentCollection?.text1.label}</p>
                        <CustomInput value={text1} setValue={setText1} fullWidth name={'text1'} size={'small'}
                                     placeholder={currentCollection?.text1.label ? 'Text' : ''}
                                     disabled={!currentCollection?.text1.label}/>

                        <p className={'text-center italic h-6'}>{currentCollection?.text2.label}</p>
                        <CustomInput value={text2} setValue={setText2} fullWidth name={'text2'} size={'small'}
                                     placeholder={currentCollection?.text2.label ? 'Text' : ''}
                                     disabled={!currentCollection?.text2.label}/>

                        <p className={'text-center italic h-6'}>{currentCollection?.text3.label}</p>
                        <CustomInput value={text3} setValue={setText3} fullWidth name={'text3'} size={'small'}
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
                        <CustomInput value={number1} setValue={setNumber1} fullWidth type={'number'} name={'number1'}
                                     size={'small'}
                                     placeholder={currentCollection?.number1.label! ? 'Number' : ''}
                                     disabled={!currentCollection?.number1.label}/>
                        <p className={'text-center italic h-6'}>{currentCollection?.number2.label}</p>
                        <CustomInput value={number2} setValue={setNumber2} fullWidth type={'number'} name={'number2'}
                                     size={'small'}
                                     placeholder={currentCollection?.number2.label! ? 'Number' : ''}
                                     disabled={!currentCollection?.number2.label}/>
                        <p className={'text-center italic h-6'}>{currentCollection?.number3.label}</p>
                        <CustomInput value={number3} setValue={setNumber3} fullWidth type={'number'} name={'number3'}
                                     size={'small'}
                                     placeholder={currentCollection?.number3.label! ? 'Number' : ''}
                                     disabled={!currentCollection?.number3.label}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <p className={'text-center italic h-6'}>{currentCollection?.date1.label}</p>
                        <CustomInput value={date1} setValue={setDate1} fullWidth type={'date'} placeholder={''} name={'date1'}
                                     size={'small'} disabled={!currentCollection?.date1.label}/>
                        <p className={'text-center italic h-6'}>{currentCollection?.date2.label}</p>
                        <CustomInput value={date2} setValue={setDate2} fullWidth type={'date'} placeholder={''} name={'date2'}
                                     size={'small'} disabled={!currentCollection?.date2.label}/>
                        <p className={'text-center italic h-6'}>{currentCollection?.date3.label}</p>
                        <CustomInput value={date3} setValue={setDate3} fullWidth type={'date'} placeholder={''} name={'date3'}
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