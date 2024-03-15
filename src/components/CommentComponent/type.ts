export interface ICommentComponent {
    text: string;
    avatarImage: string;
    onDelete?: () => void;
    id:string;
}