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
                         multiline = false
                     }: ICustomInput) => {

    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const sxMultilineText = {
        maxHeight: 56,
        overflowY: 'auto',
        '.MuiOutlinedInput-input': {
            color: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)'
        }
    };

    const sxText = {
        input: {color: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)'},
    };

    let sx;

    if(multiline) sx = sxMultilineText;
    else sx = sxText;

    return (
        <TextField
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            type={type}
            multiline={multiline}
            size={size}
            className={'styled_scrollbar'}
            required={required}
            inputProps={{maxLength: multiline ? '' : 35}}
            value={value}
            sx={{
                ...sx,
                width: '100%',
                minWidth: '200px',
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)',
                    },
                    '&.Mui-disabled fieldset': {
                        borderColor: theme === 'dark' ? 'rgba(229,229,229,0.3)' : 'rgba(23,23,23,0.3)',
                    },
                    '&:hover fieldset': {
                        borderColor: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)',
                    },
                    '&.Mui-disabled:hover fieldset': {
                        borderColor: theme === 'dark' ? 'rgba(229,229,229,0.3)' : 'rgba(23,23,23,0.3)',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#1976d2',
                    },
                },
            }}
            onChange={e => setValue(e.currentTarget.value)}
        />
    )
}

export default React.memo(CustomInput);