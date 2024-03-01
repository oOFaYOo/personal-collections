import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {Link} from "react-router-dom";
import {Button, Checkbox, Chip, Divider} from "@mui/material";

const Item = () => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    return (
        <div className={'w-full flex grow md:flex-row flex-col'}>
            <div className={'flex flex-col w-full md:w-[65%] bg-green-500 px-4 pt-4 md:h-full overflow-y-auto styled_scrollbar'}>
                <div className={'w-full flex-col md:flex-row flex mb-4 max-h-[50vh]'}>
                    <div className={'bg-red-500 h-full md:w-[50%] mobile:h-[250px] mb-4'}>
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
                            <div className={'relative flex items-center lg:justify-center md:flex-col lg:flex-row lg:h-8 gap-1'}>
                                <Button size={'small'} sx={{width:'100%', maxWidth:150}} variant="outlined"
                                        color={theme === 'dark' ? 'inherit' : 'primary'}>Edit</Button>
                                <Button size={'small'} sx={{width:'100%', maxWidth:150}} variant="outlined"
                                        color={theme === 'dark' ? 'inherit' : 'primary'}>Delete</Button>
                            </div>
                        </div>
                        <div
                            className={'flex mobile:max-h-[150px] flex-wrap grow overflow-y-auto text-justify gap-1 styled_scrollbar p-2 bg-yellow-500'}>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/><Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                        }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                            }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/><Chip label="#tag" variant="outlined" sx={{color: 'inherit'}} onDelete={() => {
                        }}/>
                            <Chip label="#tag" variant="outlined" sx={{color: 'inherit'}}/>

                        </div>
                    </div>
                </div>
                <div className={'bg-pink-500 w-full mb-4 flex lg:flex-row flex-col lg:justify-between'}>
                    <div className={'flex lg:w-[49%] w-full bg-cyan-500 justify-evenly mb-4 overflow-x-auto'}>
                        <div className={'flex flex-col items-start w-[40%]'}>
                            <h3 className={'font-semibold'}>Date:
                                <p className={'font-normal'}>10.09.2043</p>
                            </h3>
                            <h3 className={'font-semibold'}>Date:
                                <p className={'font-normal'}>10.09.2043</p>
                            </h3>
                            <h3 className={'font-semibold'}>Date:
                                <p className={'font-normal'}>10.09.2043</p>
                            </h3>
                        </div>
                        <div className={'flex flex-col items-start w-[59%]'}>
                            <h3 className={'font-semibold'}>Amount of somthing:
                                <p className={'font-normal'}>7464967</p>
                            </h3>
                            <h3 className={'font-semibold'}>Amount of somthing:
                                <p className={'font-normal'}>7464967</p>
                            </h3>
                            <h3 className={'font-semibold'}>Amount of somthing:
                                <p className={'font-normal'}>7464967</p>
                            </h3>
                        </div>
                    </div>
                    <div className={'flex lg:w-[49%] w-full bg-red-500 justify-evenly overflow-x-auto'}>
                        <div className={'flex flex-col items-start w-[40%]'}>
                            <div>
                            <h3 className={'font-semibold'}>Boolean aria:</h3>
                            <Checkbox disabled checked sx={{padding:0}}/>
                            </div>
                            <div>
                                <h3 className={'font-semibold'}>Boolean aria:</h3>
                                <Checkbox disabled sx={{padding:0}}/>
                            </div>
                            <div>
                                <h3 className={'font-semibold'}>Boolean aria:</h3>
                                <Checkbox disabled checked sx={{padding:0}}/>
                            </div>
                        </div>
                        <div className={'flex flex-col items-start w-[59%]'}>
                            <h3 className={'font-semibold'}>Some short text area:
                                <p className={'font-normal'}>Hkjfbddvk jkdjf</p>
                            </h3>
                            <h3 className={'font-semibold'}>Some short text area:
                                <p className={'font-normal'}>Hkjfbddvk jkdjf</p>
                            </h3>
                            <h3 className={'font-semibold'}>Some short text area:
                                <p className={'font-normal'}>Hkjfbddvk jkdjf</p>
                            </h3>
                        </div>
                    </div>
                </div>
                <h3 className={'font-semibold'}>Some title of long text:</h3>
                <div className={'bg-amber-500 flex w-full text-justify min-h-16 max-h-44 mb-4 overflow-y-auto styled_scrollbar'}>
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                </div>
                <h3 className={'font-semibold'}>Some title of long text:</h3>
                <div className={'bg-amber-500 flex w-full text-justify min-h-16 max-h-44 mb-4 overflow-y-auto styled_scrollbar'}>
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                    description description description description description description description description
                </div>
                <h3 className={'font-semibold'}>Some title of long text:</h3>
                <div className={'bg-amber-500 flex w-full text-justify min-h-16 max-h-44 mb-4 overflow-y-auto styled_scrollbar'}>
                    description description description description description description description description

                </div>
            </div>
            <div className={'flex w-full md:w-[35%] bg-blue-500'}>

            </div>
        </div>
    )
}

export default Item;