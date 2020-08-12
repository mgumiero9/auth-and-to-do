import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Group {

    @PrimaryGeneratedColumn()
    group_id: number;

    @Column()
    item_id: string;

    @Column()
    name: string;

}
