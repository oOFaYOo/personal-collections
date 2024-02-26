import React, {ReactNode} from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const MainTileContainer = ({children, showMore}: { children: ReactNode[], showMore?: () => void }) => {
    return (
        <div className={'min-w-[300px] w-[43%] h-[43%] mobile:w-full mobile:mb-8 flex flex-row justify-between'}>
            <div className={'relative flex flex-col grow h-full justify-between'}>
                {children}
            </div>
            {
                showMore
                    ? <div
                        className={'flex justify-center items-center rounded-md hover:cursor-pointer text-black/20 hover:text-black hover:bg-gradient-to-r from-transparent to-neutral-200/70 w-[10%]'}
                        onClick={() => showMore}
                    >
                        <ArrowForwardIosIcon/>
                    </div>
                    : <div className={'w-[10%]'}></div>
            }
        </div>
    )
}

export default MainTileContainer;