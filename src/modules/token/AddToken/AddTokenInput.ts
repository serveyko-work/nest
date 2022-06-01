import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@InputType()
export class AddTokenInput {
  @Field()
  @IsNotEmpty()
  @Length(1, 255)
  token: string;
}
