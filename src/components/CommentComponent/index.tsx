import React from "react";
import {Avatar, Chip} from "@mui/material";
import {ICommentComponent} from "./type";

const CommentComponent = ({text, avatarImage, onDelete, id} : ICommentComponent) => {
    const customStyle = {
        width: '95%',
        minHeight: '40px',
        color: 'inherit',
        display: 'flex',
        justifyContent: onDelete ? 'space-between' : 'flex-start'
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
                avatar={
                    <Avatar className={'cursor-pointer'} src={avatarImage} onClick={()=>{document.location = `/users/${id}`}}/>}/>
        : <Chip
            sx={customStyle}
            variant="outlined"
            label={textElement}
            color="default"
            avatar={
                <Avatar className={'cursor-pointer'} src={avatarImage} onClick={()=>{document.location = `/users/${id}`}}/>}/>
    )
}

export default React.memo(CommentComponent);