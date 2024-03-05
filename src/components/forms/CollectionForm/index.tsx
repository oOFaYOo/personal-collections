import InputFileUpload from "../../UploadImage";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import TextInput from "../../TextInput";

const CollectionForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    function clean (){
        setName('');
        setDescription('');
    }

    return (
        <form className={`${theme === 'dark' ? 'bg-neutral-900 text-neutral-200' : 'bg-neutral-100 text-neutral-900'}
         p-8 gap-4 outline-none rounded-md shadow-md flex-col justify-evenly items-center`}
              onSubmit={(e)=>{
                  clean();
              }}>
            <div className={'flex flex-row gap-2 justify-between mb-4'}>
                <InputFileUpload />
                <TextInput value={name} setValue={setName} placeholder={'Title'} name={'title'}/>
                <FormControl fullWidth sx={{width:'200px'}}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={0}
                        onChange={()=>{}}
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
                        <MenuItem value={0}>Theme</MenuItem>
                        <MenuItem value={1}>Ten</MenuItem>
                        <MenuItem value={2}>Twenty</MenuItem>
                        <MenuItem value={3}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    placeholder="Description"
                    name={'description'}
                    type="text"
                    className={'styled_scrollbar'}
                    multiline
                    sx={{
                        maxHeight:56,
                        overflowY:'auto',
                        width:'250px',
                        '& .MuiInput-underline:after': {
                            borderBottomColor: '#1976d2',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)',
                            },
                            '&:hover fieldset': {
                                borderColor: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#1976d2',
                            },
                        },
                        '.MuiOutlinedInput-input': {
                            color: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)'
                        }
                }}
                    value={description}
                    onChange={(e)=>setDescription(e.currentTarget.value)}
                />
            </div>
            <div className={'flex flex-col items-center gap-4 opacity-80'}>
                <h3>Additional item Fields</h3>
                <div className={'flex justify-evenly gap-2'}>
                    <div className={'flex flex-col gap-2'}>
                        <TextInput value={''} setValue={()=>{}} placeholder={'Title of text field'} name={'text1'} size={'small'}/>
                        <TextInput value={''} setValue={()=>{}} placeholder={'Title of text field'} name={'text2'} size={'small'}/>
                        <TextInput value={''} setValue={()=>{}} placeholder={'Title of text field'} name={'text3'} size={'small'}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <TextInput value={''} setValue={()=>{}} placeholder={'Title of numeric field'} name={'number1'} size={'small'}/>
                        <TextInput value={''} setValue={()=>{}} placeholder={'Title of numeric field'} name={'number2'} size={'small'}/>
                        <TextInput value={''} setValue={()=>{}} placeholder={'Title of numeric field'} name={'number3'} size={'small'}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <TextInput value={''} setValue={()=>{}} placeholder={'Title of date field'} name={'date1'} size={'small'}/>
                        <TextInput value={''} setValue={()=>{}} placeholder={'Title of date field'} name={'date2'} size={'small'}/>
                        <TextInput value={''} setValue={()=>{}} placeholder={'Title of date field'} name={'date3'} size={'small'}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <TextInput value={''} setValue={()=>{}} placeholder={'Title of boolean field'} name={'boolean1'} size={'small'}/>
                        <TextInput value={''} setValue={()=>{}} placeholder={'Title of boolean field'} name={'boolean2'} size={'small'}/>
                        <TextInput value={''} setValue={()=>{}} placeholder={'Title of boolean field'} name={'boolean3'} size={'small'}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <TextInput value={''} setValue={()=>{}} placeholder={'Title of paragraph field'} name={'description1'} size={'small'}/>
                        <TextInput value={''} setValue={()=>{}} placeholder={'Title of paragraph field'} name={'description2'} size={'small'}/>
                        <TextInput value={''} setValue={()=>{}} placeholder={'Title of paragraph field'} name={'description3'} size={'small'}/>
                    </div>
                </div>
                <Button variant="outlined" type={'submit'}>ok</Button>
            </div>
        </form>
    )
}

export default CollectionForm;