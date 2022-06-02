import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from 'src/schema/user.schema';
import { UserDto } from '../../dtos/user.dto';
import mongoose from 'mongoose';
// import { Observable } from 'rxjs'; understand how this works

@Injectable()
export class UserService {

  constructor(@InjectModel('user') private userModel: Model<UserDocument>){}

  async register(userDto: UserDto): Promise<User> {
    console.log(userDto)
    const createUser = new this.userModel(userDto);
    return createUser.save();
  }

  login() {
    
  }

  async getInfo(id: mongoose.Types.ObjectId): Promise<User> {
    return this.userModel.findOne(id).exec();
  }

  async updateInfo(id: mongoose.Types.ObjectId, newInfo): Promise<User> {
    return this.userModel.findOneAndUpdate(id, newInfo).exec();
  }

  async getAllUser(): Promise<User[]> {
    return this.userModel.find().exec();
  }

}