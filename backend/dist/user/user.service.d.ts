import { Model } from 'mongoose';
import { UserDocument, User } from 'src/schema/user.schema';
import { UserDto } from './user.dto';
import mongoose from 'mongoose';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    register(userDto: UserDto): Promise<User>;
    login(): void;
    getInfo(id: mongoose.Types.ObjectId): Promise<User>;
    updateInfo(id: mongoose.Types.ObjectId, newInfo: any): Promise<User>;
    getAllUser(): Promise<User[]>;
}
