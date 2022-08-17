import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CustomRepository } from '../../database/typeorm-ex.decorator';

@CustomRepository(User)
@Injectable()
export class UsersRepository extends Repository<User> {}
