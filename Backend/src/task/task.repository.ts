import { Repository, EntityRepository, QueryBuilder } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDTO } from "./DTO/createTask-DTO";
import { User } from "src/auth/user.entity";

@EntityRepository(Task)

export class TaskRepository extends Repository<Task>{

    async getAllTasks(user:User):Promise<Task[]>{
        const query= this.createQueryBuilder('Task');
        query.where('Task.userId = :userId',{ userId:user.id });
        const tasks=await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDTO,user:User): Promise<Task> {
        const { studentName,studentSubject, studentMark } = createTaskDto;
        const task = new Task();
        task.studentName = studentName;
        task.studentMark = studentMark;
        task.studentSubject= studentSubject;
        task.user=user;
        await task.save();
        delete task.user;
        return task;
    }

}