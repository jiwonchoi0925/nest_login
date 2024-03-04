import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as brcypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository,
        private jwtService:JwtService
    ){}

    async signUp(authCredentialsDto:AuthCredentialsDto):Promise<void>{
        return this.userRepository.createUser(authCredentialsDto);
    }

    async login(authCredentialsDto:AuthCredentialsDto):Promise<{accessToken:string}>{
        const{username,password}=authCredentialsDto;
        const user=await this.userRepository.findOne({username});
        if(user && (await brcypt.compare(password,user.password))){
            //user token 생성(Secret + Payload)
            const payload={username} //중요한 정보는 넣어주면 안됨
            const accessToken=await this.jwtService.sign(payload);
            return {accessToken}
        }else{
            throw new UnauthorizedException('로그인 실패')
        }
    }
}
