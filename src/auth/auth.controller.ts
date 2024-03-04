import { Controller,Post,Body, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto):Promise<void>{
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/login')
    login(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto):Promise<{accessToken:string}>{
        return this.authService.login(authCredentialsDto);
    }

    @Post('/testRequest')
    @UseGuards(AuthGuard())
    // testRequest(@Req() req){
    //     console.log('req',req);
    // }
    testRequest(@GetUser()user:User){
        console.log('사용자 정보: ',user);
    }
}
