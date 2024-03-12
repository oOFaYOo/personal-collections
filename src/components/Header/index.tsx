import React, {useState} from "react";
import {Link} from "react-router-dom";
import OutputIcon from '@mui/icons-material/Output';
import PersonIcon from '@mui/icons-material/Person';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';
import {Modal} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {setCurrentUser, setTheme} from "../../store/slice";
import RegAuth from "../forms/RegAuthForm";
import api from "../../api_client";

const iconClass = 'mobile:ml-2 ml-8 cursor-pointer opacity-70 hover:opacity-100';

const Header = () => {
    const dispatch = useDispatch();
    const {theme, currentUser} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            {
                <Modal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                    <RegAuth setOpenModal={setOpenModal}/>
                </Modal>
            }
            <header
                className={`${theme === 'dark' ? 'bg-neutral-900 text-neutral-200' : 'bg-neutral-100 text-neutral-900'}
            w-full min-h-16 max-h-16 flex justify-between sticky top-0 items-center z-[1] mobile:px-4 px-16`}>
                <input type={'text'} placeholder={'Search...'}
                       className={`${theme === 'dark' ? 'bg-white/10' : 'bg-white/30'}
                   outline-none rounded-md mobile:w-[60%] w-[43%] focus:border-2 focus:border-sky-500 align-middle py-2 px-4 shadow-md`}
                />
                <div className={'flex flex-nowrap justify-end items-center'}>
                    <p className={'ml-2'}>EN</p>
                    <Link to={'/'}>
                        <HomeIcon fontSize={'medium'}
                                  className={iconClass}/>
                    </Link>
                    {
                        currentUser
                            ? <Link to={`/users/${localStorage.userId}`} reloadDocument>
                                <PersonIcon fontSize={'medium'}
                                            className={iconClass}/>
                            </Link>
                            : null
                    }
                    {
                        theme === 'dark'
                            ? <LightModeIcon
                                fontSize={'medium'}
                                className={iconClass}
                                onClick={() => {
                                    localStorage.theme = 'light';
                                    dispatch(setTheme('light'));
                                }}/>
                            : <DarkModeIcon
                                fontSize={'medium'}
                                className={iconClass}
                                onClick={() => {
                                    localStorage.theme = 'dark';
                                    dispatch(setTheme('dark'));
                                }}/>
                    }
                    <OutputIcon fontSize={'medium'} className={iconClass} onClick={async () => {
                        if (currentUser) {
                            await api.logout(currentUser.id);
                            dispatch(setCurrentUser(null));
                            localStorage.removeItem('userId');
                            document.cookie = `${document.cookie}; max-age=0`;
                        } else {
                            setOpenModal(true)
                        }
                    }}/>
                </div>
            </header>
        </>
    )
}

export default Header;