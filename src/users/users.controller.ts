import { Controller, Body, Post, Query, Param, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  //테스트는 아래와 같이 해야한다. windows curl에서의 -d의 body 구문은 작은 따옴표로 감싸면 오류가 발생한다.
  //curl -X POST http://localhost:3000/users -H "Content-Type:application/json" -d "{\"name\":\"YOUR_NAME\",\"email\":\"YOUR_EMAIL@gmail.com\"}"
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;
    await this.usersService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;
    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;
    return await this.usersService.login(email, password);
  }

  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
    return await this.usersService.getUserInfo(userId);
  }

  @Get()
  getHello(): string {
    return 'hello world';
  }
}

// 이메일 인증
// curl -X POST http://localhost:3000/users/email-verify\?signupVerifyToken\=test_token

// 로그인
// curl -X POST http://localhost:3000/users/login -H "Content-Type:application/json" -d "{\"email\":\"YOUR_EMAIL@gmail.com\",\"password\":\"PASSWORD\"}"

// 회원 정보 조회
// curl -X GET http://localhost:3000/users/user-id
