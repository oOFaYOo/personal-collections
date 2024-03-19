import React, {useState} from "react";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import CustomInput from "../../inputs/CustomInput";
import {ActionType} from "./type";
import api from "../../../api_client"
import {setCurrentUser} from "../../../store/slice";
import {IForm} from "../type";
import {useTranslation} from "react-i18next";

const RegAuth = ({setOpenModal}:IForm) => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);
    const dispatch = useDispatch();

    const [message, setMessage] = useState<string>('');
    const [action, setAction] = useState<ActionType>(ActionType.signin);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const {t, i18n} = useTranslation();

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
                      const authResponse = await api.AuthRequests.signIn(email, password);
                      if(authResponse.status === 200){
                          document.cookie = 'sessionId='+ authResponse.data.id +'; path=/;';
                          localStorage.userId = authResponse.data.userId;
                          const response = await api.AuthRequests.getCurrentUser();
                          if (response.status === 200){
                              dispatch(setCurrentUser(response.data))
                          }
                          setOpenModal(false);
                      } else {
                          setMessage(`${authResponse.status} ${authResponse.data}`);
                          setTimeout(()=>{setMessage('')}, 3000);
                      }
                  } else {
                      const response = await api.AuthRequests.signUp(name, email, password);
                      if(response.status !== 200){
                          setMessage(`${response.status} ${response.data}`);
                          setTimeout(()=>{setMessage('')}, 3000);
                      } else setOpenModal(false);
                  }
                  clean();
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
                }}>{t('signin')}</Button>
                <Button variant={action === ActionType.signup ? "contained" : "outlined"} onClick={() => {
                    setAction(ActionType.signup);
                    clean();
                }}>{t('signup')}</Button>
            </div>
            {
                action === ActionType.signup
                    ? <CustomInput value={name} setValue={setName} placeholder={t("table.name")} name={'name'} type={'text'}
                                   required fullWidth/>
                    : null
            }
            <CustomInput value={email} setValue={setEmail} placeholder={t("email")} name={'eMail'} type={'email'}
                         required fullWidth/>
            <CustomInput value={password} setValue={setPassword} placeholder={t("password")} name={'password'}
                         type={'password'} required fullWidth/>
            <Button variant="outlined" type={'submit'}>ok</Button>
        </form>
    )
}

export default React.memo(RegAuth);