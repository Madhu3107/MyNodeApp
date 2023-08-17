import { container } from 'tsyringe';
import UserRepository from '../domain/repositories/UserRepository';
import MongoUserRepository from '../infrastructure/repositories/MongoUserRepository';
import UserService from './services/UserService';
import mongoose from 'mongoose';
import User from '../domain/models/User';

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema<User>({
  id: Number,
  username: String,
  email: String,
});

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

container.register<UserRepository>('UserRepository', {
  useClass: MongoUserRepository,
  dependencies: [{ token: 'UserModel', useValue: UserModel }],
});

container.register<UserService>('UserService', {
  useClass: UserService,
});
