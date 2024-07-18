import { Body, Controller, Get, Post } from "@nestjs/common"
import { v4 as uuid } from "uuid"
import { CreateUserDTO } from "./dto/CreateUser.dto"
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
    return { id: userEntity.id, message: "User created successfully!" }
  }

  @Get()
  async list() {
    return this.userRepository.list()
  }
}
