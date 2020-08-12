import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    // @OneToMany()
    // items:

}
