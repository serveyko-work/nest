import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Field, ID, InputType, ObjectType, Resolver } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.schema';

export type TokenDocument = Token & mongoose.Document;

@Schema()
@ObjectType({ description: 'The token model' })
@Entity()
@Resolver(() => Token)
export class Token extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  _id: string;

  @Field(() => User, {
    nullable: true,
    description: 'User id from user collection',
  })
  @Column('text', { unique: true })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  userId: string;

  @Field({
    description: 'Access token',
  })
  @Column('text')
  accessToken: string;

  @Field({
    description: 'Refresh token',
  })
  @Column('text')
  refreshToken: string;

  @Field({
    description: 'Access expires',
  })
  @Column('number')
  expiresInAccess: number;

  @Field({
    description: 'Refresh expires',
  })
  @Column('number')
  expiresInRefresh: number;

  @Field({
    description: 'Fingerprint',
  })
  @Column('text')
  fingerprint: string;

  @Field({
    nullable: true,
    description: 'Date',
    defaultValue: new Date(),
  })
  @Column()
  creationDate: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);

TokenSchema.index({ refreshToken: 1, accessToken: 1 });
