import {Button, TextField} from "@mui/material";
import React, {useState} from "react";

const RegAuth = () => {
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
        <form className={'p-8 gap-4 bg-neutral-200 outline-none flex-col rounded-md shadow-md flex justify-evenly items-center'}
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
                    ? <TextField
                        label="Name"
                        name={'name'}
                        type="text"
                        required
                        value={name}
                        onChange={(e)=>{setName(e.currentTarget.value)}}
                    />
                    : null
            }
            <TextField
                id="outlined-password-input"
                label="eMail"
                name={'eMail'}
                type="email"
                required
                value={Email}
                onChange={(e)=>{setEmail(e.currentTarget.value)}}
            />
            <TextField
                id="outlined-password-input"
                label="Password"
                name={'password'}
                type="password"
                required
                value={password}
                onChange={(e)=>{setPassword(e.currentTarget.value)}}
            />
            <Button variant="outlined" type={'submit'}>ok</Button>
        </form>
    )
}

export default RegAuth;