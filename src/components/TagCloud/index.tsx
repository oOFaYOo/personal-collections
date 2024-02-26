import React from "react";
import {TagCloud, TagCloudOptions} from "@frank-mayer/react-tag-cloud";

const Comp = () => (
    <TagCloud
        options={(w: Window & typeof globalThis): TagCloudOptions => ({
            radius: Math.min(300, w.innerWidth, w.innerHeight) / 2,
            maxSpeed: "slow",
            itemClass: "hover:cursor-pointer text-black/80 hover:text-black"
        })}
        onClick={(tag: string, ev: MouseEvent) => alert(tag)}
        // onClickOptions={{ passive: true }}

    >
        {[
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
        ]}
    </TagCloud>
);

export default Comp;