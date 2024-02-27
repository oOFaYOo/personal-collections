export interface ITagCloud {
    tags: string[];
    onClick: (tag: string, ev: MouseEvent) => void;
}