import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './DTO/createTask-DTO';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-decorator';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private taskservice: TaskService) { }

  @Get()
  getAllTasks(@GetUser() user: User): Promise<Task[]> {
    return this.taskservice.getAllTasks(user);
  }
  @Get('/:id')
  getTaskbyId(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
    return this.taskservice.getTaskbyId(id, user);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreateTaskDTO, @GetUser() user: User
  ): Promise<Task> {
    // console.log(createTaskDTO);
    // console.log('fhvbi',user);
    return this.taskservice.createTask(createTaskDTO, user);
  }

  @Patch('/:id')
  updateStatusTask(@Param('id', ParseIntPipe) id: number, @Body() EditTaskDTO: CreateTaskDTO, @GetUser() user: User): Promise<Task> {
    return this.taskservice.updateStatusTask(id, EditTaskDTO, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    return this.taskservice.deleteTask(id, user);
  }
}
