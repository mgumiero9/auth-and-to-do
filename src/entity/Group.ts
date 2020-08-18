import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import {Item} from "./Item";

@Entity()
export class Group {

    @PrimaryGeneratedColumn({ name: 'group_id' })
    groupId: number;

    @Column({ name: 'item_id' })
    itemId: number;

    @Column()
    name: string;

    @ManyToMany(type => Item, item => item.groups)
    items: Item[];

    // @ManyToOne(type => Item, item => item.groups)
    // item: Item[];

}
