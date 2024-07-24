import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { ListUserDTO } from "./dto/ListUser.dto"
import { UpdateUserDTO } from "./dto/UpdateUser.dto"
import { UserEntity } from "./user.entity"

Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(userEntity: UserEntity) {
    await this.userRepository.save(userEntity)
    return {
      user: new ListUserDTO(userEntity.id, userEntity.name),
      message: "User created successfully!"
    }
  }

  async list() {
    const savedUsers = await this.userRepository.find()
    const listUsers = savedUsers.map(
      (user) => new ListUserDTO(user.id, user.name)
    )
    return listUsers
  }

  async update(id: string, userEntity: UpdateUserDTO) {
    await this.userRepository.update(id, userEntity)
  }

  async delete(id: string) {
    await this.userRepository.delete(id)
  }
}
