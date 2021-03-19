import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import {JwtService} from '@nestjs/jwt';
import { JwtPayload } from './JwtPayload';
import { AuthSignInDto } from './auth-signin.dto';
import { Modeluser } from './model';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor
    (
        @InjectRepository(UserRepository)
    private userrepository:UserRepository,
    private jwtservice:JwtService
    ){}
    

   
    async signIn(authsignin:AuthSignInDto):Promise<Modeluser>{
        const {id,Username,Email}= await this.userrepository.signIn(authsignin);
        if  (!Email){
            throw new UnauthorizedException('invalid credentials');
        }

        const payload :JwtPayload = {Email} ;
        const accessToken= await this.jwtservice.sign(payload);
        return {id,Username,Email,accessToken};
    }

    async getAll():Promise<User[]>{
        return this.userrepository.getAll();
    }

    async getUserById(id: string): Promise<User> {
        const found = await this.userrepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }

}
