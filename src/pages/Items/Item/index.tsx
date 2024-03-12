import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {Avatar, Button, Checkbox, Chip, Modal} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InsertCommentRoundedIcon from '@mui/icons-material/InsertCommentRounded';
import Accordion from "../../../components/Accordion"
import TextArea from "../../../components/inputs/CommentTextArea"
import ItemForm from "../../../components/forms/ItemForm";
import {IItem} from "./type";
// @ts-ignore
import noImg from "../../../svg/no-img.svg";

const Item = ({setTop}: IItem) => {

    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [openModal, setOpenModal] = useState(false);

    const avatar = '';
    const isfavorit = false;

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
                    <ItemForm setOpenModal={setOpenModal}/>
                </Modal>
            }
            <div
                className={'flex flex-col w-full md:w-[65%] px-4 py-4 md:max-h-[90vh] styled_scrollbar overflow-y-auto'}
                onScroll={(e) => {
                    setTop(e.currentTarget.scrollTop)
                }}>
                <div className={'w-full flex-col md:flex-row flex mb-4 md:max-h-[48vh] mb-4 md:min-h-[260px]'}>
                    <div className={'md:h-full pb-4 md:w-[50%] h-[250px] flex justify-center items-center'}>
                        {
                            avatar
                                ? <img
                                    src={'https://sun9-27.userapi.com/impg/M2gNPOTpINWsFHVOpjc-RSk2rpNKlAfEriopig/ukWQzow150s.jpg?size=1024x1024&quality=96&sign=3908fb39593d5a5b7e8909ce936462bf&type=album'}
                                    className={'relative h-full rounded-full shadow-md'}/>
                                : <div
                                    className={'relative h-[245px] w-[245px] rounded-full shadow-md overflow-hidden flex justify-center items-center bg-neutral-100'}>
                                    <img src={noImg} className={'relative max-w-[140%]'}/></div>
                        }
                    </div>
                    <div className={'flex w-full md:w-[50%] flex-col'}>
                        <div className={'flex justify-between md:flex-row flex-col-reverse'}>
                            <div className={'flex flex-col p-2'}>
                                <h1 className={'text-xl font-bold'}>Title</h1>
                                <p className={'opacity-30 text-sm'}>c47cy3438cngch34gn38yx</p>
                                <h2 className={'font-semibold italic'}>theme</h2>
                                <Link to={'/users/:id'}>
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
                            className={'flex mobile:max-h-[150px] sm:max-h-[150px] opacity-70 flex-wrap grow overflow-y-auto text-justify gap-1 styled_scrollbar p-2'}>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'}
                                  sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'}
                                  sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'}
                                  sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'}
                                  sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'}
                                  sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'}
                                  sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'}
                                  sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'}
                                  sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'}
                                  sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'}
                                  sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'}
                                  sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'}
                                  sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'}
                                  sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'}
                                  sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'}
                                  sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'}
                                  sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'}
                                  sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'}
                                  sx={{color: 'inherit'}}/>
                        </div>
                    </div>
                </div>
                <div className={'w-full mb-2 flex lg:flex-row flex-col lg:justify-between'}>
                    <div className={'flex lg:w-[49%] w-full justify-evenly mb-4 overflow-x-auto'}>
                        <div className={'flex flex-col items-start w-[40%]'}>
                            <h3 className={'font-semibold'}>Date:
                                <p className={'font-normal opacity-70'}>10.09.2043</p>
                            </h3>
                            <h3 className={'font-semibold'}>Date:
                                <p className={'font-normal opacity-70'}>10.09.2043</p>
                            </h3>
                            <h3 className={'font-semibold'}>Date:
                                <p className={'font-normal opacity-70'}>10.09.2043</p>
                            </h3>
                        </div>
                        <div className={'flex flex-col items-start w-[59%]'}>
                            <h3 className={'font-semibold'}>Amount of somthing:
                                <p className={'font-normal opacity-70'}>7464967</p>
                            </h3>
                            <h3 className={'font-semibold'}>Amount of somthing:
                                <p className={'font-normal opacity-70'}>7464967</p>
                            </h3>
                            <h3 className={'font-semibold'}>Amount of somthing:
                                <p className={'font-normal opacity-70'}>7464967</p>
                            </h3>
                        </div>
                    </div>
                    <div className={'flex lg:w-[49%] w-full justify-evenly'}>
                        <div className={'flex flex-col items-start w-[40%]'}>
                            <div>
                                <h3 className={'font-semibold'}>Boolean aria:</h3>
                                <Checkbox  sx={{
                                    padding: 0,
                                    color: 'inherit',
                                    opacity: '0.7',
                                    '&.Mui-disabled': {
                                        color: 'inherit',
                                        opacity: '0.3',
                                    }
                                }}/>
                            </div>
                            <div>
                                <h3 className={'font-semibold'}>Boolean aria:</h3>
                                <Checkbox disabled sx={{
                                    padding: 0,
                                    color: 'inherit',
                                    opacity: '0.7',
                                    '&.Mui-disabled': {
                                        color: 'inherit',
                                        opacity: '0.3',
                                    }
                                }}/>
                            </div>
                            <div>
                                <h3 className={'font-semibold'}>Boolean aria:</h3>
                                <Checkbox disabled checked sx={{
                                    padding: 0,
                                    color: 'inherit',
                                    opacity: '0.7',
                                    '&.Mui-disabled': {
                                        color: 'inherit',
                                        opacity: '0.3',
                                    }
                                }}/>
                            </div>
                        </div>
                        <div className={'flex flex-col items-start w-[59%]'}>
                            <h3 className={'font-semibold'}>Some short text area:
                                <p className={'font-normal opacity-70'}>Hkjfbddvk jkdjf</p>
                            </h3>
                            <h3 className={'font-semibold'}>Some short text area:
                                <p className={'font-normal opacity-70'}>Hkjfbddvk jkdjf</p>
                            </h3>
                            <h3 className={'font-semibold'}>Some short text area:
                                <p className={'font-normal opacity-70'}>Hkjfbddvk jkdjf</p>
                            </h3>
                        </div>
                    </div>
                </div>
                <Accordion data={[{
                    title: 'Some title of long text',
                    details: 'description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description'
                }, {
                    title: 'Some title of long text',
                    details: 'description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description'
                }, {
                    title: 'Some title of long text',
                    details: 'description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description'
                }]}/>
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
                                        : <FavoriteBorderIcon fontSize={"small"} className={'cursor-pointer opacity-70 hover:opacity-100 hover:text-[#1976d2]'}/>
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