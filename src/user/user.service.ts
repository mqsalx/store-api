import { Injectable, NotFoundException } from "@nestjs/common"
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

  async create(userData: UserEntity) {
    const userEntity = new UserEntity()
    Object.assign(userEntity, userData as UserEntity)
    return this.userRepository.save(userEntity)
  }

  async list() {
    const savedUsers = await this.userRepository.find()
    const listUsers = savedUsers.map(
      (user) => new ListUserDTO(user.id, user.name)
    )
    return listUsers
  }

  async update(id: string, userData: UpdateUserDTO) {
    const user = await this.userRepository.findOneBy({ id })

    if (user === null)
      throw new NotFoundException("User not found!")

    Object.assign(user, userData as UserEntity)

    return this.userRepository.save(user)
  }

  async delete(id: string) {
    await this.userRepository.delete(id)
  }
}
