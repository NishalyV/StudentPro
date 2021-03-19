import {PassportStrategy} from '@nestjs/passport';
import {Strategy,ExtractJwt} from 'passport-jwt';
import { JwtPayload } from './JwtPayload';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userrepository:UserRepository
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'topSecret51',

        })
    }

    async validate(payload:JwtPayload):Promise<User>{
        const {Email}=payload;
        const user = await this.userrepository.findOne({Email});

        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}
