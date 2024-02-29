import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {Link} from "react-router-dom";
import {IMainTileContainer} from "./type";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

const MainTileContainer = ({children, showMore, className}: IMainTileContainer) => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    return (
        <div className={`lg:flex-row-reverse min-w-[300px] mb-12 flex flex-col justify-between w-full`}>
            {
                showMore
                    ? <Link to={showMore.path}
                            className={`${theme === 'dark' 
                                ? `text-neutral-200/30 hover:text-neutral-200 to-black/30` 
                                : `text-neutral-900/30 hover:text-neutral-900 to-neutral-200/70`} 
                                flex justify-end lg:justify-center items-center px-2 lg:py-0 py-2 rounded-md hover:cursor-pointer w-full lg:w-[50px]`}
                    >
                        {
                            <ArrowForwardIosIcon color={'inherit'} fontSize={"large"}/>
                        }
                    </Link>
                    : <div className={'lg:w-[10%] md:w-full'}></div>
            }
            <div className={'relative flex flex-col grow justify-between'}>
                {children}
            </div>
        </div>
    )
}

export default MainTileContainer;