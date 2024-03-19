import InputFileUpload from "../../inputs/UploadImage";
import {Button, FormControl, MenuItem, Select} from "@mui/material";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import CustomInput from "../../inputs/CustomInput";
import MultiTextInput from "../../inputs/MultiTextInput";
import {IForm} from "../type";
import {ICollection, ThemeType} from "../../../api_client/type";
import api from "../../../api_client";
import {useParams} from "react-router-dom";
import AdditionalInputsTitleContainer from "../../AdditionalInputsTitleContainer";
import {useTranslation} from "react-i18next";

const CollectionForm = ({setOpenModal, setUpdate, currentCollection}: IForm & { currentCollection?: ICollection }) => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);
    const {id} = useParams();

    const [name, setName] = useState(currentCollection ? currentCollection.name : '');
    const [description, setDescription] = useState(currentCollection ? currentCollection.description : '');
    const [collectionTheme, setCollectionTheme] = useState<ThemeType | 'Theme'>('Theme');

    const [text1, setText1] = useState<string>(currentCollection ? currentCollection.text1.label : '');
    const [text2, setText2] = useState<string>(currentCollection ? currentCollection.text2.label : '');
    const [text3, setText3] = useState<string>(currentCollection ? currentCollection.text3.label : '');

    const [number1, setNumber1] = useState<string>(currentCollection ? currentCollection.number1.label : '');
    const [number2, setNumber2] = useState<string>(currentCollection ? currentCollection.number2.label : '');
    const [number3, setNumber3] = useState<string>(currentCollection ? currentCollection.number3.label : '');

    const [paragraph1, setParagraph1] = useState<string>(currentCollection ? currentCollection.paragraph1.label : '');
    const [paragraph2, setParagraph2] = useState<string>(currentCollection ? currentCollection.paragraph2.label : '');
    const [paragraph3, setParagraph3] = useState<string>(currentCollection ? currentCollection.paragraph3.label : '');

    const [checkbox1, setCheckbox1] = useState<string>(currentCollection ? currentCollection.checkbox1.label : '');
    const [checkbox2, setCheckbox2] = useState<string>(currentCollection ? currentCollection.checkbox2.label : '');
    const [checkbox3, setCheckbox3] = useState<string>(currentCollection ? currentCollection.checkbox3.label : '');

    const [date1, setDate1] = useState<string>(currentCollection ? currentCollection.date1.label : '');
    const [date2, setDate2] = useState<string>(currentCollection ? currentCollection.date2.label : '');
    const [date3, setDate3] = useState<string>(currentCollection ? currentCollection.date3.label : '');

    const {t, i18n} = useTranslation();

    return (
        <form className={`${theme === 'dark' ? 'bg-neutral-900 text-neutral-200' : 'bg-neutral-100 text-neutral-900'}
         p-8 gap-4 outline-none rounded-md shadow-md flex-col justify-evenly items-center overflow-y-auto max-h-[90vh] styled_scrollbar`}
              onSubmit={async (e) => {
                  e.preventDefault();
                  const collectionData: ICollection = {
                      id: '',
                      user: id!,
                      picture: '',
                      theme: collectionTheme as ThemeType,
                      name: name,
                      description: description,
                      text1: {id: 'text1', label: text1, type: 'text'},
                      text2: {id: 'text2', label: text2, type: 'text'},
                      text3: {id: 'text3', label: text3, type: 'text'},
                      paragraph1: {id: 'paragraph1', label: paragraph1, type: 'paragraph'},
                      paragraph2: {id: 'paragraph2', label: paragraph2, type: 'paragraph'},
                      paragraph3: {id: 'paragraph3', label: paragraph3, type: 'paragraph'},
                      number1: {id: 'number1', label: number1, type: 'number'},
                      number2: {id: 'number2', label: number2, type: 'number'},
                      number3: {id: 'number3', label: number3, type: 'number'},
                      date1: {id: 'date1', label: date1, type: 'date'},
                      date2: {id: 'date2', label: date2, type: 'date'},
                      date3: {id: 'date3', label: date3, type: 'date'},
                      checkbox1: {id: 'checkbox1', label: checkbox1, type: 'checkbox'},
                      checkbox2: {id: 'checkbox2', label: checkbox2, type: 'checkbox'},
                      checkbox3: {id: 'checkbox3', label: checkbox3, type: 'checkbox'},
                  }
                  if (!currentCollection) {
                      await api.addCollection(id!, {
                          ...collectionData, id: '', user: id!, picture: '',
                          theme: collectionTheme as ThemeType,
                      });
                  } else {
                      await api.editCollectionData(id!, {
                          ...collectionData,
                          id: currentCollection.id,
                          user: currentCollection.user,
                          picture: '',
                          theme: currentCollection.theme
                      })
                  }
                  setOpenModal(false);
                  setUpdate!(true);
              }}>
            <div className={'flex lg:flex-row gap-2 flex-col items-center justify-between mb-4'}>
                <InputFileUpload/>
                <CustomInput value={name} setValue={setName} placeholder={t('table.title')} name={'title'} required/>
                <FormControl fullWidth sx={{width: '200px'}}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        disabled={!!currentCollection}
                        value={currentCollection ? currentCollection.theme : collectionTheme}
                        onChange={(e) => {
                            setCollectionTheme(e.target.value as ThemeType | 'Theme');
                        }}
                        sx={{
                            '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme === 'dark' ? 'rgba(229,229,229,0.3)' : 'rgba(23,23,23,0.3)',
                            },
                            color: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)',
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: !!currentCollection ? 'none' : (theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)'),
                            },
                            '.MuiSvgIcon-root ': {
                                fill: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)',
                            },
                            '& .Mui-disabled': {
                                '-webkit-text-fill-color': theme === 'dark' ? 'rgba(229,229,229,0.3)' : 'rgba(23,23,23,0.3)',
                            },
                            '.Mui-disabled': {
                                '&.MuiSvgIcon-root ': {
                                    opacity: '0.3',
                                },
                            }
                        }}
                    >
                        <MenuItem value={'Theme'}>{t('table.theme')}</MenuItem>
                        <MenuItem value={'Anime'}>{t('theme.Anime')}</MenuItem>
                        <MenuItem value={'Game'}>{t('theme.Game')}</MenuItem>
                        <MenuItem value={'Movie'}>{t('theme.Movie')}</MenuItem>
                    </Select>
                </FormControl>
                <MultiTextInput value={description} setValue={setDescription} name={'description'}
                                placeholder={t('table.description')}/>
            </div>
            <div className={'flex flex-col items-center gap-4'}>
                <h3 className={'font-semibold'}>{t('additionalTitle')}</h3>
                <div className={'flex lg:flex-row flex-col justify-evenly gap-2'}>
                    <AdditionalInputsTitleContainer
                        placeholder={t('titleTextField')}
                        name={'text'}
                        values={[text1, text2, text3]}
                        setValues={[setText1, setText2, setText3]} />
                    <AdditionalInputsTitleContainer
                        placeholder={t('titleNumericField')}
                        name={'number'}
                        values={[number1, number2, number3]}
                        setValues={[setNumber1, setNumber2, setNumber3]} />
                    <AdditionalInputsTitleContainer
                        placeholder={t('titleDateField')}
                        name={'date'}
                        values={[date1, date2, date3]}
                        setValues={[setDate1, setDate2, setDate3]} />
                    <AdditionalInputsTitleContainer
                        placeholder={t('titleCheckboxField')}
                        name={'checkbox'}
                        values={[checkbox1, checkbox2, checkbox3]}
                        setValues={[setCheckbox1, setCheckbox2, setCheckbox3]} />
                    <AdditionalInputsTitleContainer
                        placeholder={t('titleParagraphField')}
                        name={'paragraph'}
                        values={[paragraph1, paragraph2, paragraph3]}
                        setValues={[setParagraph1, setParagraph2, setParagraph3]} />
                </div>
                <Button variant="outlined"
                        disabled={!currentCollection && collectionTheme === "Theme"}
                        type={'submit'}
                        sx={{
                            "&:disabled": {
                                borderColor: 'inherit',
                                color: 'inherit',
                                opacity: theme === 'dark' ? '0.3' : '',
                            }
                        }}>ok</Button>
            </div>
        </form>
    )
}

export default React.memo(CollectionForm);