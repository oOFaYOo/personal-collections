import React from "react";
import {ITile} from "./type";

const Tile = ({text1, text2, text3}:ITile) => {
    return (
        <div className={'w-full h-[16%] p-4 cursor-pointer rounded-md shadow-md flex flex-nowrap items-center justify-evenly'}>
            <p>
                Teaxtfhthj hjhjhjh kjhkrycn
                {/*{text1}*/}
            </p>
            <p className={'mx-2'}>
                Teaxtfhtryhj hjhjhjh kjhkcn
                {/*{text2}*/}
            </p>
            <p>
                Teaxtfhj hjhjhjh kjhkhtrycn
                {/*{text3}*/}
            </p>
        </div>
    )
}

export default Tile;