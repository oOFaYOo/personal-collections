import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {Link} from "react-router-dom";
import {Avatar, Button, Checkbox, Chip} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Accordion from "../../../../components/Accordion"
import TextArea from "../../../../components/TextArea"


const Item = () => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    return (
        <div className={'w-full flex grow md:flex-row flex-col'}>
            <div className={'flex flex-col w-full md:w-[65%] px-4 py-4 md:h-full'}>
                <div className={'w-full flex-col md:flex-row flex mb-2 md:max-h-[48vh] mb-4 md:min-h-[260px]'}>
                    <div className={'md:h-full md:w-[50%] mb-2 mobile:h-[250px] sm:h-[250px] bg-neutral-500'}>
                        <img/>
                    </div>
                    <div className={'flex w-full md:w-[50%] flex-col'}>
                        <div className={'flex justify-between md:flex-row flex-col-reverse'}>
                            <div className={'flex flex-col p-2'}>
                                <h1 className={'text-xl font-bold'}>Title</h1>
                                <p className={'opacity-30 text-sm'}>c47cy3438cngch34gn38yx</p>
                                <h2 className={'font-semibold italic'}>theme</h2>
                                <Link to={'/users/:id'}>
                                    <h3 className={'text-lg font-semibold'}>author</h3>
                                </Link>
                            </div>
                            <div className={'relative flex items-center justify-center md:justify-start md:flex-col lg:flex-row lg:h-8 gap-1'}>
                                <Button size={'small'} sx={{width:'100%', maxWidth:150}} variant="outlined"
                                        >Edit</Button>
                                <Button size={'small'} sx={{width:'100%', maxWidth:150}} variant="outlined"
                                        >Delete</Button>
                            </div>
                        </div>
                        <div
                            className={'flex mobile:max-h-[150px] sm:max-h-[150px] opacity-70 flex-wrap grow overflow-y-auto text-justify gap-1 styled_scrollbar p-2'}>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                            }}/><Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                        }}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" className={'hover:border-sky-600 cursor-pointer'} sx={{color: 'inherit'}} onDelete={() => {
                            }}/>

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
                            <Checkbox disabled sx={{padding:0,
                                '&.Mui-disabled': {
                                    color: 'inherit',
                                    opacity: '0.3',
                            }}}/>
                            </div>
                            <div>
                                <h3 className={'font-semibold'}>Boolean aria:</h3>
                                <Checkbox disabled sx={{padding:0,
                                    '&.Mui-disabled': {
                                        color: 'inherit',
                                        opacity: '0.3',
                                    }}}/>
                            </div>
                            <div>
                                <h3 className={'font-semibold'}>Boolean aria:</h3>
                                <Checkbox disabled checked sx={{padding:0,
                                    '&.Mui-disabled': {
                                        color: 'inherit',
                                        opacity: '0.3',
                                    }}}/>
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
                <Accordion data={[{title:'Some title of long text', details:'description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description'}, {title:'Some title of long text', details:'description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description'}, {title:'Some title of long text', details:'description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description\n' +
                        '                    description description description description description description description description'}]} />
            </div>
            <div className={'md:absolute md:right-0 flex w-full flex-col md:h-auto md:w-[35%] p-4'}>
                <div className={`${theme === 'dark' ? 'shadow-black/70' : ''} w-full h-[40vh] md:h-[65vh] mb-4 overflow-y-auto styled_scrollbar rounded-md shadow-md flex flex-col items-center gap-4 p-4`}>
                    <Chip
                        sx={{width:'95%', minHeight:'40px', color:'inherit', display:'flex', justifyContent:'space-between'}}
                        variant="outlined"
                        label={<p title={'HJbjkbfdkjbfkd bdjfbkdjbkdj bdjfbkd bfjdbfjbdkjbk bdkfjbdkjfbkdjbkj bdjbfbkdjbfkdjbfk bkdjfbd'} className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj bkjbdkjfb kdjfb kdjbf jkdb kfbk dk bjfbdkjbkf</p>}
                        color="default"
                        onDelete={()=>{}}
                        avatar={<Avatar src="" />} />
                    <Chip
                        sx={{width:'95%', minHeight:'40px', color:'inherit', display:'flex', justifyContent:'space-between'}}
                        variant="outlined"
                        label={<p title={'HJbjkbfdkjbfkd bdjfbkdjbkdj bdjfbkd bfjdbfjbdkjbk bdkfjbdkjfbkdjbkj bdjbfbkdjbfkdjbfk bkdjfbd'} className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj bkjbdkjfb kdjfb kdjbf jkdb kfbk dk bjfbdkjbkf</p>}
                        color="default"
                        onDelete={()=>{}}
                        avatar={<Avatar src="" />} />
                    <Chip
                        sx={{width:'95%', minHeight:'40px', color:'inherit', display:'flex', justifyContent:'space-between'}}
                        variant="outlined"
                        label={<p title={'HJbjkbfdkjbfkd bdjfbkdjbkdj bdjfbkd bfjdbfjbdkjbk bdkfjbdkjfbkdjbkj bdjbfbkdjbfkdjbfk bkdjfbd'} className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj bkjbdkjfb kdjfb kdjbf jkdb kfbk dk bjfbdkjbkf</p>}
                        color="default"
                        onDelete={()=>{}}
                        avatar={<Avatar src="" />} />
                    <Chip
                        sx={{width:'95%', minHeight:'40px', color:'inherit', display:'flex', justifyContent:'space-between'}}
                        variant="outlined"
                        label={<p title={'HJbjkbfdkjbfkd bdjfbkdjbkdj bdjfbkd bfjdbfjbdkjbk bdkfjbdkjfbkdjbkj bdjbfbkdjbfkdjbfk bkdjfbd'} className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj bkjbdkjfb kdjfb kdjbf jkdb kfbk dk bjfbdkjbkf</p>}
                        color="default"
                        onDelete={()=>{}}
                        avatar={<Avatar src="" />} />
                    <Chip
                        sx={{width:'95%', minHeight:'40px', color:'inherit', display:'flex', justifyContent:'space-between'}}
                        variant="outlined"
                        label={<p title={'HJbjkbfdkjbfkd bdjfbkdjbkdj bdjfbkd bfjdbfjbdkjbk bdkfjbdkjfbkdjbkj bdjbfbkdjbfkdjbfk bkdjfbd'} className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj bkjbdkjfb kdjfb kdjbf jkdb kfbk dk bjfbdkjbkf</p>}
                        color="default"
                        onDelete={()=>{}}
                        avatar={<Avatar src="" />} />
                    <Chip
                        sx={{width:'95%', minHeight:'40px', color:'inherit', display:'flex', justifyContent:'space-between'}}
                        variant="outlined"
                        label={<p title={'HJbjkbfdkjbfkd bdjfbkdjbkdj bdjfbkd bfjdbfjbdkjbk bdkfjbdkjfbkdjbkj bdjbfbkdjbfkdjbfk bkdjfbd'} className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj bkjbdkjfb kdjfb kdjbf jkdb kfbk dk bjfbdkjbkf</p>}
                        color="default"
                        onDelete={()=>{}}
                        avatar={<Avatar src="" />} />
                    <Chip
                        sx={{width:'95%', minHeight:'40px', color:'inherit', display:'flex', justifyContent:'space-between'}}
                        variant="outlined"
                        label={<p title={'HJbjkbfdkjbfkd bdjfbkdjbkdj bdjfbkd bfjdbfjbdkjbk bdkfjbdkjfbkdjbkj bdjbfbkdjbfkdjbfk bkdjfbd'} className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj bkjbdkjfb kdjfb kdjbf jkdb kfbk dk bjfbdkjbkf</p>}
                        color="default"
                        onDelete={()=>{}}
                        avatar={<Avatar src="" />} />

                    <Chip
                        sx={{width:'95%', minHeight:'40px', color:'inherit', display:'flex', justifyContent:'space-between'}}
                        variant="outlined"
                        label={<p title={'HJbjkbfdkjbfkd bdjfbkdjbkdj bdjfbkd bfjdbfjbdkjbk bdkfjbdkjfbkdjbkj bdjbfbkdjbfkdjbfk bkdjfbd'} className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj bkjbdkjfb kdjfb kdjbf jkdb kfbk dk bjfbdkjbkf</p>}
                        color="default"
                        onDelete={()=>{}}
                        avatar={<Avatar src="" />} />
                    <Chip
                        sx={{width:'95%', minHeight:'40px', color:'inherit', display:'flex', justifyContent:'space-between'}}
                        variant="outlined"
                        label={<p title={'HJbjkbfdkjbfkd bdjfbkdjbkdj bdjfbkd bfjdbfjbdkjbk bdkfjbdkjfbkdjbkj bdjbfbkdjbfkdjbfk bkdjfbd'} className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj bkjbdkjfb kdjfb kdjbf jkdb kfbk dk bjfbdkjbkf</p>}
                        color="default"
                        onDelete={()=>{}}
                        avatar={<Avatar src="" />} />
                    <Chip
                        sx={{width:'95%', minHeight:'40px', color:'inherit', display:'flex', justifyContent:'space-between'}}
                        variant="outlined"
                        label={<p title={'HJbjkbfdkjbfkd bdjfbkdjbkdj bdjfbkd bfjdbfjbdkjbk bdkfjbdkjfbkdjbkj bdjbfbkdjbfkdjbfk bkdjfbd'} className={'overflow-hidden text-center text-ellipsis'}>Jbjbkjd bdjbfd bkjfbksj bkjbdkjfb kdjfb kdjbf jkdb kfbk dk bjfbdkjbkf</p>}
                        color="default"
                        onDelete={()=>{}}
                        avatar={<Avatar src="" />} />
                </div>
                <div className={'flex w-full'}>
                    <div className={`w-[70%] ${theme === 'dark' ? 'shadow-black/70' : ''} rounded-md shadow-md`}>
                        <TextArea />
                    </div>
                    <div className={`flex flex-col grow items-center justify-center gap-2`}>
                        <Button sx={{width:'80%'}} variant="outlined">
                            <FavoriteBorderIcon />
                            {/*<FavoriteIcon />*/}
                        </Button>
                        <Button sx={{width:'80%'}} variant="outlined">Send</Button>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Item;