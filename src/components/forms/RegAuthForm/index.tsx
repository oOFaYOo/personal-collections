import React, {useState} from "react";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import CustomInput from "../../inputs/CustomInput";
import {ActionType} from "./type";
import api from "../../../api_client"
import {setCurrentUser} from "../../../store/slice";
import {IForm} from "../type";

const RegAuth = ({setOpenModal}:IForm) => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);
    const dispatch = useDispatch();

    const [message, setMessage] = useState<string>('');
    const [action, setAction] = useState<ActionType>(ActionType.signin);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    function clean() {
        setName('');
        setPassword('');
        setEmail('');
    }

    return (
        <form className={`${theme === 'dark' ? 'bg-neutral-900 text-neutral-200' : 'bg-neutral-100 text-neutral-900'}
        p-8 gap-4 bg-neutral-200 outline-none flex-col rounded-md shadow-md flex justify-evenly items-center`}
              onSubmit={async (e) => {
                  e.preventDefault();
                  if(action === ActionType.signin){
                      const authResponse = await api.signIn(email, password);
                      console.log(authResponse);
                      if(authResponse.status === 200){
                          document.cookie = 'sessionId='+ authResponse.data.id +'; path=/;';
                          localStorage.userId = authResponse.data.userId;
                          const response = await api.getCurrentUser();
                          if (response.status === 200){
                              console.log(1, response)
                              dispatch(setCurrentUser(response.data))
                          }
                      } else {
                          setMessage(`${authResponse.status}.${authResponse.data}`);
                          setTimeout(()=>{setMessage('')}, 3000);
                      }
                  } else {
                      const response = await api.signUp(name, email, password);
                      if(response.status !== 200){
                          setMessage(`${response.status}.${response.data}`);
                          setTimeout(()=>{setMessage('')}, 3000);
                      }
                  }
                  clean();
                  setOpenModal(false);
              }}>
            {
                !!message
                ? <p className={'text-rose-600'}>{message}</p>
                : null
            }
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
                                   required fullWidth/>
                    : null
            }
            <CustomInput value={email} setValue={setEmail} placeholder={'eMail'} name={'eMail'} type={'email'}
                         required fullWidth/>
            <CustomInput value={password} setValue={setPassword} placeholder={'Password'} name={'password'}
                         type={'password'} required fullWidth/>
            <Button variant="outlined" type={'submit'}>ok</Button>
        </form>
    )
}

export default RegAuth;