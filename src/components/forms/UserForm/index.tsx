import InputFileUpload from "../../UploadImage";
import {Button, TextField} from "@mui/material";
import React, {useState} from "react";
import TextInput from "../../TextInput";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

const UserForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    function clean (){
        setName('');
        setDescription('');
    }

    return (
        <form className={`${theme === 'dark' ? 'bg-neutral-900 text-neutral-200' : 'bg-neutral-100 text-neutral-900'}
        p-8 gap-4 bg-neutral-200 outline-none flex-col rounded-md shadow-md flex justify-evenly items-center`}
              onSubmit={(e)=>{
                  clean();
              }}>
            <InputFileUpload />
            <TextInput value={name} setValue={setName} placeholder={'Name'} name={'name'}/>
            <TextField
                placeholder="About Me"
                className={'styled_scrollbar'}
                name={'about'}
                type="text"
                multiline
                sx={{
                    maxHeight:56,
                    overflowY:'auto',
                    width:'100%',
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
            <Button variant="outlined" type={'submit'}>ok</Button>
        </form>
    )
}

export default UserForm;