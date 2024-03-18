import React from 'react';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import {ICommentTextArea} from "./type";
import {useTranslation} from "react-i18next";

const CommentTextArea = ({value, setValue}:ICommentTextArea) => {
    const {t, i18n} = useTranslation();

    return (
        <Textarea
            value={value}
            placeholder={t('commentPlaceholder')}
            onChange={(event) => setValue(event.target.value)}
            minRows={3}
            endDecorator={
                <Typography level="body-xs" sx={{ml: 'auto'}}>
                    {value.length}{' '}{t('characters')}
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