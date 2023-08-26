import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';


export type TaskDocuemt = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task extends Document {

  @Prop({ required: true })
  name: string;

}

export const TaskSchema = SchemaFactory.createForClass(Task);
