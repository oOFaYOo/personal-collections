export interface ICheckbox {
    checked: boolean;
    onChange?: (value:boolean) => void;
    disabled?: boolean;
    defaultChecked?:boolean;
    className?:string;
}