import {Body, Controller, Get, Post, Request, Res, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateAccountDto} from "./dto/create-account.dto";
import {LocalAuthGuard} from "./local-auth.guard";

import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }


    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async login(@Request() req, @Res({passthrough: true}) res) {
        const {accessKey} = await this.authService.login(req.user);
        res.cookie('access_token', accessKey, {httpOnly: true})
        return {
            message: "Login successful !"
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("/me")
    async me(@Request() req) {
        return this.authService.getMe(req.user);
    }

    @Post("/register")
    register(@Body() request: CreateAccountDto) {
        return this.authService.createAccount(request);
    }
}
