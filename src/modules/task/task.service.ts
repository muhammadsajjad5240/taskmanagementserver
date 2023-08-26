import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, PopulateOptions, QueryOptions } from 'mongoose';

import { pick } from '../../utils/pick';
import { TaskQueryOptions } from './query';
import { Task } from './task.schema';
import { pageLimit, sortBy, currentPage } from '../../utils/pagination';
import { TaskDto } from './task.dto';

import { createSlug } from '../../utils/slug';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
  ) {}

  async create(payload: TaskDto): Promise<Task> {
    try {
      const response = await this.taskModel.create(payload);
      return response;
    } catch (error) {
      throw new BadRequestException(error.message ?? 'Internal Server Error');
    }
  }

  async findAll(
    query?: TaskQueryOptions,
    populateFields?: PopulateOptions,
  ): Promise<Task[]> {
    let result = null;
    try {
      const filter = pick(query, [
        'name',
      ]);
      const options = pick(query, [
        'sortBy',
        'limit',
        'page',
        'populate',
        'count',
      ]);
      const sort = sortBy(options);

      const total = await this.taskModel.countDocuments({ ...filter });
      const limit = options.limit === 'all' ? total : pageLimit(options);
      const page = currentPage(options);
      const skip = (page - 1) * limit;
      const response = await this.taskModel
        .find({ ...filter })
        .populate(populateFields)
        .sort(sort)
        .skip(skip)
        .limit(limit);
      const totalPages = Math.ceil(total / limit);
      if (options?.count) {
        result = {
          totalResults: total,
        };
      } else {
        if (options.limit === 'all') {
          result = response;
        } else {
          result = {
            data: response,
            currentPage: page,
            limit,
            totalPages,
            totalResults: total,
          };
        }
      }
      return result;
    } catch (error) {
      throw new BadRequestException(error.message ?? 'Internal Server Error');
    }
  }

  async deleteMany(ids: string[]): Promise<any> {
    try {
      const response = await this.taskModel
        .deleteMany({_id: ids })
      return response;
    } catch (error) {
      throw new BadRequestException(error.message ?? 'Internal Server Error');
    }
  }
  async delete(id: string): Promise<any> {
    try {
      const response = await this.taskModel
        .findByIdAndDelete(id )
      return response;
    } catch (error) {
      throw new BadRequestException(error.message ?? 'Internal Server Error');
    }
  }
}
