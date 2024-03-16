import React from "react";
import {ColorOptions, TagCloud as Cloud} from 'react-tagcloud';
import {ITagCloud} from "./type";

const TagCloud = ({tags, onClick}: ITagCloud) => {

    const options: ColorOptions = {
        luminosity: "light",
        hue: 'blue',
    }

    return (
        <Cloud
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

export default React.memo(TagCloud);