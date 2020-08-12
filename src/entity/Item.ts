import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from "typeorm";

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    item_id: number;

    @Column()
    user_id: string;

    @Column()
    name: string;

}
