import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import * as brcypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(authCredentialsDto:AuthCredentialsDto):Promise<void>{
        const {username,password}=authCredentialsDto;
        const salt= await brcypt.genSalt(); //비밀번호 암호화
        const hashedPassword=await brcypt.hash(password,salt);

        const user=this.create({username,password:hashedPassword}); 

        try{
            await this.save(user);
        }catch(error){
            console.log('이미 존재하는 사용자 이름입니다.')
        }
    }
    // async createUser(authCredentialsDto:AuthCredentialsDto):Promise<void>{
    //     const {username,password}=authCredentialsDto;
    //     const user=new User();
    //     user.username = username;
    //     user.password = password;
    //     await this.save(user);
    // }
}
