import React from 'react';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import {ICommentTextArea} from "./type";

const CommentTextArea = ({value, setValue}:ICommentTextArea) => {
    return (
        <Textarea
            value={value}
            placeholder="Your comment..."
            onChange={(event) => setValue(event.target.value)}
            minRows={3}
            endDecorator={
                <Typography level="body-xs" sx={{ml: 'auto'}}>
                    {value.length} character(s)
                </Typography>
            }
            sx={{
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'inherit'
            }}
        />
    );
}

export default React.memo(CommentTextArea);