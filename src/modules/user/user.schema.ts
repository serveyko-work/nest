import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Field, ID, InputType, ObjectType, Resolver } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type UserDocument = User & mongoose.Document;

@Schema()
@ObjectType({ description: 'The user model' })
@Entity()
@Resolver(() => User)
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  _id: string;

  @Field({
    description: 'Login',
  })
  @Column('text', { unique: true })
  @Prop({ required: true })
  login: string;

  @Field({
    nullable: true,
    description: 'First name',
  })
  @Column('text')
  @Prop({ required: false })
  firstName: string;

  @Field({
    nullable: true,
    description: 'Last name',
  })
  @Column('text')
  @Prop({ required: false })
  lastName: string;

  @Field({ description: 'Email' })
  @Column('text', { unique: true })
  @Prop({ required: true })
  email: string;

  @Field({
    nullable: true,
    description: 'Date',
    defaultValue: new Date(),
  })
  @Column()
  creationDate: Date;
}

@InputType()
export class FindUserInput {
  @Field(() => ID)
  id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1, login: 1 });
