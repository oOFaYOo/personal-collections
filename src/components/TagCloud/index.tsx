// import React from "react";
// import {TagCloud, TagCloudOptions} from "@frank-mayer/react-tag-cloud";
// import {ITagCloud} from "./type";
//
// const Comp = ({tags, onClick}: ITagCloud) => {
//
//     return (
//         <TagCloud
//             options={(w: Window & typeof globalThis): TagCloudOptions => ({
//                 radius: Math.min(300, w.innerWidth, w.innerHeight) / 2,
//                 maxSpeed: "slow",
//                 itemClass: `hover:cursor-pointer`
//             })}
//             onClick={onClick}
//         >
//             {tags}
//         </TagCloud>
//     )
// };
//
// export default Comp;

import {ColorOptions, TagCloud} from 'react-tagcloud';
import {ITagCloud} from "./type";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

const SimpleCloud = ({tags, onClick}: ITagCloud) => {
    const {theme} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const options : ColorOptions = {
        luminosity: theme === 'dark' ? 'light' : 'dark',
        hue: 'blue',
    }

    return (
        <TagCloud
            minSize={12}
            maxSize={35}
            tags={tags}
            onClick={tag => {
                onClick(tag.value)
            }}
            colorOptions={options}
        />
    )
}

export default SimpleCloud;