import InputFileUpload from "../../UploadImage";
import {Button, Checkbox, FormControl, FormControlLabel, MenuItem, Select, TextField} from "@mui/material";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import TextInput from "../../CustomInput";
import MultiTextInput from "../../MultiTextInput";

const InputForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);
    const [date, setDate] = useState<any>(null);

    function clean (){
        setName('');
        setDescription('');
    }

    return (
        <form className={`${theme === 'dark' ? 'bg-neutral-900 text-neutral-200' : 'bg-neutral-100 text-neutral-900'}
         p-8 gap-4 outline-none rounded-md shadow-md flex-col justify-evenly items-center overflow-y-auto max-h-[90vh] styled_scrollbar`}
              onSubmit={(e)=>{
                  clean();
              }}>
            <div className={'flex lg:flex-row gap-2 flex-col items-center justify-between mb-4'}>
                <InputFileUpload />
                <TextInput value={name} setValue={setName} placeholder={'Title'} name={'title'} required/>
                <MultiTextInput value={''} setValue={()=>{}} name={'tag'} placeholder={"Tags"} required />
            </div>

            <div className={'flex flex-col items-center gap-4 opacity-80'}>
                <h3>Additional item Fields</h3>
                <div className={'flex lg:flex-row flex-col justify-evenly gap-2'}>
                    <div className={'flex flex-col gap-2'}>
                        <TextInput value={''} setValue={()=>{}} placeholder={'Text'} name={'text1'} size={'small'}/>
                        <TextInput value={''} setValue={()=>{}} placeholder={'Text'} name={'text2'} size={'small'}/>
                        <TextInput value={''} setValue={()=>{}} placeholder={'Text'} name={'text3'} size={'small'}/>
                    </div>
                    <div className={'flex flex-col gap-2 mx-2'}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Bool" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Bool" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Bool" />
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <TextInput value={''} setValue={()=>{}} type={'number'} placeholder={'Number'} name={'number1'} size={'small'}/>
                        <TextInput value={''} setValue={()=>{}} type={'number'} placeholder={'Number'} name={'number2'} size={'small'}/>
                        <TextInput value={''} setValue={()=>{}} type={'number'} placeholder={'Number'} name={'number3'} size={'small'}/>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <TextInput value={date} setValue={setDate} type={'date'} placeholder={'Date'} name={'number1'} size={'small'}/>
                        <TextInput value={''} setValue={()=>{}} type={'date'} placeholder={'Date'} name={'number2'} size={'small'}/>
                        <TextInput value={''} setValue={()=>{}} type={'date'} placeholder={'Date'} name={'number3'} size={'small'}/>
                    </div>
                </div>
                <div className={'flex lg:flex-row flex-col gap-2'}>
                    <MultiTextInput value={''} setValue={()=>{}} name={'description1'} placeholder={'Paragraph'}/>
                    <MultiTextInput value={''} setValue={()=>{}} name={'description2'} placeholder={'Paragraph'}/>
                    <MultiTextInput value={''} setValue={()=>{}} name={'description3'} placeholder={'Paragraph'}/>
                </div>
                <Button variant="outlined" type={'submit'}>ok</Button>
            </div>
        </form>
    )
}

export default InputForm;