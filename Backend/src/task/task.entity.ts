import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../auth/user.entity";

@Entity()

export class Task extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    studentName:string;

    @Column()
    studentSubject:string;
    
    @Column()
    studentMark:number;

    @ManyToOne(type=>User,user=>user.tasks,{eager:false})
    user:User;

    @Column()
    userId:number;
}