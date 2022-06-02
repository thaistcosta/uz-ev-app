import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleLogin(req: any): Promise<void>;
    googleLoginCallback(req: any, res: any): any;
}
