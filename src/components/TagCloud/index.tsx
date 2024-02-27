import React from "react";
import {TagCloud, TagCloudOptions} from "@frank-mayer/react-tag-cloud";
import {ITagCloud} from "./type";

const Comp = ({tags, onClick} : ITagCloud) => (
    <TagCloud
        options={(w: Window & typeof globalThis): TagCloudOptions => ({
            radius: Math.min(300, w.innerWidth, w.innerHeight) / 2,
            maxSpeed: "slow",
            itemClass: "hover:cursor-pointer text-black/80 hover:text-black"
        })}
        onClick={onClick}
    >
        {tags}
    </TagCloud>

);

export default Comp;