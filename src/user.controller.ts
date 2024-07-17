import { Body, Controller, Post } from "@nestjs/common"
import { UserRepository } from "./user.repository"


@Controller("/users")
export class UserController {

  private userRepository = new UserRepository()

  @Post()
  async create(@Body() data) {

    this.userRepository.save(data)
    return data

  }
}
