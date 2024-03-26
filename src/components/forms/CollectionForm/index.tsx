import InputFileUpload from "../../inputs/UploadImage";
import {Button, FormControl, MenuItem, Select} from "@mui/material";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import CustomInput from "../../inputs/Input";
import {IForm} from "../type";
import api from "../../../api_client";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {ThemeType} from "../../../store/type";
import {ICollection} from "../../../api_client/CollectionRequests/type";
import AdditionalTitlesContainer from "../../containers/AdditionalTitlesContainer";

const CollectionForm = ({setOpenModal, setUpdate, currentCollection}: IForm & { currentCollection?: ICollection }) => {
    const {theme, collectionTheme} = useSelector((state: RootState) => state.PersonalCollectionsStore);
    const {id} = useParams();

    const [name, setName] = useState(currentCollection ? currentCollection.name : '');
    const [picture, setPicture] = useState<string>(currentCollection ? currentCollection.picture : '');
    const [description, setDescription] = useState(currentCollection ? currentCollection.description : '');
    const [collectionTopic, setCollectionTopic] = useState<ThemeType | 'Theme'>('Theme');

    const {t} = useTranslation();

    const [textFieldsTitles, setTextFieldsTitles] = useState<(string | null)[]>(
        // @ts-ignore
        [1, 2, 3].map((item) => currentCollection && currentCollection['text' + item].label !== '' ? currentCollection['text' + item].label : null)
    );
    const [numberFieldsTitles, setNumberFieldsTitles] = useState<(string | null)[]>(
        // @ts-ignore
        [1, 2, 3].map((item) => currentCollection && currentCollection['number' + item].label !== '' ? currentCollection['number' + item].label : null)
    );
    const [dateFieldsTitles, setDateFieldsTitles] = useState<(string | null)[]>(
        // @ts-ignore
        [1, 2, 3].map((item) => currentCollection && currentCollection['date' + item].label !== '' ? currentCollection['date' + item].label : null)
    );
    const [checkboxFieldsTitles, setCheckboxFieldsTitles] = useState<(string | null)[]>(
        // @ts-ignore
        [1, 2, 3].map((item) => currentCollection && currentCollection['checkbox' + item].label !== '' ? currentCollection['checkbox' + item].label : null)
    );
    const [paragraphFieldsTitles, setParagraphFieldsTitles] = useState<(string | null)[]>(
        // @ts-ignore
        [1, 2, 3].map((item) => currentCollection && currentCollection['paragraph' + item].label !== '' ? currentCollection['paragraph' + item].label : null)
    );

    const additionalTitlesContainerConfig = [
        {
            title: t('titleTextField'),
            values: textFieldsTitles,
            setValues: setTextFieldsTitles,
        },
        {
            title: t('titleNumericField'),
            values: numberFieldsTitles,
            setValues: setNumberFieldsTitles,
        },
        {
            title: t('titleDateField'),
            values: dateFieldsTitles,
            setValues: setDateFieldsTitles,
        },
        {
            title: t('titleCheckboxField'),
            values: checkboxFieldsTitles,
            setValues: setCheckboxFieldsTitles,
        },
        {
            title: t('titleParagraphField'),
            values: paragraphFieldsTitles,
            setValues: setParagraphFieldsTitles,
        }
    ];

    return (
        <form className={`${theme === 'dark' ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-900'}
         p-8 gap-4 outline-none rounded-md shadow-md flex-col justify-evenly items-center overflow-y-auto max-h-[90vh] styled_scrollbar`}
              onSubmit={async (e) => {
                  e.preventDefault();
                  const collectionData: ICollection = {
                      id: '',
                      user: id!,
                      picture: picture,
                      theme: collectionTopic as ThemeType,
                      name: name,
                      description: description,
                      text1: {id: 'text1', label: textFieldsTitles[0] ?? '', type: 'text'},
                      text2: {id: 'text2', label: textFieldsTitles[1] ?? '', type: 'text'},
                      text3: {id: 'text3', label: textFieldsTitles[2] ?? '', type: 'text'},
                      paragraph1: {id: 'paragraph1', label: paragraphFieldsTitles[0] ?? '', type: 'paragraph'},
                      paragraph2: {id: 'paragraph2', label: paragraphFieldsTitles[1] ?? '', type: 'paragraph'},
                      paragraph3: {id: 'paragraph3', label: paragraphFieldsTitles[2] ?? '', type: 'paragraph'},
                      number1: {id: 'number1', label: numberFieldsTitles[0] ?? '', type: 'number'},
                      number2: {id: 'number2', label: numberFieldsTitles[1] ?? '', type: 'number'},
                      number3: {id: 'number3', label: numberFieldsTitles[2] ?? '', type: 'number'},
                      date1: {id: 'date1', label: dateFieldsTitles[0] ?? '', type: 'date'},
                      date2: {id: 'date2', label: dateFieldsTitles[1] ?? '', type: 'date'},
                      date3: {id: 'date3', label: dateFieldsTitles[2] ?? '', type: 'date'},
                      checkbox1: {id: 'checkbox1', label: checkboxFieldsTitles[0] ?? '', type: 'checkbox'},
                      checkbox2: {id: 'checkbox2', label: checkboxFieldsTitles[1] ?? '', type: 'checkbox'},
                      checkbox3: {id: 'checkbox3', label: checkboxFieldsTitles[2] ?? '', type: 'checkbox'},
                  }
                  if (!currentCollection) {
                      await api.CollectionRequests.addCollection(id!, {
                          ...collectionData, id: '', user: id!,
                          theme: collectionTopic as ThemeType,
                      });
                  } else {
                      await api.CollectionRequests.editCollectionData(id!, {
                          ...collectionData,
                          id: currentCollection.id,
                          user: currentCollection.user,
                          theme: currentCollection.theme
                      })
                  }
                  setOpenModal(false);
                  setUpdate!(true);
              }}>
            <div className={'flex lg:flex-row lg:gap-12 gap-2 flex-col items-center justify-between mb-4'}>
                {/*<InputFileUpload/>*/}
                <CustomInput value={picture} setValue={(string)=>setPicture(string)} name={'picture'} placeholder={t('picturePlaceholder')}/>
                <CustomInput value={name} setValue={(string) => setName(string)} placeholder={t('table.title')}
                             name={'title'} required/>
                <FormControl sx={{minWidth: '250px'}}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        disabled={!!currentCollection}
                        value={currentCollection ? currentCollection.theme : collectionTopic}
                        onChange={(e) => {
                            setCollectionTopic(e.target.value as ThemeType | 'Theme');
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
                        {
                            collectionTheme.map((value, i) =>
                                <MenuItem key={i} value={value}>
                                    {t(`theme.${value}`)}
                                </MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
                <CustomInput multiline name={'description'} value={description} setValue={setDescription}
                             placeholder={t('table.description')}/>
            </div>
            <div className={'flex flex-col items-center gap-4'}>
                <h3 className={'font-semibold text-lg'}>{t('additionalTitle')}</h3>
                <div className={'flex w-full lg:flex-row flex-col justify-evenly gap-2'}>
                    {
                      additionalTitlesContainerConfig.map((item, i) =>
                         <AdditionalTitlesContainer key={i} title={item.title} values={item.values} setValues={item.setValues}/>)
                    }
                </div>
                <Button variant="outlined" type={'submit'} disabled={!currentCollection && collectionTopic === "Theme"}
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