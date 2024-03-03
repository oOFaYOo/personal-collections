export interface ITagCloud {
    tags: {value:string, count:number}[];
    onClick: (tag: string, ev?: MouseEvent) => void;
    theme: 'dark' | 'light';
}