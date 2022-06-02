import { Controller, Post, Get, Body, Put, Res, Patch, Param, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../../dtos/user.dto';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post('signup')
    signup(@Body() userDto: UserDto){
        console.log('yeap')
        return this.userService.register(userDto);
    }

    @Post('user')
    login(){
        
    }

    @Get(':id')
    async userInfo(@Param() params): Promise<any>{
        return this.userService.getInfo(params);
    }

    @Patch(':id')
    async updateInfo(@Param() params, @Body() userDto: UserDto): Promise<any>{
        return this.userService.updateInfo(params, userDto);
    }

    @Get('users-info')
    async allUsersInfo(): Promise<any>{
        return this.userService.getAllUser();
    }
}