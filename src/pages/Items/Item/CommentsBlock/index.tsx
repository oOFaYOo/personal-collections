import React, {useState} from "react";
import {Avatar, Button, Chip, CircularProgress} from "@mui/material";
import TextArea from "../../../../components/inputs/CommentTextArea";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InsertCommentRoundedIcon from "@mui/icons-material/InsertCommentRounded";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {useParams} from "react-router-dom";
import {IItem} from "../../../../api_client/type";

const CommentsBlock = ({item}: { item: IItem }) => {
    const {collectionId, itemId} = useParams();
    const {theme, currentUser} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [comment, setComment] = useState<string>('');

    const isfavorit = false;

    return (
        <div className={`${item ? 'justify-center items-center' : ''} flex w-full flex-col md:h-auto md:w-[35%] p-4`}>
            <div
                className={`${theme === 'dark' ? 'shadow-black/70' : ''} 
                    w-full h-[40vh] md:h-[65vh] mb-4 overflow-y-auto styled_scrollbar rounded-md shadow-md flex flex-col items-center gap-4 p-4`}>
                <Chip
                    sx={{
                        width: '95%',
                        minHeight: '40px',
                        color: 'inherit',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                    variant="outlined"
                    label={<p
                        title={'HJbjkbfdkjbfkd bdjfbkdjbkdj bdjfbkd bfjdbfjbdkjbk bdkfjbdkjfbkdjbkj bdjbfbkdjbfkdjbfk bkdjfbd'}
                        className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj
                        bkjbdkjfb
                        kdjfb kdjbf jkdb kfbk dk bjfbdkjbkf</p>}
                    color="default"
                    onDelete={() => {
                    }}
                    avatar={<Avatar src=""/>}/>
                <Chip
                    sx={{
                        width: '95%',
                        minHeight: '40px',
                        color: 'inherit',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                    variant="outlined"
                    label={<p
                        title={'HJbjkbfdkjbfkd bdjfbkdjbkdj bdjfbkd bfjdbfjbdkjbk bdkfjbdkjfbkdjbkj bdjbfbkdjbfkdjbfk bkdjfbd'}
                        className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj
                        bkjbdkjfb
                        kdjfb kdjbf jkdb kfbk dk bjfbdkjbkf</p>}
                    color="default"
                    onDelete={() => {
                    }}
                    avatar={<Avatar src=""/>}/>
                <Chip
                    sx={{
                        width: '95%',
                        minHeight: '40px',
                        color: 'inherit',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                    variant="outlined"
                    label={<p
                        title={'HJbjkbfdkjbfkd bdjfbkdjbkdj bdjfbkd bfjdbfjbdkjbk bdkfjbdkjfbkdjbkj bdjbfbkdjbfkdjbfk bkdjfbd'}
                        className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj
                        bkjbdkjfb
                        kdjfb kdjbf jkdb kfbk dk bjfbdkjbkf</p>}
                    color="default"
                    onDelete={() => {
                    }}
                    avatar={<Avatar src=""/>}/>
                <Chip
                    sx={{
                        width: '95%',
                        minHeight: '40px',
                        color: 'inherit',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                    variant="outlined"
                    label={<p
                        title={'HJbjkbfdkjbfkd bdjfbkdjbkdj bdjfbkd bfjdbfjbdkjbk bdkfjbdkjfbkdjbkj bdjbfbkdjbfkdjbfk bkdjfbd'}
                        className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj
                        bkjbdkjfb
                        kdjfb kdjbf jkdb kfbk dk bjfbdkjbkf</p>}
                    color="default"
                    onDelete={() => {
                    }}
                    avatar={<Avatar src=""/>}/>
                <Chip
                    sx={{
                        width: '95%',
                        minHeight: '40px',
                        color: 'inherit',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                    variant="outlined"
                    label={<p
                        title={'HJbjkbfdkjbfkd bdjfbkdjbkdj bdjfbkd bfjdbfjbdkjbk bdkfjbdkjfbkdjbkj bdjbfbkdjbfkdjbfk bkdjfbd'}
                        className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj
                        bkjbdkjfb
                        kdjfb kdjbf jkdb kfbk dk bjfbdkjbkf</p>}
                    color="default"
                    onDelete={() => {
                    }}
                    avatar={<Avatar src=""/>}/>
                <Chip
                    sx={{
                        width: '95%',
                        minHeight: '40px',
                        color: 'inherit',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                    variant="outlined"
                    label={<p
                        title={'HJbjkbfdkjbfkd bdjfbkdjbkdj bdjfbkd bfjdbfjbdkjbk bdkfjbdkjfbkdjbkj bdjbfbkdjbfkdjbfk bkdjfbd'}
                        className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj
                        bkjbdkjfb
                        kdjfb kdjbf jkdb kfbk dk bjfbdkjbkf</p>}
                    color="default"
                    onDelete={() => {
                    }}
                    avatar={<Avatar src=""/>}/>
            </div>
            <div className={'flex w-full'}>
                {
                    !currentUser
                        ? null
                        : <div className={`w-[70%] ${theme === 'dark' ? 'shadow-black/70' : ''} rounded-md shadow-md`}>
                            <TextArea value={comment} setValue={setComment}/>
                        </div>
                }
                <div className={`flex flex-col grow items-center justify-center gap-2`}>
                    <div className={'flex items-center justify-evenly w-full text-sm'}>
                        <p>
                            {
                                isfavorit && currentUser
                                    ? <FavoriteIcon fontSize={"small"}
                                                    className={`${currentUser ? 'cursor-pointer' : 'cursor-default'} text-[#1976d2]`}/>
                                    : <FavoriteBorderIcon fontSize={"small"}
                                                          className={`${currentUser ? 'cursor-pointer' : 'cursor-default'}
                                                           opacity-70 hover:opacity-100 hover:text-[#1976d2]`}/>
                            }
                            232</p>
                        <p><InsertCommentRoundedIcon fontSize={'small'} className={'opacity-70'}/>56</p>
                    </div>
                    {
                        !currentUser
                            ? null
                            : <Button sx={{width: '80%'}} variant="outlined" disabled={comment === ''} onClick={() => {
                                const commentData = {
                                    id: '',
                                    user: '',
                                    userId: currentUser?.id,
                                    itemId: itemId,
                                    text: comment,
                                    timestamp: '',
                                }
                            }}>Send</Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default CommentsBlock;