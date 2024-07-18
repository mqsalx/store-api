import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"
import { v4 as uuid } from "uuid"
import { CreateUserDTO } from "./dto/CreateUser.dto"
import { ListUserDTO } from "./dto/ListUser.dto"
import { UserEntity } from "./user.entity"
import { UserRepository } from "./user.repository"
import { UpdateUserDTO } from "./dto/UpdateUser.dto"

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

  @Put("/:id")
  async update(@Param("id") id: string, @Body() newData: UpdateUserDTO) {
    const userUpdated = await this.userRepository.update(id, newData)
    return {
      user: userUpdated,
      message: "User updated successfully!"
    }
  }

  @Delete("/:id")
  async delete(@Param("id") id: string){
    const userDeleted = await this.userRepository.delete(id)
    return {
      user: userDeleted,
      message: "User deleted!"
    }
  }
}