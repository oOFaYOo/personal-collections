import {Button, TextField} from "@mui/material";
import React, {useState} from "react";
import TextInput from "../../CustomInput";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

const RegAuth = () => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);
    const [action, setAction] = useState<'signin' | 'signup'>('signin');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [Email, setEmail] = useState('');

    function clean (){
        setName('');
        setPassword('');
        setEmail('');
    }

    return (
        <form className={`${theme === 'dark' ? 'bg-neutral-900 text-neutral-200' : 'bg-neutral-100 text-neutral-900'}
        p-8 gap-4 bg-neutral-200 outline-none flex-col rounded-md shadow-md flex justify-evenly items-center`}
              onSubmit={(e)=>{
                  clean();
              }}>
            <div className={'w-full flex justify-center gap-2'}>
                <Button variant={action === "signin" ? "contained" : "outlined"} onClick={() => {
                    setAction('signin');
                    clean();
                }}>sign in</Button>
                <Button variant={action === "signup" ? "contained" : "outlined"} onClick={() => {
                    setAction('signup');
                    clean();
                }}>sign up</Button>
            </div>
            {
                action === 'signup'
                    ? <TextInput value={name} setValue={setName} placeholder={'Name'} name={'name'} type={'text'} required/>
                    : null
            }
            <TextInput value={Email} setValue={setEmail} placeholder={'eMail'} name={'eMail'} type={'email'} required/>
            <TextInput value={password} setValue={setPassword} placeholder={'Password'} name={'password'} type={'password'} required/>
            <Button variant="outlined" type={'submit'}>ok</Button>
        </form>
    )
}

export default RegAuth;