import InputFileUpload from "../../UploadImage";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import React, {useState} from "react";

const CollectionForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function clean (){
        setName('');
        setDescription('');
    }

    return (
        <form className={'p-8 gap-4 bg-neutral-200 outline-none rounded-md shadow-md flex-col justify-evenly items-center'}
              onSubmit={(e)=>{
                  clean();
              }}>
            <div className={'flex flex-row gap-2 justify-between mb-4'}>
                <InputFileUpload />
                <TextField
                    placeholder="Title"
                    name={'title'}
                    type="text"
                    inputProps={{ maxLength: 20 }}
                    value={name}
                    sx={{minWidth:'200px'}}
                    onChange={(e)=>setName(e.currentTarget.value)}
                />
                <FormControl fullWidth sx={{width:'200px'}}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={0}
                        onChange={()=>{}}
                    >
                        <MenuItem value={0}>Theme</MenuItem>
                        <MenuItem value={1}>Ten</MenuItem>
                        <MenuItem value={2}>Twenty</MenuItem>
                        <MenuItem value={3}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    placeholder="Description"
                    name={'description'}
                    type="text"
                    multiline
                    sx={{maxHeight:150, overflowY:'auto', width:'250px'}}
                    value={description}
                    onChange={(e)=>setDescription(e.currentTarget.value)}
                />
            </div>
            <div className={'flex flex-col opacity-80'}>
                <h3>Additional item Fields</h3>
                <div className={'flex justify-evenly gap-2'}>
                    <div className={'flex flex-col gap-2'}>
                        <TextField
                            placeholder="Title of text field"
                            name={'text'}
                            type="text"
                            size={'small'}
                            inputProps={{ maxLength: 20 }}
                            value={name}
                            onChange={()=>{}}
                        />
                        <TextField
                            placeholder="Title of text field"
                            name={'text'}
                            type="text"
                            size={'small'}
                            inputProps={{ maxLength: 20 }}
                            value={name}
                            onChange={()=>{}}
                        />
                        <TextField
                            placeholder="Title of text field"
                            name={'text'}
                            type="text"
                            size={'small'}
                            inputProps={{ maxLength: 20 }}
                            onChange={()=>{}}
                        />
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <TextField
                            placeholder="Title of numeric field"
                            name={'number'}
                            type="text"
                            size={'small'}
                            inputProps={{ maxLength: 20 }}
                            value={name}
                            onChange={()=>{}}
                        />
                        <TextField
                            placeholder="Title of numeric field"
                            name={'number'}
                            type="text"
                            size={'small'}
                            inputProps={{ maxLength: 20 }}
                            value={name}
                            onChange={()=>{}}
                        />
                        <TextField
                            placeholder="Title of numeric field"
                            name={'number'}
                            type="text"
                            size={'small'}
                            inputProps={{ maxLength: 20 }}
                            onChange={()=>{}}
                        />
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <TextField
                            placeholder="Title of date field"
                            name={'date'}
                            type="text"
                            size={'small'}
                            inputProps={{ maxLength: 20 }}
                            value={name}
                            onChange={()=>{}}
                        />
                        <TextField
                            placeholder="Title of date field"
                            name={'date'}
                            type="text"
                            size={'small'}
                            inputProps={{ maxLength: 20 }}
                            value={name}
                            onChange={()=>{}}
                        />
                        <TextField
                            placeholder="Title of date field"
                            name={'date'}
                            type="text"
                            size={'small'}
                            inputProps={{ maxLength: 20 }}
                            onChange={()=>{}}
                        />
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <TextField
                            placeholder="Title of boolean field"
                            name={'boolean'}
                            type="text"
                            size={'small'}
                            inputProps={{ maxLength: 20 }}
                            value={name}
                            onChange={()=>{}}
                        />
                        <TextField
                            placeholder="Title of boolean field"
                            name={'boolean'}
                            type="text"
                            size={'small'}
                            inputProps={{ maxLength: 20 }}
                            value={name}
                            onChange={()=>{}}
                        />
                        <TextField
                            placeholder="Title of boolean field"
                            name={'boolean'}
                            type="text"
                            size={'small'}
                            inputProps={{ maxLength: 20 }}
                            onChange={()=>{}}
                        />
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <TextField
                            placeholder="Title of paragraph field"
                            name={'description'}
                            type="text"
                            size={'small'}
                            inputProps={{ maxLength: 20 }}
                            value={name}
                            onChange={()=>{}}
                        />
                        <TextField
                            placeholder="Title of paragraph field"
                            name={'description'}
                            type="text"
                            size={'small'}
                            inputProps={{ maxLength: 20 }}
                            value={name}
                            onChange={()=>{}}
                        />
                        <TextField
                            placeholder="Title of paragraph field"
                            name={'description'}
                            type="text"
                            size={'small'}
                            inputProps={{ maxLength: 20 }}
                            onChange={()=>{}}
                        />
                    </div>
                </div>
            </div>
            <Button variant="outlined" type={'submit'}>ok</Button>
        </form>
    )
}

export default CollectionForm;