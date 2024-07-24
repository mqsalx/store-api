import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"
import { v4 as uuid } from "uuid"
import { CreateUserDTO } from "./dto/CreateUser.dto"
import { ListUserDTO } from "./dto/ListUser.dto"
import { UpdateUserDTO } from "./dto/UpdateUser.dto"
import { UserEntity } from "./user.entity"
import { UserRepository } from "./user.repository"
import { UserService } from "./user.service"

@Controller("/users")
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService
  ) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    const userEntity = new UserEntity()
    userEntity.id = uuid()
    userEntity.name = data.name
    userEntity.email = data.email
    userEntity.password = data.password
    this.userService.create(userEntity)
    return {
      user: new ListUserDTO(userEntity.id, userEntity.name),
      message: "User created successfully!"
    }
  }

  @Get()
  async list() {
    const userData = await this.userService.list()
    return userData
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() userEntity: UpdateUserDTO) {
    const userUpdated = await this.userService.update(id, userEntity)
    return {
      user: userUpdated,
      message: "User updated successfully!"
    }
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const userDeleted = await this.userService.delete(id)
    return {
      user: userDeleted,
      message: "User deleted!"
    }
  }
}
