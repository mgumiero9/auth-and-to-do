import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Item} from "./Item";

@Entity()
export class Group {

    @PrimaryGeneratedColumn({ name: 'group_id' })
    groupId: number;

    @Column({ name: 'item_id' })
    itemId: string;

    @Column()
    name: string;

    @ManyToOne(type => Item, item => item.groups)
    item: Item[];

}
