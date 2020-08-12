import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Item} from "./Item";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(type => Item, item => item.user)
    items: Item[]

}
