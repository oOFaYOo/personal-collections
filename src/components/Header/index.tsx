import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import OutputIcon from '@mui/icons-material/Output';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';
import {Modal} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {setCurrentUser, setSearchValue, setTheme} from "../../store/slice";
import RegAuth from "../forms/RegAuthForm";
import api from "../../api_client";
import i18n from "i18next";
import {useTranslation} from "react-i18next";

const iconClass = 'mobile:ml-2 ml-8 cursor-pointer opacity-70 hover:opacity-100';

const Header = () => {
    const dispatch = useDispatch();
    const location = useLocation().pathname;
    const {theme, currentUser, searchValue} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [openModal, setOpenModal] = useState(false);
    const [language, setLanguage] = useState<string>('ru');
    // const [searchValue, setSearchValue] = useState<string>('');

    const {t, i18n} = useTranslation();
    const changeLanguage = async (lang: string) => {
        await i18n.changeLanguage(lang);
        setLanguage(lang === 'en' ? 'ru' : 'en');
    }

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
                    <div className={'mobile:w-[60%] w-[43%] flex items-center'}>
                        <input type={'text'} placeholder={t('search')} value={searchValue}
                               onChange={(e) => {
                                   dispatch(setSearchValue(e.currentTarget.value))
                               }}
                               className={`${theme === 'dark' ? 'bg-white/10' : 'bg-white/30'}
                   outline-none rounded-md relative w-full focus:border-2 focus:border-sky-500 align-middle py-2 px-4 shadow-md`}
                        />
                        <button onClick={()=>{
                            if(searchValue && location !== '/search'){
                                document.location = '/search';
                            }
                        }}>
                            <SearchIcon className={iconClass} fontSize={'medium'}/>
                        </button>
                    </div>
                    <div className={'flex flex-nowrap justify-end items-center'}>
                        {
                            language === 'ru'
                                ? <button className={'ml-2'} onClick={() => changeLanguage('ru')}>RU</button>
                                : <button className={'ml-2'} onClick={() => changeLanguage('en')}>EN</button>
                        }
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

export default React.memo(Header);