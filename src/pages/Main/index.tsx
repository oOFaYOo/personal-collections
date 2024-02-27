import React from "react";
import TagCloud from "../../components/TagCloud";
import Tile from "../../components/Tile";
import MainTileContainer from "../../components/Main-TileContainer";

const arr = [1,1,1,1,1];

const Main = () => {
    return (
        <div
            className={'relative w-full flex py-4 flex-wrap justify-evenly items-center grow mobile:gap-0 gap-2'}>
            <div className={'min-w-[300px] w-[43%] h-[43%] mobile:w-full mobile:mb-8 flex justify-center items-center'}>
                <TagCloud tags={[
                    "VSCode",
                    "TypeScript",
                    "React",
                    "Preact",
                    "Parcel",
                    "Jest",
                    "Next",
                    "ESLint",
                    "Framer Motion",
                    "Three.js",
                ]} onClick={(tag: string, ev: MouseEvent) => alert(tag)}/>
            </div>
            <MainTileContainer
                children={
                    arr.map((item, i)=>
                        <Tile key={i} />
                    )
                } />
            <MainTileContainer
                showMore={'/collections'}
                children={
                    arr.map((item, i)=>
                        <Tile key={i} />
                    )
                } />
            <MainTileContainer
                showMore={'/users'}
                children={
                    arr.map((item, i)=>
                        <Tile key={i} />
                    )
                } />
        </div>
    )
}

export default Main;