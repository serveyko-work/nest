import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class FindTokenInput {
  @Field(() => ID)
  id: string;
}
