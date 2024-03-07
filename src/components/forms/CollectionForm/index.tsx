import InputFileUpload from "../../inputs/UploadImage";
import {Button, FormControl, MenuItem, Select} from "@mui/material";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import CustomInput from "../../inputs/CustomInput";
import MultiTextInput from "../../inputs/MultiTextInput";

const CollectionForm = () => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function clean() {
        setName('');
        setDescription('');
    }

    return (
        <form className={`${theme === 'dark' ? 'bg-neutral-900 text-neutral-200' : 'bg-neutral-100 text-neutral-900'}
         p-8 gap-4 outline-none rounded-md shadow-md flex-col justify-evenly items-center overflow-y-auto max-h-[90vh] styled_scrollbar`}
              onSubmit={(e) => {
                  clean();
              }}>
            <div className={'flex lg:flex-row gap-2 flex-col items-center justify-between mb-4'}>
                <InputFileUpload/>
                <CustomInput value={name} setValue={setName} placeholder={'Title'} name={'title'} required/>
                <FormControl fullWidth sx={{width: '200px'}}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={0}
                        onChange={() => {
                        }}
                        sx={{
                            color: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)',
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)',
                            },
                            '.MuiSvgIcon-root ': {
                                fill: "white !important",
                            }
                        }}
                    >
                        <MenuItem value={0}>Theme</MenuItem>
                        <MenuItem value={1}>Ten</MenuItem>
                        <MenuItem value={2}>Twenty</MenuItem>
                        <MenuItem value={3}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <MultiTextInput value={description} setValue={setDescription} name={'description'}
                                placeholder={'Description'}/>
            </div>
            <div className={'flex flex-col items-center gap-4 opacity-80'}>
                <h3>Additional item fields</h3>
                <div className={'flex lg:flex-row flex-col justify-evenly gap-2'}>
                    <div className={'flex flex-col gap-2'}>
                        <CustomInput value={''} setValue={() => {
                        }} placeholder={'Title of text field'} name={'text1'} size={'small'}/>
                        <CustomInput value={''} setValue={() => {
                        }} placeholder={'Title of text field'} name={'text2'} size={'small'}/>
                        <CustomInput value={''} setValue={() => {
                        }} placeholder={'Title of text field'} name={'text3'} size={'small'}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <CustomInput value={''} setValue={() => {
                        }} placeholder={'Title of numeric field'} name={'number1'} size={'small'}/>
                        <CustomInput value={''} setValue={() => {
                        }} placeholder={'Title of numeric field'} name={'number2'} size={'small'}/>
                        <CustomInput value={''} setValue={() => {
                        }} placeholder={'Title of numeric field'} name={'number3'} size={'small'}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <CustomInput value={''} setValue={() => {
                        }} placeholder={'Title of date field'} name={'date1'} size={'small'}/>
                        <CustomInput value={''} setValue={() => {
                        }} placeholder={'Title of date field'} name={'date2'} size={'small'}/>
                        <CustomInput value={''} setValue={() => {
                        }} placeholder={'Title of date field'} name={'date3'} size={'small'}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <CustomInput value={''} setValue={() => {
                        }} placeholder={'Title of boolean field'} name={'boolean1'} size={'small'}/>
                        <CustomInput value={''} setValue={() => {
                        }} placeholder={'Title of boolean field'} name={'boolean2'} size={'small'}/>
                        <CustomInput value={''} setValue={() => {
                        }} placeholder={'Title of boolean field'} name={'boolean3'} size={'small'}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <CustomInput value={''} setValue={() => {
                        }} placeholder={'Title of paragraph field'} name={'paragraph1'} size={'small'}/>
                        <CustomInput value={''} setValue={() => {
                        }} placeholder={'Title of paragraph field'} name={'paragraph2'} size={'small'}/>
                        <CustomInput value={''} setValue={() => {
                        }} placeholder={'Title of paragraph field'} name={'paragraph3'} size={'small'}/>
                    </div>
                </div>
                <Button variant="outlined" type={'submit'}>ok</Button>
            </div>
        </form>
    )
}

export default CollectionForm;