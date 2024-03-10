import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {AdditionalColumnType} from "../src/components/Table/type";
import {ThemeType} from "../src/api_client/type";

@Entity("personal-collections-users")
export class User{
    @PrimaryGeneratedColumn()
    id!: string;
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

    amountCollections!: number;
    amountItems!: number;
}

@Entity("personal-collections-collections")
export class Collection{
    @PrimaryGeneratedColumn()
    id!: string;
    @OneToOne(() => User)
    @JoinColumn()
    author!: User;
    @Column()
    picture!: string;
    @Column()
    name!: string;
    @Column()
    theme!: ThemeType;
    @Column()
    description!: string;
    @Column('json')
    text1!: { id: 'text1', label: string, type: AdditionalColumnType };
    @Column('json')
    text2!: { id: 'text2', label: string, type: AdditionalColumnType };
    @Column('json')
    text3!: { id: 'text3', label: string, type: AdditionalColumnType };
    @Column('json')
    paragraph1!: { id: 'paragraph1', label: string, type: AdditionalColumnType };
    @Column('json')
    paragraph2!: { id: 'paragraph2', label: string, type: AdditionalColumnType };
    @Column('json')
    paragraph3!: { id: 'paragraph3', label: string, type: AdditionalColumnType };
    @Column('json')
    number1!: { id: 'number1', label: string, type: AdditionalColumnType };
    @Column('json')
    number2!: { id: 'number2', label: string, type: AdditionalColumnType };
    @Column('json')
    number3!: { id: 'number3', label: string, type: AdditionalColumnType };
    @Column('json')
    date1!: { id: 'date1', label: string, type: AdditionalColumnType };
    @Column('json')
    date2!: { id: 'date2', label: string, type: AdditionalColumnType };
    @Column('json')
    date3!: { id: 'date3', label: string, type: AdditionalColumnType };
    @Column('json')
    checkbox1!: { id: 'checkbox1', label: string, type: AdditionalColumnType };
    @Column('json')
    checkbox2!: { id: 'checkbox2', label: string, type: AdditionalColumnType };
    @Column('json')
    checkbox3!: { id: 'checkbox3', label: string, type: AdditionalColumnType };
}

@Entity("personal-collections-items")
export class Item{
    @PrimaryGeneratedColumn()
    id!: string;
    @OneToOne(() => Collection)
    @JoinColumn()
    collection!: Collection;
    @Column()
    theme!: ThemeType;
    @Column()
    picture!: string;
    @Column()
    name!: string;
    @Column()
    tags!: string;
    @Column({nullable: true})
    text1!: string;
    @Column({nullable: true})
    text2!: string;
    @Column({nullable: true})
    text3!: string;
    @Column({nullable: true})
    paragraph1!: string;
    @Column({nullable: true})
    paragraph2!: string;
    @Column({nullable: true})
    paragraph3!: string;
    @Column({nullable: true})
    number1!: number;
    @Column({nullable: true})
    number2!: number;
    @Column({nullable: true})
    number3!: number;
    @Column({nullable: true})
    date1!: string;
    @Column({nullable: true})
    date2!: string;
    @Column({nullable: true})
    date3!: string;
    @Column({nullable: true})
    checkbox1!: boolean;
    @Column({nullable: true})
    checkbox2!: boolean;
    @Column({nullable: true})
    checkbox3!: boolean;
}

@Entity("personal-collections-comments")
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

@Entity("personal-collections-likes")
export class Like {
    @PrimaryGeneratedColumn()
    id!: string;
    @Column()
    userId!: string;
    @Column()
    itemId!: string;
}

@Entity("personal-collections-sessions")
export class Session {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    @Column()
    userId!: string;
}

@Entity("personal-collections-credentials")
export class UserCredentials {
    @PrimaryGeneratedColumn()
    id!: string;
    @OneToOne(() => User)
    @JoinColumn()
    user!: User;
    @Column()
    email!: string;
    @Column()
    password!: string;
}
