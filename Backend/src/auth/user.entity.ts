import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, Timestamp } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Task } from "../task/task.entity";

@Entity()
@Unique(['Email'])
export class User extends BaseEntity{

 @PrimaryGeneratedColumn()
   id: number

 @Column()
 Email:string;

 @Column()
 Username:string;

 @Column()
 Password:string;

@OneToMany(type=>Task,task=>task.user,{eager:true})
 tasks:Task[];

 async  validationpassword(password:string):Promise<boolean>{
    return password === this.Password;
}

}
