import { Injectable } from "@nestjs/common"
import { UserEntity } from "./user.entity"

@Injectable()
export class UserRepository {
  private users: UserEntity[] = []

  private findUserID(id: string) {
    const possibleUser = this.users.find((user) => user.id === id)
    if (!possibleUser) {
      throw new Error("User not found!")
    }
    return possibleUser
  }

  async save(user: UserEntity) {
    this.users.push(user)
  }

  async list() {
    return this.users
  }

  async findUserEmail(email: string) {
    const possibleUser = this.users.find((user) => user.email === email)
    return possibleUser !== undefined
  }

  async update(id: string, newData: Partial<UserEntity>) {
    const user = this.findUserID(id)
    Object.entries(newData).forEach(([key, value]) => {
      if (key === "id") {
        return
      }

      user[key] = value
    })
    return user
  }

  async delete(id: string) {
    const user = this.findUserID(id)
    this.users = this.users.filter((user) => user.id !== id)
    return user
  }
}
