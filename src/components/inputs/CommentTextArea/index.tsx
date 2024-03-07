import React from 'react';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';

const CommentTextArea = () => {
    const [text, setText] = React.useState('');

    return (
        <Textarea
            placeholder="Your comment..."
            onChange={(event) => setText(event.target.value)}
            minRows={3}
            endDecorator={
                <Typography level="body-xs" sx={{ml: 'auto'}}>
                    {text.length} character(s)
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

export default CommentTextArea;