import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-google-oauth20";
import { AuthService } from "./auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy( Strategy, 'google') {
    constructor(private configService: ConfigService, private readonly authService: AuthService){
        super({
            clientID: configService.get('CLIENT_ID'), // need to make the logic and replce
            clientSecret: configService.get('CLIENT_SECRET'), // need to make the logic and replce
            callbackURL: 'http://localhost:5000/auth/google/callback',
            passReqToCallback: true,
            scope: ['profile']
        })
    }
    async validate(request: any, accessToken: string, refreshToken: string, 
    profile, done: Function): Promise<any> {
            try {
                console.log(profile)
                const jwt: string = 'placeholder';
                // const jwt: string = await this.authService.validateOAuthLogin(profile.id, provider);// change here
                const user = { jwt }
                done(null, user);
            } catch (error) {
                done(error, false)
            }
    }
    
}