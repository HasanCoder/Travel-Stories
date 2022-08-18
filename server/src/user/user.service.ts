import { Injectable } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './repo/user.repository';

import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(private userRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    let user: User = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.NORMAL_ROLE;
    return this.userRepository.save(user);
  }

  createAdmin(createUserDto: CreateUserDto) {
    let user: User = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.ADMIN_ROLE;
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  findUserById(id: number) {
    // let newId: ObjectId = new ObjectId(id); //Is Line ne jeena haram kardiya hai. Saala ObjectId
    // console.log(newId);

    return this.userRepository.findOneOrFail({
      where: { id: id },
    });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
