import React from 'react';
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import AddIcon from "@mui/icons-material/Add";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const UploadImage = () => {
    return (
        <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<AddIcon/>}
            sx={{textWrap: 'nowrap', minWidth: '150px'}}
        >
            Add photo
            <VisuallyHiddenInput type="file" name={'avatar'}/>
        </Button>
    );
}

export default React.memo(UploadImage);