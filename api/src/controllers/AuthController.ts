import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import { Sequelize } from 'sequelize';
import jwt from 'jsonwebtoken';
import { Role, User } from '@/database/models';

export class AuthController {
  static authenticate: RequestHandler = async (req, res) => {
    const token = req.headers.authorization;
    res.json({ token });
  };

  static login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, attributes: [] }],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'role'],
        // Rename the column name from 'role.name' to 'role'
        include: [[Sequelize.col('"Role"."name"'), 'role']],
      },
      raw: true,
    });
    if (!user) return res.status(401).json({ error: 'User not found' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).json({ error: 'Invalid password' });

    // Remove the password from the response
    const { password: removedPassword, ...userWithoutPassword } = user;
    const token = jwt.sign(userWithoutPassword, 'test', { expiresIn: 300 });
    return res.json({ token });
  };
}