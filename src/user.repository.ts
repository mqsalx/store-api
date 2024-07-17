export class UserRepository {

  private users = []

  save(user) {

    this.users.push(user)
    console.log(this.users)

  }
}
