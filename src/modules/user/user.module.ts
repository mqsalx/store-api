import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserController } from "./user.controller"
import { UserEntity } from "./user.entity"
import { UserRepository } from "./user.repository"
import { UserService } from "./user.service"
import { UniqueEmailValidator } from "./validation/uniqueEmail.Validator"
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserRepository, UniqueEmailValidator, UserService],
  exports: [UserService]
})
export class UserModule {}
