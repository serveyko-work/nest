import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { Role, RoleDocument } from './role.schema';
import { RoleService } from './role.service';
import { FindRoleInput } from './FindRole/FindRoleInput';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/Auth.guard';
import { AddRoleInput } from './AddRole/AddRoleInput';

@Resolver(() => Role)
export class RoleResolver {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    private readonly roleService: RoleService,
  ) {}

  @Get(':id')
  @Query(() => Role)
  async role(@Args('input') { id }: FindRoleInput) {
    return this.roleService.findById(id);
  }

  @Query(() => Role)
  @UseGuards(new AuthGuard())
  async me(@Context('role') role: Role) {
    return {
      login: 'login',
    };
  }

  @Mutation(() => Role)
  async createRole(
    @Args('input') role: AddRoleInput,
    context: {
      req: Request & { role?: Role };
      res: Response;
    },
  ) {
    return {
      ...role,
      _id: 'id',
    };
  }
}
