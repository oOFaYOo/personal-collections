import React from "react";

const Main = () => {
    return (
        <div className={'bg-amber-300 relative w-full flex flex-wrap justify-evenly items-center grow gap-4 overflow-y-auto p-4'}>
            <div className={'bg-blue-500 w-[40%] h-[40%] lg:bg-red-400'}></div>
            <div className={'bg-blue-500 w-[40%] h-[40%] lg:bg-red-400'}></div>
            <div className={'bg-blue-500 w-[40%] h-[40%] lg:bg-red-400'}></div>
            <div className={'bg-blue-500 w-[40%] h-[40%] lg:bg-red-400'}></div>
        </div>
    )
}

export default Main;