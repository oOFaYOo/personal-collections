import React, {useEffect, useState} from "react";
import {Avatar, Button, Chip, CircularProgress} from "@mui/material";
import TextArea from "../../../../components/inputs/CommentTextArea";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InsertCommentRoundedIcon from "@mui/icons-material/InsertCommentRounded";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {useParams} from "react-router-dom";
import {IComment, IItem, ILike, IUser} from "../../../../api_client/type";
import api from "../../../../api_client";
import CommentComponent from "../../../../components/CommentComponent";

const CommentsBlock = ({item}: { item: IItem }) => {
    const {collectionId, itemId} = useParams();
    const {theme, currentUser} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<IComment[] | null>(null);
    const [likes, setLikes] = useState<ILike[] | null>(null);
    const [updateComments, setUpdateComments] = useState<boolean>(false);
    const [updateLikes, setUpdateLikes] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            if (!comments || updateComments) {
                const response = await api.getComments(itemId!);
                if (response.status === 200) {
                    setComments(response.data);
                }
            }
            setUpdateComments(false);
        })()
    }, [updateComments])

    useEffect(() => {
        (async () => {
            if (!likes || updateLikes) {
                const response = await api.getLikes(itemId!);
                if (response.status === 200) {
                    setLikes(response.data);
                }
            }
            setUpdateLikes(false);
        })()
    }, [updateLikes])

    return (
        <div className={`${item ? 'justify-center items-center' : ''} flex w-full flex-col md:h-auto md:w-[35%] p-4`}>
            <div
                className={`${theme === 'dark' ? 'shadow-black/70' : ''} 
                    w-full h-[40vh] md:h-[65vh] mb-4 overflow-y-auto styled_scrollbar rounded-md shadow-md flex flex-col items-center gap-4 p-4`}>
                {
                    !comments
                        ? <CircularProgress/>
                        : comments.map((value, i) =>
                            <CommentComponent
                                id={value.userId}
                                text={value.text}
                                avatarImage={(value.user as unknown as IUser).picture}
                                onDelete={currentUser?.id === value.userId || currentUser?.isAdmin
                                    ? async () => {
                                        await api.deleteComment(value.id);
                                        setUpdateComments(true);
                                    } : undefined}/>
                        )
                }
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
                                likes?.find(value => value.userId.toString() === currentUser?.id.toString()) && currentUser
                                    ? <FavoriteIcon fontSize={"small"}
                                                    onClick={async ()=>{
                                                        if(currentUser) {
                                                            await api.deleteLike((likes?.find(value => value.userId.toString() === currentUser?.id.toString()))!.id);
                                                            setUpdateLikes(true);
                                                        }
                                                    }}
                                                    className={`${currentUser ? 'cursor-pointer' : 'cursor-default'} text-[#1976d2]`}/>
                                    : <FavoriteBorderIcon fontSize={"small"}
                                                          onClick={async ()=>{
                                                              if(currentUser) {
                                                                  await api.addLike(itemId!, {
                                                                      id: '',
                                                                      userId: currentUser?.id!,
                                                                      itemId: itemId!
                                                                  })
                                                                  setUpdateLikes(true);
                                                              }
                                                          }}
                                                          className={`${currentUser ? 'cursor-pointer' : 'cursor-default'}
                                                           opacity-70 hover:opacity-100 hover:text-[#1976d2]`}/>
                            }
                            {likes?.length}</p>
                        <p><InsertCommentRoundedIcon fontSize={'small'} className={'opacity-70'}/>{comments?.length}</p>
                    </div>
                    {
                        !currentUser
                            ? null
                            : <Button sx={{width: '80%'}} variant="outlined" disabled={comment === ''}
                                      onClick={async () => {
                                          const commentData = {
                                              id: '',
                                              user: '',
                                              userId: currentUser?.id,
                                              itemId: itemId!,
                                              text: comment,
                                              timestamp: '',
                                          }
                                          await api.addComment(itemId!, commentData);
                                          setComment('');
                                          setUpdateComments(true);
                                      }}>Send</Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default CommentsBlock;