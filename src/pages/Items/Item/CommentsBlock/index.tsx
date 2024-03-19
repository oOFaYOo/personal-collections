import React, {useEffect, useState} from "react";
import {Button, CircularProgress} from "@mui/material";
import TextArea from "../../../../components/inputs/CommentTextArea";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {useParams} from "react-router-dom";
import {IComment, IItem, ILike, IUser} from "../../../../api_client/type";
import api from "../../../../api_client";
import CommentComponent from "../../../../components/CommentComponent";
import {useTranslation} from "react-i18next";

const CommentsBlock = ({item}: { item: IItem }) => {
    const {collectionId, itemId} = useParams();
    const {theme, currentUser} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<IComment[] | null>(null);
    const [likes, setLikes] = useState<ILike[] | null>(null);
    const [updateLikes, setUpdateLikes] = useState<boolean>(false);

    const {t, i18n} = useTranslation();

    const getCommentsCallback = async () => {
        const response = await api.getComments(itemId!);
        if (response.status === 200) {
            setComments(response.data.sort((a: IComment, b: IComment) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
        }
    }

    useEffect(() => {
        let interval: NodeJS.Timer;
        (async () => {
            if (!comments) {
                await getCommentsCallback();
                    interval = setInterval(async () => {
                    await getCommentsCallback();
                }, 3000)
            }
        })()
        return () => clearInterval(interval)

    }, [])

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
                    w-full h-[40vh] md:grow mb-4 overflow-y-auto styled_scrollbar rounded-md shadow-md flex flex-col items-center gap-4 p-4`}>
                {
                    !comments
                        ? <CircularProgress/>
                        : comments.map((value, i) =>
                            <CommentComponent
                                key={i}
                                id={value.userId}
                                text={value.text}
                                avatarImage={(value.user as unknown as IUser).picture}
                                onDelete={currentUser?.id === value.userId || currentUser?.isAdmin
                                    ? async () => {
                                        await api.deleteComment(value.id);
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
                                likes?.find(value => value.userId?.toString() === currentUser?.id?.toString()) && currentUser
                                    ? <FavoriteIcon fontSize={"small"}
                                                    onClick={async () => {
                                                        if (currentUser) {
                                                            await api.deleteLike((likes?.find(value => value.userId.toString() === currentUser?.id.toString()))!.id);
                                                            setUpdateLikes(true);
                                                        }
                                                    }}
                                                    className={`${currentUser ? 'cursor-pointer' : 'cursor-default'} text-[#1976d2]`}/>
                                    : <FavoriteBorderIcon fontSize={"small"}
                                                          onClick={async () => {
                                                              if (currentUser) {
                                                                  await api.addLike({
                                                                      id: '',
                                                                      userId: currentUser?.id!,
                                                                      itemId: itemId!
                                                                  })
                                                                  setUpdateLikes(true);
                                                              }
                                                          }}
                                                          className={`${currentUser 
                                                              ? 'cursor-pointer hover:opacity-100 hover:text-[#1976d2]' 
                                                              : 'cursor-default'}
                                                           opacity-70`}/>
                            }
                            {likes?.length}</p>
                        <p><InsertCommentOutlinedIcon fontSize={'small'} className={'opacity-70'}/>
                            {comments?.length}
                        </p>
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
                                          await api.addComment({...commentData});
                                          setComment('');
                                      }}>{t('send')}</Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default React.memo(CommentsBlock);