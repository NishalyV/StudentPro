import { Controller, Post, Body, ValidationPipe, UseGuards, Req, UsePipes, Get, ParseIntPipe, Param, Patch, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser } from './get-decorator';
import { User } from './user.entity';
import { AuthSignInDto } from './auth-signin.dto';
import { Modeluser } from './model';


@Controller('auth')
export class AuthController {
    constructor(private authservice:AuthService){}

    @Post('/signIn')
    signIn(@Body(ValidationPipe) authsignindto:AuthSignInDto): Promise<Modeluser>{
        return this.authservice.signIn(authsignindto);
    }

    @Get()
    getAll(): Promise<User[]> {
        return this.authservice.getAll();
    }

    @Get('/:id')
    getItemById(@Param('id') id: string): Promise<User> {
        return this.authservice.getUserById(id);
    }

}
