import { UserService } from './user.service';
import { UserDto } from './user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    signup(userDto: UserDto): Promise<import("../schema/user.schema").User>;
    login(): void;
    userInfo(params: any): Promise<any>;
    updateInfo(params: any, userDto: UserDto): Promise<any>;
    allUsersInfo(): Promise<any>;
}
