import { injectable, inject } from 'tsyringe';
import User from '../../domain/models/User';
import UserRepository from '../../domain/repositories/UserRepository';

@injectable()
class UserService {
  constructor(@inject('UserRepository') private userRepository: UserRepository) {}

  async createUser(user: User): Promise<User> {
    // Validate user data
    // Apply business logic
    const createdUser = await this.userRepository.create(user);
    return createdUser;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }
}

export default UserService;
