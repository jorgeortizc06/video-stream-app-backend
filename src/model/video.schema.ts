import { User } from './user.schema';
import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export type VideoDocument = Video & Document;
@Schema()
export class Video {
  @Prop()
  title: string;
  @Prop()
  video: string;
  @Prop()
  coverImage: string;
  @Prop({ default: Date.now() })
  uploadDate: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createBy: User;
}
