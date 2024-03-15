import React from "react";
import {Avatar, Chip} from "@mui/material";
import {ICommentComponent} from "./type";

const CommentComponent = ({text, avatarImage, onDelete} : ICommentComponent) => {
    const customStyle = {
        width: '95%',
        minHeight: '40px',
        color: 'inherit',
        display: 'flex',
        justifyContent: 'space-between'
    }

    const textElement =  <p title={text} className={'overflow-hidden ml-2 text-center text-ellipsis'}>{text}</p>;

    return (
        onDelete
        ? <Chip
                sx={customStyle}
                variant="outlined"
                label={textElement}
                color="default"
                onDelete={onDelete}
                avatar={<Avatar src={avatarImage}/>}/>
        : <Chip
            sx={customStyle}
            variant="outlined"
            label={textElement}
            color="default"
            avatar={<Avatar src={avatarImage}/>}/>
    )
}

export default CommentComponent;