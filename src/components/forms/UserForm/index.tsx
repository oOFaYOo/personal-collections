import React, {useState} from "react";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import CustomInput from "../../inputs/CustomInput";
import InputFileUpload from "../../inputs/UploadImage";
import MultiTextInput from "../../inputs/MultiTextInput";
import {IForm} from "../type";
import api from "../../../api_client";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {IUser} from "../../../api_client/UserRequests/type";

const UserForm = ({setOpenModal, setUpdate, user}:IForm & {user:IUser}) => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);
    const {id} = useParams();

    const [name, setName] = useState(user.name);
    const [description, setDescription] = useState(user.description);
    const [picture, setPicture] = useState<File|null>(null);

    const {t, i18n} = useTranslation();

    return (
        <form className={`${theme === 'dark' ? 'bg-neutral-900 text-neutral-200' : 'bg-neutral-100 text-neutral-900'}
        p-8 gap-4 bg-neutral-200 outline-none flex-col rounded-md shadow-md flex justify-evenly items-center`}
              onSubmit={async (e) => {
                  e.preventDefault();
                  console.log(picture);
                  await api.UserRequests.uploadUserPicture(id!, picture!);
                  await api.UserRequests.editUserData(id!, {name:name, description:description});
                  setUpdate!(true);
                  setName('');
                  setDescription('');
                  setPicture(null);
                  setOpenModal(false);
              }}>
            <InputFileUpload setPicture={setPicture} />
            <CustomInput value={name} setValue={setName} placeholder={t('table.name')} name={'name'} required/>
            <MultiTextInput value={description} setValue={setDescription} name={'about'} placeholder={t('aboutme')}/>
            <Button variant="outlined" type={'submit'}>ok</Button>
        </form>
    )
}

export default React.memo(UserForm);