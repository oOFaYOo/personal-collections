export interface ITagCloud {
    tags: {value:string, count:number}[];
    onClick: (tag: string, e?: MouseEvent) => void;
}