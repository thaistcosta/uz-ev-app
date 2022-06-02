import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller()
export class AuthController{
    constructor(private readonly authService: AuthService) {}

    @Get('auth/google')
    @UseGuards(AuthGuard('google'))
    async googleLogin(@Req() req){ }

    @Get('auth/google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req, @Res() res)
    {
        const jwt: string = req.user.jwt;
        if (jwt) return res.redirect('http://localhost:4200/login/succes/' + jwt)
        else return res.redirect('http://localhost:4200/login/failure');
    }

}