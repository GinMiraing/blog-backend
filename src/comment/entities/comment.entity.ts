import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, collection: 'comments', timestamps: false })
export class Comment {
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

  @Prop({ default: 0 })
  reply: number;

  @Prop({ required: true })
  path: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);