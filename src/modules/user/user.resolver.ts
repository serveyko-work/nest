import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Root,
  Context,
} from '@nestjs/graphql';
import { User, UserDocument } from './user.schema';
import { UserService } from './user.service';
import { FindUserInput } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CookieOptions } from 'express';
import { Get, UseGuards } from '@nestjs/common';
import { RegistrationInput } from './Registration/RegistrationInput';
import { AuthGuard } from '../../common/guards/Auth.guard';
import { Role } from '../../common/enums/role.enum';
import { Roles } from '../../common/decorators/role.decorator';

const cookieOptions: CookieOptions = {
  domain: 'localhost',
  secure: false,
  sameSite: 'strict',
  httpOnly: true,
  path: '/',
};

@Resolver(() => User)
export class UserResolver {
  @ResolveField(() => String)
  name(@Root() { firstName, lastName }: User) {
    return `${firstName} ${lastName}`;
  }

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly userService: UserService,
  ) {}

  @Get(':id')
  @Query(() => User)
  async user(@Args('input') { id }: FindUserInput) {
    return this.userService.findById(id);
  }

  @Query(() => User)
  @UseGuards(new AuthGuard())
  @Roles(Role.ADMIN)
  async me(@Context('user') user: User) {
    return {
      login: 'login',
    };
  }

  @Mutation(() => User)
  async createUser(
    @Args('input')
    { login, password, firstName, email, lastName }: RegistrationInput,
    context: {
      req: Request & { user?: User };
      res: Response;
    },
  ) {
    console.log('context.req', context.req);
    console.log('user', email);
    return {
      login,
      password,
      firstName,
      email,
      lastName,
      _id: 'id',
    };
  }
}
