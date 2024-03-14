import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {Avatar, Button, Checkbox, Chip, CircularProgress, Modal} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InsertCommentRoundedIcon from '@mui/icons-material/InsertCommentRounded';
import Accordion from "../../../components/Accordion"
import TextArea from "../../../components/inputs/CommentTextArea"
import ItemForm from "../../../components/forms/ItemForm";
import {ICollection, IItem} from "../../../api_client/type";
import {IItem as IItemComponents} from "./type";
// @ts-ignore
import noImg from "../../../svg/no-img.svg";
import api from "../../../api_client";

const Item = ({setTop}: IItemComponents) => {
    const {collectionId, itemId} = useParams();
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [openModal, setOpenModal] = useState(false);
    const [item, setItem] = useState<IItem | null>(null);
    const [updateItem, setUpdateItem] = useState<boolean>(false);

    useEffect(() => {
        (
            async () => {
                if (!item || updateItem) {
                    const response = await api.getItem(itemId!);
                    if (response.status === 200) {
                        setItem(response.data);
                    }
                }
                setUpdateItem(false);
            }
        )()
    }, [updateItem])

    const isfavorit = false;

    function getAccordionData(item:IItem){
        const accordionData = [];
        if(item.paragraph1) accordionData.push({
            title: (item.collection as ICollection).paragraph1.label,
            details: item.paragraph1
        })
        if(item.paragraph2) accordionData.push({
            title: (item.collection as ICollection).paragraph2.label,
            details: item.paragraph2
        })
        if(item.paragraph3) accordionData.push({
            title: (item.collection as ICollection).paragraph3.label,
            details: item.paragraph3
        })
        return accordionData;
    }


    return (
        <div className={'w-full flex grow md:flex-row flex-col'}>
            {
                <Modal
                    open={openModal}
                    onClose={() => {
                        setOpenModal(false);
                    }}
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                    <ItemForm setOpenModal={setOpenModal}
                              currentCollection={item?.collection as ICollection}
                              currentItem={item!} setUpdate={setUpdateItem}/>
                </Modal>
            }
            <div
                className={`${item ? '' : 'justify-center'} flex flex-col w-full md:w-[65%] items-center px-4 py-4 
                md:max-h-[90vh] styled_scrollbar overflow-y-auto`}
                onScroll={(e) => {
                    setTop(e.currentTarget.scrollTop)
                }}>
                {
                    !item
                        ? <CircularProgress/>
                        : <>
                            <div className={'w-full flex-col md:flex-row flex mb-4 md:max-h-[48vh] mb-4 md:min-h-[260px]'}>
                                <div className={'md:h-full pb-4 md:w-[50%] h-[250px] flex justify-center items-center'}>
                                    {
                                        item.picture
                                            ? <img
                                                src={item.picture}
                                                className={'relative h-full rounded-full shadow-md'}/>
                                            : <div
                                                className={'relative h-[245px] md:min-w-[245px] w-[245px] rounded-full ' +
                                                    'shadow-md overflow-hidden flex justify-center items-center bg-neutral-100'}>
                                                <img src={noImg} className={'relative max-w-[140%]'}/></div>
                                    }
                                </div>
                                <div className={'flex w-full md:w-[50%] flex-col'}>
                                    <div className={'flex justify-between md:flex-row flex-col-reverse'}>
                                        <div className={'flex flex-col p-2'}>
                                            <h1 className={'text-xl font-bold'}>{item.name}</h1>
                                            <p className={'opacity-30 text-sm'}>{item.id}</p>
                                            <h2 className={'font-semibold italic'}>{item.theme}</h2>
                                            <Link to={`/users/${item.userId}`}>
                                                <h3 className={'text-lg font-semibold text-[#1976d2]'}>author</h3>
                                            </Link>
                                        </div>
                                        <div
                                            className={'relative flex items-center justify-center md:justify-start md:flex-col lg:flex-row lg:h-8 gap-1'}>
                                            <Button size={'small'} sx={{width: '100%', maxWidth: 150}} variant="outlined"
                                                    onClick={() => setOpenModal(true)}
                                            >Edit</Button>
                                            <Button size={'small'} sx={{width: '100%', maxWidth: 150}} variant="outlined"
                                            >Delete</Button>
                                        </div>
                                    </div>
                                    <div
                                        className={'flex mobile:max-h-[150px] sm:max-h-[150px] opacity-70 flex-wrap grow ' +
                                            'overflow-y-auto text-justify gap-1 styled_scrollbar p-2'}>
                                        {
                                            (item.tags.split(', ')).map((tag, index) =>
                                                <Chip key={index} label={`#${tag}`} variant="outlined"
                                                      className={'hover:border-sky-600 cursor-default'}
                                                      sx={{color: 'inherit'}}/>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={'w-full mb-2 pl-8 flex lg:flex-row flex-col lg:justify-between'}>
                                {
                                    item.date1 || item.date2 || item.date3 || item.number1 || item.number2 || item.number3
                                        ? <div className={'flex gap-16 w-full text-nowrap justify-start mb-4 overflow-x-auto'}>
                                            {item.date1 || item.date2 || item.date3
                                                ? <div className={'flex flex-col items-start'}>
                                                    {!item.date1
                                                        ? null
                                                        :
                                                        <h3 className={'font-semibold'}>{(item.collection as ICollection).date1.label}:
                                                            <p className={'font-normal opacity-70'}>{item.date1}</p>
                                                        </h3>
                                                    }
                                                    {!item.date2
                                                        ? null
                                                        :
                                                        <h3 className={'font-semibold'}>{(item.collection as ICollection).date2.label}:
                                                            <p className={'font-normal opacity-70'}>{item.date2}</p>
                                                        </h3>
                                                    }
                                                    {!item.date3
                                                        ? null
                                                        :
                                                        <h3 className={'font-semibold'}>{(item.collection as ICollection).date3.label}:
                                                            <p className={'font-normal opacity-70'}>{item.date3}</p>
                                                        </h3>
                                                    }
                                                </div>
                                                : null
                                            }
                                            {item.number1 || item.number2 || item.number3
                                                ? <div className={'flex flex-col items-start'}>
                                                    {!item.number1
                                                        ? null
                                                        :
                                                        <h3 className={'font-semibold'}>{(item.collection as ICollection).number1.label}:
                                                            <p className={'font-normal opacity-70'}>{item.number1}</p>
                                                        </h3>
                                                    }
                                                    {!item.number2
                                                        ? null
                                                        :
                                                        <h3 className={'font-semibold'}>{(item.collection as ICollection).number2.label}:
                                                            <p className={'font-normal opacity-70'}>{item.number2}</p>
                                                        </h3>
                                                    }
                                                    {!item.number3
                                                        ? null
                                                        :
                                                        <h3 className={'font-semibold'}>{(item.collection as ICollection).number3.label}:
                                                            <p className={'font-normal opacity-70'}>{item.number3}</p>
                                                        </h3>
                                                    }
                                                </div>
                                                : null
                                            }
                                        </div>
                                        : null
                                }

                                <div className={'flex gap-16 text-nowrap w-full justify-start'}>
                                    {
                                        (item.collection as ICollection).checkbox1.label
                                        || (item.collection as ICollection).checkbox2.label
                                        || (item.collection as ICollection).checkbox3.label
                                        || item.text1 || item.text2 || item.text3
                                            ? <div className={'flex flex-col items-start'}>
                                                {
                                                    (item.collection as ICollection).checkbox1.label
                                                        ? <div>
                                                            <h3 className={'font-semibold'}>{(item.collection as ICollection).checkbox1.label}:</h3>
                                                            <Checkbox disabled defaultChecked={item.checkbox1} sx={{
                                                                padding: 0,
                                                                color: 'inherit',
                                                                opacity: '0.7',
                                                                '&.Mui-disabled': {
                                                                    color: 'inherit',
                                                                    opacity: '0.3',
                                                                }
                                                            }}/>
                                                        </div>
                                                        : null
                                                }
                                                {(item.collection as ICollection).checkbox2.label
                                                    ? <div>
                                                        <h3 className={'font-semibold'}>{(item.collection as ICollection).checkbox2.label}:</h3>
                                                        <Checkbox disabled defaultChecked={item.checkbox2} sx={{
                                                            padding: 0,
                                                            color: 'inherit',
                                                            opacity: '0.7',
                                                            '&.Mui-disabled': {
                                                                color: 'inherit',
                                                                opacity: '0.3',
                                                            }
                                                        }}/>
                                                    </div>
                                                    : null
                                                }
                                                {
                                                    (item.collection as ICollection).checkbox3.label
                                                        ? <div>
                                                            <h3 className={'font-semibold'}>{(item.collection as ICollection).checkbox3.label}:</h3>
                                                            <Checkbox disabled defaultChecked={item.checkbox3} sx={{
                                                                padding: 0,
                                                                color: 'inherit',
                                                                opacity: '0.7',
                                                                '&.Mui-disabled': {
                                                                    color: 'inherit',
                                                                    opacity: '0.3',
                                                                }
                                                            }}/>
                                                        </div>
                                                        : null
                                                }
                                            </div>
                                            : null
                                    }

                                    {item.text1 || item.text2 || item.text3
                                        ? <div className={'flex flex-col items-start'}>
                                            {!item.text1
                                                ? null
                                                :
                                                <h3 className={'font-semibold'}>{(item.collection as ICollection).text1.label}:
                                                    <p className={'font-normal opacity-70'}>{item.text1}</p>
                                                </h3>
                                            }
                                            {!item.text2
                                                ? null
                                                :
                                                <h3 className={'font-semibold'}>{(item.collection as ICollection).text2.label}:
                                                    <p className={'font-normal opacity-70'}>{item.text2}</p>
                                                </h3>
                                            }
                                            {!item.text3
                                                ? null
                                                :
                                                <h3 className={'font-semibold'}>{(item.collection as ICollection).text3.label}:
                                                    <p className={'font-normal opacity-70'}>{item.text3}</p>
                                                </h3>
                                            }
                                        </div>
                                        : null
                                    }
                                </div>
                            </div>
                            {
                                item.paragraph1 || item.paragraph2 || item.paragraph3
                                ? <Accordion data={getAccordionData(item)}/>
                                : null
                            }
                        </>
                }
            </div>
            <div className={'flex w-full flex-col md:h-auto md:w-[35%] p-4'}>
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
                            className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj bkjbdkjfb
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
                            className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj bkjbdkjfb
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
                            className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj bkjbdkjfb
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
                            className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj bkjbdkjfb
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
                            className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj bkjbdkjfb
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
                            className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj bkjbdkjfb
                            kdjfb kdjbf jkdb kfbk dk bjfbdkjbkf</p>}
                        color="default"
                        onDelete={() => {
                        }}
                        avatar={<Avatar src=""/>}/>
                </div>
                <div className={'flex w-full'}>
                    <div className={`w-[70%] ${theme === 'dark' ? 'shadow-black/70' : ''} rounded-md shadow-md`}>
                        <TextArea/>
                    </div>
                    <div className={`flex flex-col grow items-center justify-center gap-2`}>
                        <div className={'flex items-center justify-evenly w-full text-sm'}>
                            <p>
                                {
                                    isfavorit
                                        ? <FavoriteIcon fontSize={"small"} className={'cursor-pointer text-[#1976d2]'}/>
                                        : <FavoriteBorderIcon fontSize={"small"}
                                                              className={'cursor-pointer opacity-70 hover:opacity-100 hover:text-[#1976d2]'}/>
                                }
                                232</p>
                            <p><InsertCommentRoundedIcon fontSize={'small'} className={'opacity-70'}/>56</p>
                        </div>
                        <Button sx={{width: '80%'}} variant="outlined">Send</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item;