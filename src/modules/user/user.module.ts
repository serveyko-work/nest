import { Module } from '@nestjs/common';
import { DateScalar } from '../../common/scalars/date.scalar';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { IsEmailUserAlreadyExistConstraint } from './Registration/IsEmailExist';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    UserResolver,
    UserService,
    DateScalar,
    IsEmailUserAlreadyExistConstraint,
  ],
})
export class UserModule {}
