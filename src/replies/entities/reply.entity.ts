import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReplyDocument = HydratedDocument<Reply>;

@Schema({ versionKey: false, collection: 'replies', timestamps: false })
export class Reply {
  @Prop({ default: Date.now() })
  _id: number;

  @Prop({ required: true })
  nick: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  email_md5: string;

  @Prop({ default: '' })
  link: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  is_admin: boolean;

  @Prop({ default: false })
  is_hidden: boolean;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  parent_id: number;

  @Prop({ required: true })
  reply_id: number;

  @Prop({ required: true })
  reply_nick: string;
}

export const ReplySchema = SchemaFactory.createForClass(Reply);
