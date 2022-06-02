import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

enum Provider { GOOGLE = 'google' }

@Injectable()
export class AuthService {
    
    private readonly JWT_SECRET_KEY = '2ioBmRBULgIh9UcvsjpTz3BqweVCMVATF9AEUpwivRW1TBlLDIyCZFJTJ9v1vGXfz0rG7jFbH7CNhiT1c3iasXd8eNgaokuXdWzE027eSXlrKk2LgruDgnGDj2UCXMO2+Wk2JfMnxziL1Rg1cRLh2GSRX129c59nweHgZpAbSmN6oDnFhpa4z7qbBdi8suvT6MJuvXFxjgSmYCmTMLju2sVUwjWPFgptY0u3jIGpKxs8rcST8K/xzO39W6qHrZd/LLM92ZFnWtOLAlytuLqhI5MrksgJHKIHiKFzaKitj4AM/kp3shtq3iaL4iNo//KoGEQqmX8/wV30oGJ4FPFqvg==';

    constructor() {}
    async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string> 
    {
        try {
            // You can add some registration logic here, 
            // to register the user using their thirdPartyId (in this case their googleId)
            // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);
            
            // if (!user)
            // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);
            const payload = {
                thirdPartyId,
                provider
            }

            const jwt: string = sign(payload, this.JWT_SECRET_KEY, { expiresIn: 3600 });
            return jwt;
        } catch (error) {
            throw new InternalServerErrorException('validationOAuthLogic', error.message)
        }
    }

    googleLogin(req) {
        if (!req.user) return 'No user from google'
        return {
            message: 'User info from google',
            user: req.user
        }
    }
}