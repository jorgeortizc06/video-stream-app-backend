import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ require: true })
  fullname: string;
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;
  @Prop({ required: true, unique: true, lowercase: true })
  password: string;
  @Prop({ default: Date.now() })
  createdData: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
