import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, QueryOptions } from 'mongoose';

import { Token } from './token.schema';
import { TokenDto } from './token.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name)
    private tokenModel: Model<Token>,
  ) {}

  async create(payload: TokenDto): Promise<Token> {
    try {
      const response = await this.tokenModel.create(payload);
      return response;
    } catch (error) {
      throw new BadRequestException(error.message ?? 'Internal Server Error');
    }
  }

  async findOneByQuery(query: QueryOptions): Promise<Token | null> {
    try {
      const response = await this.tokenModel.findOne({ ...query });
      return response;
    } catch (error) {
      throw new BadRequestException(error.message ?? 'Internal Server Error');
    }
  }

  async findOneAndDelete(query: QueryOptions): Promise<Token> {
    try {
      const response = await this.tokenModel.findOneAndDelete({
        ...query,
      });
      return response;
    } catch (error) {
      throw new BadRequestException(error.message ?? 'Internal Server Error');
    }
  }

  async findOneByID(
    id: mongoose.Types.ObjectId,
    select?: string,
  ): Promise<Token> {
    try {
      const response = await this.tokenModel.findById(id).select(select);
      return response;
    } catch (error) {
      throw new BadRequestException(error.message ?? 'Internal Server Error');
    }
  }

  async findOneAndUpdate(query: QueryOptions, payload: any): Promise<Token> {
    try {
      const token = await this.findOneByQuery({ ...query });
      Object.assign(token, payload);
      await token.save();
      return token;
    } catch (error) {
      throw new BadRequestException(error.message ?? 'Internal Server Error');
    }
  }
}
