import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import {User} from "./User";
import {Group} from "./Group";

@Entity()
export class Item {

    @PrimaryGeneratedColumn({ name: 'item_id' })
    itemId: number;

    @Column({ name: 'user_id' })
    userId: string;

    @Column()
    name: string;

    @ManyToOne(type => User, user => user.items)
    user: User;

    @OneToMany(type => Group, group => group.item)
    groups: Group[];

}
