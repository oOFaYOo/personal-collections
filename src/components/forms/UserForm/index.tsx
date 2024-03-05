import InputFileUpload from "../../UploadImage";
import {Button, TextField} from "@mui/material";
import React, {useState} from "react";
import TextInput from "../../CustomInput";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import MultiTextInput from "../../MultiTextInput";

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
            <MultiTextInput value={description} setValue={setDescription} name={'about'} placeholder={"About Me"} />
            <Button variant="outlined" type={'submit'}>ok</Button>
        </form>
    )
}

export default UserForm;