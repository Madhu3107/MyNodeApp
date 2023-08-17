import User from '../../domain/models/User';
import UserRepository from '../../domain/repositories/UserRepository';
import { Model, Document } from 'mongoose';

interface UserDocument extends User, Document {}

class MongoUserRepository implements UserRepository {
  constructor(private userModel: Model<UserDocument>) {}

  async findById(id: number): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async create(user: User): Promise<User> {
    return this.userModel.create(user);
  }
}

export default MongoUserRepository;
