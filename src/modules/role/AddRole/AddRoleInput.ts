import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';
import { IsRoleExist } from './IsRoleExist';

@InputType()
export class AddRoleInput {
  @Field()
  @IsNotEmpty()
  @Length(1, 255)
  @IsRoleExist({ message: 'Role already in exist' })
  role: string;
}
