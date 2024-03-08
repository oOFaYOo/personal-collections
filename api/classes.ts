import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {AdditionalColumnType} from "../src/components/Table/type";
import {ThemeType} from "../src/api_client/type";

@Entity("Users")
export class User{
    @PrimaryGeneratedColumn()
    id!: string;
    @Column()
    eMail!: string;
    @Column()
    password!: string;
    @Column()
    picture!: string;
    @Column()
    name!: string;
    @Column()
    description!: string;
    @Column()
    blocked!: boolean;
    @Column()
    isAdmin!: boolean;
    @Column()
    amountCollections!: number;
    @Column()
    amountItems!: number;
}

@Entity("Collections")
export class Collection{
    @PrimaryGeneratedColumn()
    id!: string;
    @Column()
    author!: { name: string, id: string };
    @Column()
    picture!: string;
    @Column()
    name!: string;
    @Column()
    theme!: ThemeType;
    @Column()
    description!: string;
    @Column()
    text1!: { id: 'text1', label: string, type: AdditionalColumnType };
    @Column()
    text2!: { id: 'text2', label: string, type: AdditionalColumnType };
    @Column()
    text3!: { id: 'text3', label: string, type: AdditionalColumnType };
    @Column()
    paragraph1!: { id: 'paragraph1', label: string, type: AdditionalColumnType };
    @Column()
    paragraph2!: { id: 'paragraph2', label: string, type: AdditionalColumnType };
    @Column()
    paragraph3!: { id: 'paragraph3', label: string, type: AdditionalColumnType };
    @Column()
    number1!: { id: 'number1', label: string, type: AdditionalColumnType };
    @Column()
    number2!: { id: 'number2', label: string, type: AdditionalColumnType };
    @Column()
    number3!: { id: 'number3', label: string, type: AdditionalColumnType };
    @Column()
    date1!: { id: 'date1', label: string, type: AdditionalColumnType };
    @Column()
    date2!: { id: 'date2', label: string, type: AdditionalColumnType };
    @Column()
    date3!: { id: 'date3', label: string, type: AdditionalColumnType };
    @Column()
    checkbox1!: { id: 'checkbox1', label: string, type: AdditionalColumnType };
    @Column()
    checkbox2!: { id: 'checkbox2', label: string, type: AdditionalColumnType };
    @Column()
    checkbox3!: { id: 'checkbox3', label: string, type: AdditionalColumnType };
}

@Entity("Items")
export class Item{
    @PrimaryGeneratedColumn()
    id!: string;
    @Column()
    author!: { name: string, id: string };
    @Column()
    collection!: string; //id
    @Column()
    theme!: ThemeType;
    @Column()
    picture!: string;
    @Column()
    name!: string;
    @Column()
    tags!: string;
    @Column()
    text1!: string | null;
    @Column()
    text2!: string | null;
    @Column()
    text3!: string | null;
    @Column()
    paragraph1!: string | null;
    @Column()
    paragraph2!: string | null;
    @Column()
    paragraph3!: string | null;
    @Column()
    number1!: number | null;
    @Column()
    number2!: number | null;
    @Column()
    number3!: number | null;
    @Column()
    date1!: string | null;
    @Column()
    date2!: string | null;
    @Column()
    date3!: string | null;
    @Column()
    checkbox1!: boolean | null;
    @Column()
    checkbox2!: boolean | null;
    @Column()
    checkbox3!: boolean | null;
}

@Entity("Comments")
export class Comment{
    @PrimaryGeneratedColumn()
    id!: string;
    @Column()
    userId!: string;
    @Column()
    itemId!: string;
    @Column()
    text!: string;
    @Column()
    timestamp!: string;
}

@Entity("Likes")
export class Like {
    @PrimaryGeneratedColumn()
    id!: string;
    @Column()
    userId!: string;
    @Column()
    itemId!: string;
}