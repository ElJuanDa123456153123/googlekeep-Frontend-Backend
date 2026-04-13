import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { sign } from 'crypto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async singIn(@Body() signInDto: LoginDto) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }
}