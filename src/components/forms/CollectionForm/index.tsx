import InputFileUpload from "../../inputs/UploadImage";
import {Button, FormControl, MenuItem, Select} from "@mui/material";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import CustomInput from "../../inputs/CustomInput";
import MultiTextInput from "../../inputs/MultiTextInput";
import {IForm} from "../type";
import {ThemeType} from "../../../api_client/type";
import api from "../../../api_client";
import {useParams} from "react-router-dom";

const CollectionForm = ({setOpenModal}:IForm) => {
    const {theme, currentUser} = useSelector((state: RootState) => state.PersonalCollectionsStore);
    const {id} = useParams();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [collectionTheme, setCollectionTheme] = useState<ThemeType | 'Theme'>('Theme');

    const [text1, setText1] = useState<string>('');
    const [text2, setText2] = useState<string>('');
    const [text3, setText3] = useState<string>('');

    const [number1, setNumber1] = useState<string>('');
    const [number2, setNumber2] = useState<string>('');
    const [number3, setNumber3] = useState<string>('');

    const [paragraph1, setParagraph1] = useState<string>('');
    const [paragraph2, setParagraph2] = useState<string>('');
    const [paragraph3, setParagraph3] = useState<string>('');

    const [checkbox1, setCheckbox1] = useState<string>('');
    const [checkbox2, setCheckbox2] = useState<string>('');
    const [checkbox3, setCheckbox3] = useState<string>('');

    const [date1, setDate1] = useState<string>('');
    const [date2, setDate2] = useState<string>('');
    const [date3, setDate3] = useState<string>('');

    return (
        <form className={`${theme === 'dark' ? 'bg-neutral-900 text-neutral-200' : 'bg-neutral-100 text-neutral-900'}
         p-8 gap-4 outline-none rounded-md shadow-md flex-col justify-evenly items-center overflow-y-auto max-h-[90vh] styled_scrollbar`}
              onSubmit={(e) => {
                  e.preventDefault();
                      api.addCollection(id!, {
                          id: '',
                          user: id!,
                          picture: '',
                          name: name,
                          theme: collectionTheme as ThemeType,
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
                      });
                      setOpenModal(false);
              }}>
            <div className={'flex lg:flex-row gap-2 flex-col items-center justify-between mb-4'}>
                <InputFileUpload/>
                <CustomInput value={name} setValue={setName} placeholder={'Title'} name={'title'} required/>
                <FormControl fullWidth sx={{width: '200px'}}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={collectionTheme}
                        onChange={(e) => {
                            setCollectionTheme(e.target.value as ThemeType | 'Theme');
                        }}
                        sx={{
                            color: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)',
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)',
                            },
                            '.MuiSvgIcon-root ': {
                                fill: "white !important",
                            }
                        }}
                    >
                        <MenuItem value={'Theme'}>Theme</MenuItem>
                        <MenuItem value={'Anime'}>Anime</MenuItem>
                        <MenuItem value={'Game'}>Game</MenuItem>
                        <MenuItem value={'Movie'}>Movie</MenuItem>
                    </Select>
                </FormControl>
                <MultiTextInput value={description} setValue={setDescription} name={'description'}
                                placeholder={'Description'}/>
            </div>
            <div className={'flex flex-col items-center gap-4 opacity-80'}>
                <h3>Additional item fields</h3>
                <div className={'flex lg:flex-row flex-col justify-evenly gap-2'}>
                    <div className={'flex flex-col gap-2'}>
                        <CustomInput value={text1} setValue={setText1} placeholder={'Title of text field'}
                                     name={'text1'} size={'small'}/>
                        <CustomInput value={text2} setValue={setText2} placeholder={'Title of text field'}
                                     name={'text2'} size={'small'}/>
                        <CustomInput value={text3} setValue={setText3} placeholder={'Title of text field'}
                                     name={'text3'} size={'small'}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <CustomInput value={number1} setValue={setNumber1} placeholder={'Title of numeric field'}
                                     name={'number1'} size={'small'}/>
                        <CustomInput value={number2} setValue={setNumber2} placeholder={'Title of numeric field'}
                                     name={'number2'} size={'small'}/>
                        <CustomInput value={number3} setValue={setNumber3} placeholder={'Title of numeric field'}
                                     name={'number3'} size={'small'}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <CustomInput value={date1} setValue={setDate1} placeholder={'Title of date field'}
                                     name={'date1'} size={'small'}/>
                        <CustomInput value={date2} setValue={setDate2} placeholder={'Title of date field'}
                                     name={'date2'} size={'small'}/>
                        <CustomInput value={date3} setValue={setDate3} placeholder={'Title of date field'}
                                     name={'date3'} size={'small'}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <CustomInput value={checkbox1} setValue={setCheckbox1} placeholder={'Title of checkbox field'}
                                     name={'checkbox1'} size={'small'}/>
                        <CustomInput value={checkbox2} setValue={setCheckbox2} placeholder={'Title of checkbox field'}
                                     name={'checkbox2'} size={'small'}/>
                        <CustomInput value={checkbox3} setValue={setCheckbox3} placeholder={'Title of checkbox field'}
                                     name={'checkbox3'} size={'small'}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <CustomInput value={paragraph1} setValue={setParagraph1} placeholder={'Title of paragraph field'}
                                     name={'paragraph1'} size={'small'}/>
                        <CustomInput value={paragraph2} setValue={setParagraph2} placeholder={'Title of paragraph field'}
                                     name={'paragraph2'} size={'small'}/>
                        <CustomInput value={paragraph3} setValue={setParagraph3} placeholder={'Title of paragraph field'}
                                     name={'paragraph3'} size={'small'}/>
                    </div>
                </div>
                <Button variant="outlined"
                        disabled={collectionTheme === "Theme"}
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

export default CollectionForm;