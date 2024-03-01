import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {Link} from "react-router-dom";
import {Button, Chip} from "@mui/material";

const Item = () => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    return (
        <div className={'relative w-full flex grow'}>
            <div className={'flex w-[60%] bg-green-500 px-4 pt-4 overflow-y-auto styled_scrollbar'}>
                <div className={'w-full flex h-[40%]'}>
                    <div className={'bg-red-500 w-[50%]'}>
                        <img/>
                    </div>
                    <div className={'flex w-[50%] flex-col'}>
                        <div className={'flex flex-row justify-between'}>
                        <div className={'flex flex-col p-4'}>
                            <h1 className={'text-xl font-bold'}>Title</h1>
                            <h2 className={'text-md font-semibold italic'}>theme</h2>
                            <Link to={'/users/:id'}>
                                <h3 className={'text-lg font-semibold'}>author</h3>
                            </Link>
                        </div>
                        <div className={'flex flex-row h-8 gap-1'}>
                            <Button size={'small'} variant="outlined"
                                    color={theme === 'dark' ? 'inherit' : 'primary'}>Edit</Button>
                            <Button size={'small'} variant="outlined"
                                    color={theme === 'dark' ? 'inherit' : 'primary'}>Delete</Button>
                        </div>
                        </div>
                        <div className={'flex flex-wrap grow overflow-y-auto text-justify gap-1 styled_scrollbar p-2 bg-yellow-500'}>
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" /> <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" /> <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" /> <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" /> <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" /> <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" /> <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                            <Chip label="#tag" variant="outlined" onDelete={()=>{}} />
                            <Chip label="#tag" variant="outlined" />
                        </div>
                    </div>
                </div>
            </div>

            
            <div className={'flex w-[40%] bg-blue-500'}>

            </div>
        </div>
    )
}

export default Item;