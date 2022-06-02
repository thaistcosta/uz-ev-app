"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
var Provider;
(function (Provider) {
    Provider["GOOGLE"] = "google";
})(Provider || (Provider = {}));
let AuthService = class AuthService {
    constructor() {
        this.JWT_SECRET_KEY = '2ioBmRBULgIh9UcvsjpTz3BqweVCMVATF9AEUpwivRW1TBlLDIyCZFJTJ9v1vGXfz0rG7jFbH7CNhiT1c3iasXd8eNgaokuXdWzE027eSXlrKk2LgruDgnGDj2UCXMO2+Wk2JfMnxziL1Rg1cRLh2GSRX129c59nweHgZpAbSmN6oDnFhpa4z7qbBdi8suvT6MJuvXFxjgSmYCmTMLju2sVUwjWPFgptY0u3jIGpKxs8rcST8K/xzO39W6qHrZd/LLM92ZFnWtOLAlytuLqhI5MrksgJHKIHiKFzaKitj4AM/kp3shtq3iaL4iNo//KoGEQqmX8/wV30oGJ4FPFqvg==';
    }
    async validateOAuthLogin(thirdPartyId, provider) {
        try {
            const payload = {
                thirdPartyId,
                provider
            };
            const jwt = (0, jsonwebtoken_1.sign)(payload, this.JWT_SECRET_KEY, { expiresIn: 3600 });
            return jwt;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('validationOAuthLogic', error.message);
        }
    }
    googleLogin(req) {
        if (!req.user)
            return 'No user from google';
        return {
            message: 'User info from google',
            user: req.user
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map