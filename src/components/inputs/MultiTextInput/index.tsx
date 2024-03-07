import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {TextField} from "@mui/material";
import {IMultiTextInput} from "./type";

const MultiTextInput = ({
                            value,
                            setValue,
                            name,
                            placeholder,
                            required = false,
                            size = 'medium',
                            type = 'text'
                        }: IMultiTextInput) => {

    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    return (
        <TextField
            placeholder={placeholder}
            name={name}
            type={type}
            size={size}
            required={required}
            inputProps={{maxLength: 20}}
            value={value}
            className={'styled_scrollbar'}
            multiline
            sx={{
                maxHeight: 56,
                overflowY: 'auto',
                width: '250px',
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
                '.MuiOutlinedInput-input': {
                    color: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(23 23 23)'
                }
            }}
            onChange={(e) => setValue(e.currentTarget.value)}
        />
    )
}

export default MultiTextInput;