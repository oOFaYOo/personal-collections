import {ColorOptions, TagCloud} from 'react-tagcloud';
import {ITagCloud} from "./type";

const SimpleCloud = ({tags, onClick, theme}: ITagCloud) => {

    const options : ColorOptions = {
        luminosity: "light",
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