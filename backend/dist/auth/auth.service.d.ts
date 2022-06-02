declare enum Provider {
    GOOGLE = "google"
}
export declare class AuthService {
    private readonly JWT_SECRET_KEY;
    constructor();
    validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string>;
    googleLogin(req: any): "No user from google" | {
        message: string;
        user: any;
    };
}
export {};
