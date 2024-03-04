import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto{
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    username:string;

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/,{
        message:'비밀번호는 영어와 숫자로만 입력할 수 있습니다.'
    })
    password:string;
}