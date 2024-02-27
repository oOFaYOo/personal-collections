import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {Link} from "react-router-dom";
import {IMainTileContainer} from "./type";

const MainTileContainer = ({children, showMore}: IMainTileContainer) => {
    return (
        <div className={'min-w-[300px] lg:w-[43%] h-[43%] md:w-full md:mb-8 flex lg:flex-row-reverse mobile:flex-col md:flex-col justify-between'}>
            {
                showMore
                    ? <Link to={showMore}
                            className={'flex justify-center items-center mobile:py-2 md:py-2 rounded-md hover:cursor-pointer text-black/20 ' +
                                'hover:text-black hover:bg-gradient-to-r from-transparent to-neutral-200/70 mobile:w-full md:w-full lg:w-[10%]'}
                    >
                        <ArrowForwardIosIcon fontSize={"large"}/>
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