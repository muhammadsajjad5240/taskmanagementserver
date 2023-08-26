import { IsString } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Document } from 'mongoose';

import { TOKEN_TYPES } from '../../constants/constants';

export type TokenDocuemt = HydratedDocument<Token>;

@Schema({ timestamps: true })
export class Token extends Document {
  @Prop({ required: true })
  @IsString()
  token: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  @IsString()
  user: string;

  @Prop({ required: true, enum: TOKEN_TYPES })
  @IsString()
  type: string;

  @Prop({ required: true, default: Date.now() })
  expires: Date;

  @Prop({ default: false })
  blacklisted: boolean;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
