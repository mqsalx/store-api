import { Body, Controller, Get, Post } from "@nestjs/common"
import { UserRepository } from "./user.repository"

@Controller("/users")
export class UserController {

  constructor(
    private userRepository: UserRepository
  ) {}

  @Post()
  async create(@Body() data) {
    this.userRepository.save(data)
    return data
  }

  @Get()
  async list() {
    return this.userRepository.list()
  }
}
