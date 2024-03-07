import React, {useState} from "react";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import CustomInput from "../../inputs/CustomInput";
import InputFileUpload from "../../inputs/UploadImage";
import MultiTextInput from "../../inputs/MultiTextInput";

const UserForm = () => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function clean() {
        setName('');
        setDescription('');
    }

    return (
        <form className={`${theme === 'dark' ? 'bg-neutral-900 text-neutral-200' : 'bg-neutral-100 text-neutral-900'}
        p-8 gap-4 bg-neutral-200 outline-none flex-col rounded-md shadow-md flex justify-evenly items-center`}
              onSubmit={(e) => {
                  clean();
              }}>
            <InputFileUpload/>
            <CustomInput value={name} setValue={setName} placeholder={'Name'} name={'name'} fullWidth/>
            <MultiTextInput value={description} setValue={setDescription} name={'about'} placeholder={"About Me"}/>
            <Button variant="outlined" type={'submit'}>ok</Button>
        </form>
    )
}

export default UserForm;