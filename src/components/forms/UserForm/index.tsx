import React, {useState} from "react";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import CustomInput from "../../inputs/Input";
import InputFileUpload from "../../inputs/UploadImage";
import {IForm} from "../type";
import api from "../../../api_client";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {IUser} from "../../../api_client/UserRequests/type";

const UserForm = ({setOpenModal, setUpdate, user}:IForm & {user:IUser}) => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);
    const {id} = useParams();
    const {t} = useTranslation();

    const [picture, setPicture] = useState<string>(user.picture);
    const [name, setName] = useState<string>(user.name);
    const [description, setDescription] = useState<string>(user.description);

    return (
        <form className={`${theme === 'dark' ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-900'}
        p-8 gap-4 bg-neutral-200 outline-none flex-col rounded-md shadow-md flex justify-evenly items-center`}
              onSubmit={async (e) => {
                  e.preventDefault();
                  await api.UserRequests.editUserData(id!, new FormData(e.target as HTMLFormElement));
                  setUpdate!(true);
                  setOpenModal(false);
              }}>
            {/*<InputFileUpload setPicture={setPicture} />*/}
            <CustomInput value={picture} setValue={(string)=>setPicture(string)} multiline name={'picture'} placeholder={t('picturePlaceholder')}/>
            <CustomInput value={name} setValue={(string)=>setName(string)} placeholder={t('table.name')} name={'name'} required/>
            <CustomInput value={description} setValue={(string)=>setDescription(string)} placeholder={t('aboutme')} name={'description'} multiline/>
            <Button variant="outlined" type={'submit'}>ok</Button>
        </form>
    )
}

export default React.memo(UserForm);