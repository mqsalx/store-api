import { Injectable } from "@nestjs/common"
import { UserEntity } from "./user.entity"

@Injectable()
export class UserRepository {
  private users: UserEntity[] = []

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

  async update(id: string, newData: Partial<UserEntity>) {
    const possibleUser = this.users.find((user) => user.id === id)
    if (!possibleUser) {
      throw new Error("User not found!")
    }
    Object.entries(newData).forEach(([key, value]) => {
      if (key === "id") {
        return
      }

      possibleUser[key] = value
    })
    return possibleUser
  }
}
