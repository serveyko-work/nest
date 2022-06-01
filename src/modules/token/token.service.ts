import { Injectable } from '@nestjs/common';
import ModelToken from 'src/models/token';

@Injectable()
export class TokenService {
  async findById(id: string) {
    return ModelToken.findById(id).lean();
  }
}
