import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { TaskDto } from './task.dto';
import { Task } from './task.schema';
import { TaskService } from './task.service';
import { TaskQueryOptions } from './query';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // @UseGuards(AuthGuard)
  @Post('/create-task')
  async create(
    @Body()
    payload: TaskDto,
  ): Promise<Task> {
    const response = await this.taskService.create(payload);
    return response;
  }

  // @UseGuards(AuthGuard)
  @Get('/list-tasks')
  async findAll(@Query() query: TaskQueryOptions): Promise<Task[]> {
    const response = await this.taskService.findAll(query);
    return response;
  }

   // @UseGuards(AuthGuard)
   @Delete('/tasks/bulk')
   async deleteMany(@Query() query: TaskQueryOptions,
   @Body()
    payload: string[],
   ): Promise<Task[]> {
     const response = await this.taskService.deleteMany(payload);
     return response;
   }

   // @UseGuards(AuthGuard)
   @Delete('/tasks/:id')
   async delete(@Param() params: any,
   ): Promise<Task[]> {
     const response = await this.taskService.delete(params.id);
     return response;
   }

}
