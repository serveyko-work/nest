import { Module } from '@nestjs/common';
import { DateScalar } from '../../common/scalars/date.scalar';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  providers: [RoleResolver, RoleService, DateScalar],
})
export class RoleModule {}
