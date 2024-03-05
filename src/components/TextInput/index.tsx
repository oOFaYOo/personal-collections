import {TextField} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

const TextInput = ({value, setValue, name, placeholder, size='medium'}:
                       {value:string, setValue: React.Dispatch<React.SetStateAction<string>>, name:string, placeholder:string, size?:"small" | "medium"}) => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    return (
        <TextField
            placeholder={placeholder}
            name={name}
            type="text"
            size={size}
            inputProps={{ maxLength: 20 }}
            value={value}
            sx={{minWidth:'200px',
                input: { color: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)'},
                '& .MuiInput-underline:after': {
                    borderBottomColor: '#1976d2',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)',
                    },
                    '&:hover fieldset': {
                        borderColor: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#1976d2',
                    },
                },
            }}
            onChange={(e)=>setValue(e.currentTarget.value)}
        />
    )
}

export default TextInput;