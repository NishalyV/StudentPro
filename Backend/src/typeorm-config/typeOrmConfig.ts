import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Task } from "src/task/task.entity";
import { User } from "src/auth/user.entity";


export const TypeOrmConfig:TypeOrmModuleOptions={

    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'password123',
    database:'task',
    entities:[Task,User],
    synchronize:true,
}