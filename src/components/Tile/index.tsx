import React from "react";
import {ITile} from "./type";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

const Tile = ({text1, text2, text3}:ITile) => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    return (
        <div className={`${theme === 'dark' ? 'shadow-black/50 bg-neutral-800/20' : ''} border-[2px] border-transparent hover:border-pink-500
        w-full h-[16%] p-4 cursor-pointer rounded-md shadow-md flex flex-nowrap items-center justify-evenly`}>
            <p>
                Teaxtfhthj hjhjh
                {/*{text1}*/}
            </p>
            <p className={'mx-2'}>
                Teaxtfhtryhj hjh
                {/*{text2}*/}
            </p>
            <p>
                Teaxtfhj hjhjhjh
                {/*{text3}*/}
            </p>
        </div>
    )
}

export default Tile;