import { Injectable, ParseUUIDPipe, NotFoundException } from "@nestjs/common";
import { CreateTaskDTO } from "./DTO/createTask-DTO";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskRepository } from "./task.repository";
import { Task } from "./task.entity";
import { User } from "src/auth/user.entity";

@Injectable()

export class TaskService{
    constructor(
@InjectRepository(TaskRepository)
private taskRepository:TaskRepository
    ){}
    async getAllTasks(user:User):Promise<Task[]>{
        return this.taskRepository.getAllTasks(user);
    }

    async getTaskbyId(id:number,user:User):Promise<Task>{
        const found =await this.taskRepository.findOne({where:{id, userId: user.id}});
        if(!found){
                    throw new NotFoundException(`Task with id "${id}"not found`);
                }
                return found;
    }

    async getTaskbyName(studentName:string,studentSubject:string,user:User):Promise<Task>{
        const found =await this.taskRepository.findOne({where:{studentName,studentSubject, userId: user.id}});
    //    console.log(found);
        // if(!found){
        //             throw new NotFoundException(`Task with id "${studentName}"not found`);
        //         }
                return found;
    }

     async createTask(createTaskDTO:CreateTaskDTO,user:User):Promise<Task>{
         
        const { studentName,studentSubject, studentMark } = createTaskDTO;
        const task= await this.getTaskbyName(studentName,studentSubject,user);
        if(task){
        task.studentMark = task.studentMark + studentMark;
        await task.save();
        return task;
        }
        else{
            console.log('Hi');
            return this.taskRepository.createTask(createTaskDTO,user);
        }
    }
   
    async updateStatusTask(id:number,EditTaskDTO:CreateTaskDTO,user:User):Promise<Task>{ 
        const { studentName,studentSubject, studentMark } = EditTaskDTO;
        const task= await this.getTaskbyId(id,user);
        task.studentName = studentName;
        task.studentMark = task.studentMark + studentMark;
        task.studentSubject= studentSubject;
        await task.save();
        return task;
    }
   
    async deleteTask(id:number,user:User):Promise<void>{
        const found=await this.taskRepository.delete({id,userId:user.id});
        if(found.affected ==0  ){
            throw new NotFoundException(`Task with id "${id}"not found`);
        }
    }

}