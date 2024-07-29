/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"
import { PasswordHashPipe } from "../../resources/pipes/password-hash.pipe"
import { CreateUserDTO } from "./dto/CreateUser.dto"
import { ListUserDTO } from "./dto/ListUser.dto"
import { UpdateUserDTO } from "./dto/UpdateUser.dto"
import { UserService } from "./user.service"

@Controller("/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(
    @Body() { password, ...data }: CreateUserDTO,
    @Body("password", PasswordHashPipe) hashedPassword: string
  ) {
    const createdUser = await this.userService.create({
      ...data,
      password: hashedPassword
    })

    return {
      user: new ListUserDTO(createdUser.id, createdUser.name),
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
