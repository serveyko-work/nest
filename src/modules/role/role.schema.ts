import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Field, ID, InputType, ObjectType, Resolver } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type RoleDocument = Role & mongoose.Document;

@Schema()
@ObjectType({ description: 'The role model' })
@Entity()
@Resolver(() => Role)
export class Role extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  _id: string;

  @Field({
    description: 'Role',
  })
  @Column('text', { unique: true })
  @Prop({ required: true })
  role: string;

  @Field({
    nullable: true,
    description: 'Date',
    defaultValue: new Date(),
  })
  @Column()
  creationDate: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.index({ role: 1 });
