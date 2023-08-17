import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import UserService from '../../application/services/UserService';

@injectable()
class UserController {
  constructor(@inject('UserService') private userService: UserService) {}

  async createUser(req: Request, res: Response): Promise<void> {
    // Extract user data from request body
    const newUser = req.body;

    try {
      const createdUser = await this.userService.createUser(newUser);
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  }

  async getUserByUsername(req: Request, res: Response): Promise<void> {
    const username = req.params.username;

    try {
      const user = await this.userService.findUserByUsername(username);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  }
}

export default UserController;
