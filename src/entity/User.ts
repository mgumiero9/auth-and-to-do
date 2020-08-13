import {Entity, Unique, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Item} from "./Item";

@Entity()
@Unique(["email"])
export class User {

    @PrimaryGeneratedColumn({ name: 'user_id' })
    userId: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(type => Item, item => item.user)
    items: Item[];

}
