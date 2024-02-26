import React from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TagCloud from "../../components/TagCloud";
import Tile from "../../components/Tile";
import MainTileContainer from "../../components/Main-TileContainer";

const arr = [1,1,1,1,1];

const Main = () => {
    return (
        <div
            className={'relative w-full flex py-4 flex-wrap justify-evenly items-center grow mobile:gap-0 gap-2 overflow-y-auto'}>
            <div className={'min-w-[300px] w-[43%] h-[43%] mobile:w-full mobile:mb-8 flex justify-center items-center'}>
                <TagCloud/>
            </div>
            <MainTileContainer
                children={
                    arr.map((item, i)=>
                        <Tile key={i} />
                    )
                } />
            <MainTileContainer
                showMore={()=>undefined}
                children={
                    arr.map((item, i)=>
                        <Tile key={i} />
                    )
                } />
            <MainTileContainer
                showMore={()=>undefined}
                children={
                    arr.map((item, i)=>
                        <Tile key={i} />
                    )
                } />
        </div>
    )
}

export default Main;