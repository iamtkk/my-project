import { Controller, Body, Post, Query, Param, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserInfo } from './UserInfo';

@Controller('users')
export class UsersController {
  //테스트는 아래와 같이 해야한다. windows curl에서의 -d의 body 구문은 작은 따옴표로 감싸면 오류가 발생한다.
  //curl -X POST http://localhost:3000/users -H "Content-Type:application/json" -d "{\"name\":\"YOUR_NAME\",\"email\":\"YOUR_EMAIL@gmail.com\"}"
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    console.log('dto : ', dto);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    console.log(dto);
    return;
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    console.log(dto);
    return;
  }

  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<string> {
    console.log(userId);
    return;
  }
}

// 이메일 인증
// curl -X POST http://localhost:3000/users/email-verify\?signupVerifyToken\=test_token

// 로그인
// curl -X POST http://localhost:3000/users/login -H "Content-Type:application/json" -d "{\"email\":\"YOUR_EMAIL@gmail.com\",\"password\":\"PASSWORD\"}"

// 회원 정보 조회
// curl -X GET http://localhost:3000/users/user-id
