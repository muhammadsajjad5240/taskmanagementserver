import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import mongoose, { Model, PopulateOptions, QueryOptions } from 'mongoose';

import { pick } from '../../utils/pick';

import { User, UserDocument } from './user.schema';
import { userQueryOptions } from './query';
import { CreateUserDto } from './user.dto';
import { pageLimit, sortBy, currentPage } from '../../utils/pagination';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async create(payload: CreateUserDto): Promise<User> {
    try {
      const response = await this.userModel.create(payload);
      return response;
    } catch (error) {
      throw new BadRequestException(error.message ?? 'Internal Server Error');
    }
  }


  async findAll(
    query?: userQueryOptions,
    populateFields?: PopulateOptions[],
  ): Promise<User[]> {
    let result = null;
    try {
      const filter = pick(query, [
        'email',
      ]);
      const options = pick(query, [
        'sortBy',
        'limit',
        'page',
        'populate',
        'count',
      ]);
      const sort = sortBy(options);

      const total = await this.userModel.countDocuments({ ...filter });
      const limit = options.limit === 'all' ? total : pageLimit(options);
      const page = currentPage(options);
      const skip = (page - 1) * limit;

      const data = await this.userModel.aggregate([
        {
          $match: { ...filter },
        },
        { $sort: sort },
        { $limit: limit },
        { $skip: skip },
      ]);

      const response = await this.userModel.populate(data, populateFields);

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

  async findOneByID(
    id: mongoose.Types.ObjectId,
    select?: string,
  ): Promise<User> {
    try {
      const response = await this.userModel.findById(id).select(select);
      return response;
    } catch (error) {
      throw new BadRequestException(error.message ?? 'Internal Server Error');
    }
  }


  async findOneByQuery(query: QueryOptions, select?: string): Promise<User> {
    try {
      const response = await this.userModel
        .findOne({ ...query })
        .select(select);
      return response;
    } catch (error) {
      throw new BadRequestException(error.message ?? 'Internal Server Error');
    }
  }


}
