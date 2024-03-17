import React, {useState} from "react";
import InputFileUpload from "../../inputs/UploadImage";
import {Button, Checkbox} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import CustomInput from "../../inputs/CustomInput";
import MultiTextInput from "../../inputs/MultiTextInput";
import {IForm} from "../type";
import {ICollection, IItem} from "../../../api_client/type";
import api from "../../../api_client";

const InputForm = (
    {
        setOpenModal,
        currentCollection,
        currentItem,
        setUpdate
    }: IForm & { currentCollection?: ICollection, currentItem?: IItem }) => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [name, setName] = useState<string>(currentItem ? currentItem.name : '');
    const [tags, setTags] = useState<string>(currentItem ? currentItem.tags : '');

    const [text1, setText1] = useState<string>(currentItem ? currentItem.text1 : '');
    const [text2, setText2] = useState<string>(currentItem ? currentItem.text2 : '');
    const [text3, setText3] = useState<string>(currentItem ? currentItem.text3 : '');

    const [number1, setNumber1] = useState<string>(currentItem ? currentItem.number1 : '');
    const [number2, setNumber2] = useState<string>(currentItem ? currentItem.number2 : '');
    const [number3, setNumber3] = useState<string>(currentItem ? currentItem.number3 : '');

    const [paragraph1, setParagraph1] = useState<string>(currentItem ? currentItem.paragraph1 : '');
    const [paragraph2, setParagraph2] = useState<string>(currentItem ? currentItem.paragraph2 : '');
    const [paragraph3, setParagraph3] = useState<string>(currentItem ? currentItem.paragraph3 : '');

    const [checkbox1, setCheckbox1] = useState<boolean>(currentItem ? currentItem.checkbox1 : false);
    const [checkbox2, setCheckbox2] = useState<boolean>(currentItem ? currentItem.checkbox2 : false);
    const [checkbox3, setCheckbox3] = useState<boolean>(currentItem ? currentItem.checkbox3 : false);

    const [date1, setDate1] = useState<string>(currentItem ? currentItem.date1 : ''); //2024-05-19
    const [date2, setDate2] = useState<string>(currentItem ? currentItem.date2 : '');
    const [date3, setDate3] = useState<string>(currentItem ? currentItem.date3 : '');

    return (
        <form className={`${theme === 'dark' ? 'bg-neutral-900 text-neutral-200' : 'bg-neutral-100 text-neutral-900'}
         p-8 gap-4 outline-none rounded-md shadow-md flex-col justify-evenly items-center overflow-y-auto max-h-[90vh] styled_scrollbar`}
              onSubmit={async (e) => {
                  e.preventDefault();
                  if (!currentCollection) return;
                  const itemData = {
                      id: '',
                      userName: '',
                      userId: '',
                      collection: currentCollection.id, //id
                      theme: currentCollection.theme,
                      picture: '',
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
                  if (!currentItem) {
                      await api.addItem(currentCollection?.id as string, {
                          ...itemData,
                          id: '',
                          userId: '',
                          userName: ''
                      });
                  } else {
                      await api.editItemData(currentItem?.id, {
                          ...itemData,
                          id: currentItem.id,
                          userId: currentItem.userId,
                          userName: currentItem.userName,
                          picture: ''
                      })
                  }
                  setOpenModal(false);
                  setUpdate!(true);
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
                                     disabled={!currentCollection?.text1.label && !currentItem}/>

                        <p className={'text-center italic h-6'}>{currentCollection?.text2.label}</p>
                        <CustomInput value={text2} setValue={setText2} fullWidth name={'text2'} size={'small'}
                                     placeholder={currentCollection?.text2.label ? 'Text' : ''}
                                     disabled={!currentCollection?.text2.label && !currentItem}/>

                        <p className={'text-center italic h-6'}>{currentCollection?.text3.label}</p>
                        <CustomInput value={text3} setValue={setText3} fullWidth name={'text3'} size={'small'}
                                     placeholder={currentCollection?.text3.label ? 'Text' : ''}
                                     disabled={!currentCollection?.text3.label && !currentItem}/>
                    </div>
                    <div className={'flex flex-col gap-2 mx-2'}>
                        <p className={'text-center h-6 italic md:mb-4'}>{currentCollection?.checkbox1.label}</p>
                        <Checkbox checked={checkbox1} onChange={(e) => setCheckbox1(e.currentTarget.checked)}
                                  disabled={!currentCollection?.checkbox1.label && !currentItem} sx={{
                            padding: 0,
                            color: 'inherit',
                            '&.Mui-disabled': {
                                color: 'inherit',
                                opacity: '0.3',
                            }
                        }}/>
                        <p className={'text-center h-6 italic md:mb-4'}>{currentCollection?.checkbox2.label}</p>
                        <Checkbox checked={checkbox2} onChange={(e) => setCheckbox2(e.currentTarget.checked)}
                                  disabled={!currentCollection?.checkbox2.label && !currentItem} sx={{
                            padding: 0,
                            color: 'inherit',
                            '&.Mui-disabled': {
                                color: 'inherit',
                                opacity: '0.3',
                            }
                        }}/>
                        <p className={'text-center h-6 italic md:mb-4'}>{currentCollection?.checkbox3.label}</p>
                        <Checkbox checked={checkbox3} onChange={(e) => setCheckbox3(e.currentTarget.checked)}
                                  disabled={!currentCollection?.checkbox3.label && !currentItem} sx={{
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
                                     disabled={!currentCollection?.number1.label && !currentItem}/>
                        <p className={'text-center italic h-6'}>{currentCollection?.number2.label}</p>
                        <CustomInput value={number2} setValue={setNumber2} fullWidth type={'number'} name={'number2'}
                                     size={'small'}
                                     placeholder={currentCollection?.number2.label! ? 'Number' : ''}
                                     disabled={!currentCollection?.number2.label && !currentItem}/>
                        <p className={'text-center italic h-6'}>{currentCollection?.number3.label}</p>
                        <CustomInput value={number3} setValue={setNumber3} fullWidth type={'number'} name={'number3'}
                                     size={'small'}
                                     placeholder={currentCollection?.number3.label! ? 'Number' : ''}
                                     disabled={!currentCollection?.number3.label && !currentItem}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <p className={'text-center italic h-6'}>{currentCollection?.date1.label}</p>
                        <CustomInput value={date1} setValue={setDate1} fullWidth type={'date'} placeholder={''}
                                     name={'date1'}
                                     size={'small'} disabled={!currentCollection?.date1.label && !currentItem}/>
                        <p className={'text-center italic h-6'}>{currentCollection?.date2.label}</p>
                        <CustomInput value={date2} setValue={setDate2} fullWidth type={'date'} placeholder={''}
                                     name={'date2'}
                                     size={'small'} disabled={!currentCollection?.date2.label && !currentItem}/>
                        <p className={'text-center italic h-6'}>{currentCollection?.date3.label}</p>
                        <CustomInput value={date3} setValue={setDate3} fullWidth type={'date'} placeholder={''}
                                     name={'date3'}
                                     size={'small'} disabled={!currentCollection?.date3.label && !currentItem}/>
                    </div>
                </div>
                <div className={'flex lg:flex-row w-full justify-between flex-col gap-2'}>
                    <div>
                        <p className={'text-center italic h-6'}>{currentCollection?.paragraph1.label}</p>
                        <MultiTextInput value={paragraph1} setValue={setParagraph1} name={'paragraph1'}
                                        placeholder={currentCollection?.paragraph1.label ? 'Long text' : ''}
                                        disabled={!currentCollection?.paragraph1.label && !currentItem}/>
                    </div>
                    <div>
                        <p className={'text-center italic h-6'}>{currentCollection?.paragraph2.label}</p>
                        <MultiTextInput value={paragraph2} setValue={setParagraph2} name={'paragraph2'}
                                        placeholder={currentCollection?.paragraph2.label ? 'Long text' : ''}
                                        disabled={!currentCollection?.paragraph2.label && !currentItem}/>
                    </div>
                    <div>
                        <p className={'text-center italic h-6'}>{currentCollection?.paragraph3.label}</p>
                        <MultiTextInput value={paragraph3} setValue={setParagraph3} name={'paragraph3'}
                                        placeholder={currentCollection?.paragraph3.label ? 'Long text' : ''}
                                        disabled={!currentCollection?.paragraph3.label && !currentItem}/>
                    </div>
                </div>
                <Button variant="outlined" type={'submit'}>ok</Button>
            </div>
        </form>
    )
}

export default React.memo(InputForm);