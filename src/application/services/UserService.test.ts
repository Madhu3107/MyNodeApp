import { container } from 'tsyringe';
import UserService from './UserService';
import UserRepository from '../../domain/repositories/UserRepository';
import User from '../../domain/models/User';
import { mocked } from 'ts-jest/utils';

jest.mock('../../domain/repositories/UserRepository');

describe('UserService', () => {
  let userService: UserService;
  let userRepositoryMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepositoryMock = mocked(container.resolve(UserRepository));
    userService = new UserService(userRepositoryMock);
  });

  it('should create a user', async () => {
    const newUser: User = { id: 1, username: 'testuser', email: 'test@example.com' };
    userRepositoryMock.create.mockResolvedValue(newUser);

    const createdUser = await userService.createUser(newUser);

    expect(createdUser).toEqual(newUser);
  });

  it('should find a user by username', async () => {
    const username = 'testuser';
    const user: User = { id: 1, username, email: 'test@example.com' };
    userRepositoryMock.findByUsername.mockResolvedValue(user);

    const foundUser = await userService.findUserByUsername(username);

    expect(foundUser).toEqual(user);
  });

  it('should return null when user not found by username', async () => {
    const username = 'nonexistent';
    userRepositoryMock.findByUsername.mockResolvedValue(null);

    const foundUser = await userService.findUserByUsername(username);

    expect(foundUser).toBeNull();
  });
});
