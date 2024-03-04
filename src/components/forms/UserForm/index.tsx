import InputFileUpload from "../../UploadImage";
import {Button, TextField} from "@mui/material";
import React, {useState} from "react";

const UserForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function clean (){
        setName('');
        setDescription('');
    }

    return (
        <form className={'p-8 gap-4 bg-neutral-200 outline-none flex-col rounded-md shadow-md flex justify-evenly items-center'}
              onSubmit={(e)=>{
                  clean();
              }}>
            <InputFileUpload />
            <TextField
                placeholder="Name"
                name={'name'}
                type="text"
                inputProps={{ maxLength: 20 }}
                value={name}
                onChange={(e)=>setName(e.currentTarget.value)}
            />
            <TextField
                placeholder="About Me"
                name={'about'}
                type="text"
                multiline
                sx={{maxHeight:150, overflowY:'auto', width:'100%'}}
                value={description}
                onChange={(e)=>setDescription(e.currentTarget.value)}
            />
            <Button variant="outlined" type={'submit'}>ok</Button>
        </form>
    )
}

export default UserForm;