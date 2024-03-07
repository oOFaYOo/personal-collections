import React, {useState} from "react";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import CustomInput from "../../CustomInput";
import {ActionType} from "./type";

const RegAuth = () => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [action, setAction] = useState<ActionType>(ActionType.signin);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [Email, setEmail] = useState('');

    function clean() {
        setName('');
        setPassword('');
        setEmail('');
    }

    return (
        <form className={`${theme === 'dark' ? 'bg-neutral-900 text-neutral-200' : 'bg-neutral-100 text-neutral-900'}
        p-8 gap-4 bg-neutral-200 outline-none flex-col rounded-md shadow-md flex justify-evenly items-center`}
              onSubmit={(e) => {
                  clean();
              }}>
            <div className={'w-full flex justify-center gap-2'}>
                <Button variant={action === ActionType.signin ? "contained" : "outlined"} onClick={() => {
                    setAction(ActionType.signin);
                    clean();
                }}>sign in</Button>
                <Button variant={action === ActionType.signup ? "contained" : "outlined"} onClick={() => {
                    setAction(ActionType.signup);
                    clean();
                }}>sign up</Button>
            </div>
            {
                action === ActionType.signup
                    ? <CustomInput value={name} setValue={setName} placeholder={'Name'} name={'name'} type={'text'}
                                   required/>
                    : null
            }
            <CustomInput value={Email} setValue={setEmail} placeholder={'eMail'} name={'eMail'} type={'email'}
                         required/>
            <CustomInput value={password} setValue={setPassword} placeholder={'Password'} name={'password'}
                         type={'password'} required/>
            <Button variant="outlined" type={'submit'}>ok</Button>
        </form>
    )
}

export default RegAuth;