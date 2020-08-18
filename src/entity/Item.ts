import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import {User} from "./User";
import {Group} from "./Group";

@Entity()
export class Item {

    @PrimaryGeneratedColumn({ name: 'item_id' })
    itemId: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column()
    name: string;

    @ManyToOne(type => User, user => user.items)
    user: User;

    @ManyToMany(type => Group, group => group.items, {
        cascade: true
    })
    @JoinTable()
    groups: Group[];

    // @OneToMany(type => Group, group => group.item)
    // groups: Group[];

}
