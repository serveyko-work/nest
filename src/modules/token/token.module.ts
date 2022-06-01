import { Module } from '@nestjs/common';
import { DateScalar } from '../../common/scalars/date.scalar';
import { TokenResolver } from './token.resolver';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  providers: [TokenResolver, TokenService, DateScalar],
})
export class TokenModule {}
