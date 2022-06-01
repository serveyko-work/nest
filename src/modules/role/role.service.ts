import { Injectable } from '@nestjs/common';
import ModelRole from 'src/models/role';

@Injectable()
export class RoleService {
  async findById(id: string) {
    return ModelRole.findById(id).lean();
  }

  async getAll() {
    const roles = await ModelRole.find({}).exec();
    return roles;
  }
}
