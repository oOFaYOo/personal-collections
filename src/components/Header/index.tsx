import React from "react";
import OutputIcon from '@mui/icons-material/Output';
import PersonIcon from '@mui/icons-material/Person';

const Header = () => {
    return (
        <header
            className={'bg-gradient-to-r from-violet-400 via-pink-400 to-purple-400 w-full h-16 flex justify-between items-center mobile:px-4 px-16'}>
            <input type={'text'} placeholder={'Search...'}
                   className={'bg-white/30 outline-none rounded-md mobile:w-[60%] w-[43%] align-middle py-2 px-4 shadow-md'}
                // onChange={(e) => {
                //     dispatch(setSearch(e.currentTarget.value))
                // }}
            />
            <div className={'flex flex-nowrap justify-end'}>
                <PersonIcon fontSize={'large'} className={'mobile:ml-4 ml-8 cursor-pointer opacity-80 hover:opacity-100'}/>
                <OutputIcon fontSize={'large'} className={'mobile:ml-4 ml-8 cursor-pointer opacity-80 hover:opacity-100'}/>
            </div>
        </header>
    )
}

export default Header;