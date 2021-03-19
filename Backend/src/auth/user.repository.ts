import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { AuthSignInDto } from "./auth-signin.dto";
import { Modeluser } from "./model";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signIn(authsignindto: AuthSignInDto): Promise<User> {
        const { Email, Password } = authsignindto;
        const user = await this.findOne({ Email });
        console.log(user);
        if (user && await user.validationpassword(Password)) {
            return user
        }
        else {
            return null;
        }

    }

    async getAll(): Promise<User[]> {

        const query = this.createQueryBuilder('User');

        query.orderBy('User.username', 'DESC');
        const user = await query.getMany();
     
        return user;
    }

}