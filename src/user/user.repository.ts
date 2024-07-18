import { Injectable } from "@nestjs/common"
import { UserEntity } from "./user.entity"

@Injectable()
export class UserRepository {
  private users:UserEntity[] = []

  async save(user: UserEntity) {
    this.users.push(user)
  }

  async list() {
    return this.users
  }

  async findByEmail(email: string) {
    const possibleUser = this.users.find((user) => user.email === email)
    return possibleUser !== undefined
  }
}
