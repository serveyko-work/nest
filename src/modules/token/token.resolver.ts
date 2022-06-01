import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { Token, TokenDocument } from './token.schema';
import { TokenService } from './token.service';
import { FindTokenInput } from './FindToken/FindTokenInput';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/Auth.guard';
import { AddTokenInput } from './AddToken/AddTokenInput';

@Resolver(() => Token)
export class TokenResolver {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    private readonly tokenService: TokenService,
  ) {}

  @Query(() => Token)
  @UseGuards(new AuthGuard())
  async me(@Context('token') token: Token) {
    return {
      login: 'login',
    };
  }

  @Mutation(() => Token)
  async createToken(
    @Args('input') token: AddTokenInput,
    context: {
      req: Request & { token?: Token };
      res: Response;
    },
  ) {
    return {
      ...token,
      _id: 'id',
    };
  }
}
