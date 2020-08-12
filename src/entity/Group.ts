import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Item} from "./Item";

@Entity()
export class Group {

    @PrimaryGeneratedColumn()
    group_id: number;

    @Column()
    item_id: string;

    @Column()
    name: string;

    @ManyToOne(type => Item, item => item.groups)
    item: Item

}
