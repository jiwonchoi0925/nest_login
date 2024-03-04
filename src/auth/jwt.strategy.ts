import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private uesrRepository:UserRepository
    ){
        super({  //토큰 인증, 유효한지 확인
            secretOrKey:'secretToken',
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }
    async validate(payload){ //payload 안의 uesrname에 맞는 유저가 db에 있는지 확인하고 있으면 반환하거나 없으면 에러
        const{username}=payload;
        const user:User=await this.uesrRepository.findOne({username});

        if(!user){
            throw new UnauthorizedException();
        }else{
            return user;
        }
    }
}
