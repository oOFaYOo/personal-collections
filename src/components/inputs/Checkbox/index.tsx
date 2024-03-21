import React from "react";
import {ICheckbox} from "./type";
import {Checkbox as MUICheckbox} from "@mui/material";

const Checkbox = ({checked, onChange, disabled=false, defaultChecked=false, className}:ICheckbox) => {
    return (
        <MUICheckbox
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={(e) => onChange ? onChange(e.currentTarget.checked) : {}}
            disabled={disabled}
            className={className}
            sx={{
                padding: 0,
                marginRight: '4px',
                color: 'inherit',
                '&.Mui-disabled': {
                    color: 'inherit',
                    opacity: '0.3',
                }
            }}
        />
    )
}

export default Checkbox;