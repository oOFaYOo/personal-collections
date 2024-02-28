import {ReactNode} from "react";

export interface IMainTileContainer {
    children: any;
    showMore?: {side:'left'|'right', path:string};
    className?: string;
}