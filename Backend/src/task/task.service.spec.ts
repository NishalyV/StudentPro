import {Test} from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { getTaskFilterDTO } from './DTO/getTaskFilter-dto';
import { TaskStatus } from './task.status.enum';


const mockTaskrepository = () =>({
    getAllTasks:jest.fn(),
});

const muser = {username:'Test user'};

describe('Test service',()=>{
   let taskService: TaskService;
   let taskRepository: TaskRepository;
   
   beforeEach(async()=>{
       const module= await Test.createTestingModule({
           providers:[TaskService,
            {provide: TaskRepository,useFactory:mockTaskrepository}]
       }).compile();

       taskService= module.get<TaskService>(TaskService);
       taskRepository=module.get<TaskRepository>(TaskRepository);
   })

   describe('get Tasks',()=>{
       it('get all Tasks from repository',async()=>{
           expect(taskRepository.getAllTasks).not.toHaveBeenCalled();
           const filter:getTaskFilterDTO={status:TaskStatus.INPROGRESS,search:'some value'};

        // await taskRepository.getAllTasks(filter,muser);
        expect(taskRepository.getAllTasks).toHaveBeenCalled();
       })
       
   })
})