import React from "react";
import OutputIcon from '@mui/icons-material/Output';
import PersonIcon from '@mui/icons-material/Person';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {setTheme} from "../../store/slice";

const Header = () => {
    const dispatch = useDispatch();
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore)

    return (
        <header
            className={`${theme === 'dark' 
            ? 'bg-gradient-to-r from-violet-600 via-pink-600 to-purple-600 shadow-black/50'
            : 'bg-gradient-to-r from-violet-400 via-pink-400 to-purple-400'
            }
            w-full min-h-16 h-16 flex justify-between items-center shadow-md z-[1] mobile:px-4 px-16`}>
            <input type={'text'} placeholder={'Search...'}
                   className={`${theme === 'dark' ? 'bg-white/10 focus:bg-white/30' : 'bg-white/30 focus:bg-white/70'}
                   outline-none rounded-md mobile:w-[60%] w-[43%] align-middle py-2 px-4 shadow-md`}
                // onChange={(e) => {
                //     dispatch(setSearch(e.currentTarget.value))
                // }}
            />
            <div className={'flex flex-nowrap justify-end'}>
                <PersonIcon fontSize={'large'} className={'mobile:ml-4 ml-8 cursor-pointer opacity-70 hover:opacity-100'}/>
                {
                    theme === 'dark'
                    ? <LightModeIcon
                            fontSize={'large'}
                            className={'mobile:ml-4 ml-8 cursor-pointer opacity-70 hover:opacity-100'}
                            onClick={() => {
                            localStorage.theme = 'light';
                            dispatch(setTheme('light'));
                        }}/>
                    : <DarkModeIcon
                            fontSize={'large'}
                            className={'mobile:ml-4 ml-8 cursor-pointer opacity-70 hover:opacity-100'}
                            onClick={() => {
                            localStorage.theme = 'dark';
                            dispatch(setTheme('dark'));
                        }}/>
                }
                <OutputIcon fontSize={'large'} className={'mobile:ml-4 ml-8 cursor-pointer opacity-70 hover:opacity-100'}/>
            </div>
        </header>
    )
}

export default Header;