import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {Link} from "react-router-dom";
import {IMainTileContainer} from "./type";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

const MainTileContainer = ({children, showMore}: IMainTileContainer) => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    return (
        <div className={'min-w-[300px] lg:w-[43%] h-[43%] w-full mb-8 flex lg:flex-row-reverse flex-col justify-between'}>
            {
                showMore
                    ? <Link to={showMore}
                            className={`${theme === 'dark' 
                                ? 'text-neutral-200/30 hover:text-neutral-200 hover:bg-gradient-to-r from-transparent to-black/30' 
                                : 'text-neutral-900/30 hover:text-neutral-900 hover:bg-gradient-to-r from-transparent to-neutral-200/70'} 
                                flex justify-end lg:justify-center items-center px-2 lg:py-0 py-2 rounded-md hover:cursor-pointer w-full w-full lg:w-[10%]`}
                    >
                        <ArrowForwardIosIcon color={'inherit'} fontSize={"large"}/>
                    </Link>
                    : <div className={'lg:w-[10%] md:w-full'}></div>
            }
            <div className={'relative flex flex-col grow h-full justify-between'}>
                {children}
            </div>
        </div>
    )
}

export default MainTileContainer;