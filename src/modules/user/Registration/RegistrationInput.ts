import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { IsEmailUserAlreadyExist } from './IsEmailExist';

@InputType()
export class RegistrationInput {
  @Field()
  @IsNotEmpty()
  @Length(1, 255)
  login: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 255)
  @IsEmailUserAlreadyExist({
    message: 'Пользователь с таким email уже существует',
  })
  email: string;

  @Field()
  @IsNotEmpty()
  @Length(1, 255)
  firstName: string;

  @Field()
  @IsNotEmpty()
  @Length(1, 255)
  lastName: string;
}
