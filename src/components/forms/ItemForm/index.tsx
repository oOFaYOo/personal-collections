import React, {useState} from "react";
import InputFileUpload from "../../inputs/UploadImage";
import {Button, Checkbox} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import CustomInput from "../../inputs/CustomInput";
import MultiTextInput from "../../inputs/MultiTextInput";
import {IForm} from "../type";
import api from "../../../api_client";
import {useTranslation} from "react-i18next";
import {ICollection} from "../../../api_client/CollectionRequests/type";
import {IItem} from "../../../api_client/ItemRequests/type";

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

    const {t} = useTranslation();

    return (
        <form className={`${theme === 'dark' ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-900'}
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
                      await api.ItemRequests.addItem(currentCollection?.id as string, {
                          ...itemData,
                          id: '',
                          userId: '',
                          userName: ''
                      });
                  } else {
                      await api.ItemRequests.editItemData(currentItem?.id, {
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
                <CustomInput value={name} setValue={setName} placeholder={t('table.title')} name={'title'} required/>
                <MultiTextInput value={tags} setValue={setTags} name={'tags'} placeholder={t('tagField')}
                                required/>
            </div>
            <div className={'flex flex-col items-center gap-4'}>
                <h3 className={'font-semibold'}>{t('additionalFields')}</h3>
                <div className={'flex lg:flex-row flex-col w-full justify-between gap-2'}>
                    <div className={'flex flex-col gap-2'}>
                        <p className={'text-center italic h-6'}>{currentCollection?.text1.label}</p>
                        <CustomInput value={text1} setValue={setText1}  name={'text1'} size={'small'}
                                     placeholder={currentCollection?.text1.label ? t('text') : ''}
                                     disabled={!currentCollection?.text1.label && !currentItem}/>

                        <p className={'text-center italic h-6'}>{currentCollection?.text2.label}</p>
                        <CustomInput value={text2} setValue={setText2}  name={'text2'} size={'small'}
                                     placeholder={currentCollection?.text2.label ? t('text') : ''}
                                     disabled={!currentCollection?.text2.label && !currentItem}/>

                        <p className={'text-center italic h-6'}>{currentCollection?.text3.label}</p>
                        <CustomInput value={text3} setValue={setText3}  name={'text3'} size={'small'}
                                     placeholder={currentCollection?.text3.label ? t('text') : ''}
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
                        <CustomInput value={number1} setValue={setNumber1}  type={'number'} name={'number1'}
                                     size={'small'}
                                     placeholder={currentCollection?.number1.label! ? t('number') : ''}
                                     disabled={!currentCollection?.number1.label && !currentItem}/>
                        <p className={'text-center italic h-6'}>{currentCollection?.number2.label}</p>
                        <CustomInput value={number2} setValue={setNumber2}  type={'number'} name={'number2'}
                                     size={'small'}
                                     placeholder={currentCollection?.number2.label! ? t('number') : ''}
                                     disabled={!currentCollection?.number2.label && !currentItem}/>
                        <p className={'text-center italic h-6'}>{currentCollection?.number3.label}</p>
                        <CustomInput value={number3} setValue={setNumber3}  type={'number'} name={'number3'}
                                     size={'small'}
                                     placeholder={currentCollection?.number3.label! ? t('number') : ''}
                                     disabled={!currentCollection?.number3.label && !currentItem}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <p className={'text-center italic h-6'}>{currentCollection?.date1.label}</p>
                        <CustomInput value={date1} setValue={setDate1}  type={'date'} placeholder={''}
                                     name={'date1'}
                                     size={'small'} disabled={!currentCollection?.date1.label && !currentItem}/>
                        <p className={'text-center italic h-6'}>{currentCollection?.date2.label}</p>
                        <CustomInput value={date2} setValue={setDate2}  type={'date'} placeholder={''}
                                     name={'date2'}
                                     size={'small'} disabled={!currentCollection?.date2.label && !currentItem}/>
                        <p className={'text-center italic h-6'}>{currentCollection?.date3.label}</p>
                        <CustomInput value={date3} setValue={setDate3}  type={'date'} placeholder={''}
                                     name={'date3'}
                                     size={'small'} disabled={!currentCollection?.date3.label && !currentItem}/>
                    </div>
                </div>
                <div className={'flex lg:flex-row w-full justify-between flex-col gap-2'}>
                    <div className={'lg:w-[250px] w-full'}>
                        <p className={'text-center italic h-6'}>{currentCollection?.paragraph1.label}</p>
                        <MultiTextInput value={paragraph1} setValue={setParagraph1} name={'paragraph1'}
                                        placeholder={currentCollection?.paragraph1.label ? t('longtext') : ''}
                                        disabled={!currentCollection?.paragraph1.label && !currentItem}/>
                    </div>
                    <div className={'lg:w-[250px] w-full'}>
                        <p className={'text-center italic h-6'}>{currentCollection?.paragraph2.label}</p>
                        <MultiTextInput value={paragraph2} setValue={setParagraph2} name={'paragraph2'}
                                        placeholder={currentCollection?.paragraph2.label ? t('longtext') : ''}
                                        disabled={!currentCollection?.paragraph2.label && !currentItem}/>
                    </div>
                    <div className={'lg:w-[250px] w-full'}>
                        <p className={'text-center italic h-6'}>{currentCollection?.paragraph3.label}</p>
                        <MultiTextInput value={paragraph3} setValue={setParagraph3} name={'paragraph3'}
                                        placeholder={currentCollection?.paragraph3.label ? t('longtext') : ''}
                                        disabled={!currentCollection?.paragraph3.label && !currentItem}/>
                    </div>
                </div>
                <Button variant="outlined" type={'submit'}>ok</Button>
            </div>
        </form>
    )
}

export default React.memo(InputForm);