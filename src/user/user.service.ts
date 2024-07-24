import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { ListUserDTO } from "./dto/ListUser.dto"
import { UserEntity } from "./user.entity"

Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async listUsers() {
    const savedUsers = await this.userRepository.find()
    const listUsers = savedUsers.map(
      (user) => new ListUserDTO(user.id, user.name)
    )
    return listUsers
  }
}
