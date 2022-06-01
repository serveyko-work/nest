import { Injectable } from '@nestjs/common';
import ModelUser from 'src/models/user';

@Injectable()
export class UserService {
  async findById(id: string) {
    return ModelUser.findById(id).lean();
  }
  async findByEmail(email: string) {
    const user = await ModelUser.findOne({ where: { email } }).lean();
    console.log(user);
    return user;
  }
}
