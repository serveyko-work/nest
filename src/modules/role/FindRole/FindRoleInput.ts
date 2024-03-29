import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class FindRoleInput {
  @Field(() => ID)
  id: string;
}
