import { Body, Controller, Get, Post } from "@nestjs/common"
import { v4 as uuid } from "uuid"
import { CreateUserDTO } from "./dto/CreateUser.dto"
import { ListUserDTO } from "./dto/ListUser.dto"
import { UserEntity } from "./user.entity"
import { UserRepository } from "./user.repository"

@Controller("/users")
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    const userEntity = new UserEntity()
    userEntity.id = uuid()
    userEntity.name = data.name
    userEntity.email = data.email
    userEntity.password = data.password
    this.userRepository.save(userEntity)
    return {
      user: new ListUserDTO(userEntity.id, userEntity.name),
      message: "User created successfully!"
    }
  }

  @Get()
  async list() {
    const userData = await this.userRepository.list()
    const userList = userData.map((user) => new ListUserDTO(user.id, user.name))

    return userList
  }
}
