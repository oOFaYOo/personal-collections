import {TextField} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {ICustomInput} from "./type";

const CustomInput = ({
                         value,
                         setValue,
                         name,
                         placeholder,
                         required = false,
                         size = 'medium',
                         type = 'text',
                         disabled = false,
                         fullWidth = false
                     }: ICustomInput) => {

    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    return (
        <TextField
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            type={type}
            size={size}
            required={required}
            inputProps={{maxLength: 20}}
            value={value}
            sx={{
                minWidth: '200px',
                width: fullWidth ? '100%' : '',
                input: {color: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)'},
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
            onChange={(e) => setValue(e.currentTarget.value)}
        />
    )
}

export default CustomInput;