import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import { Role, User } from '@/database/models';

export class AuthController {
  static login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    const user: any = await User.findOne({
      where: { email, password },
      include: [{ model: Role }],
    });
    // eslint-disable-next-line no-console
    console.table(user);
    if (!user) return res.status(401).json({ message: 'User not found' });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).json({ message: 'Invalid password' });

    const { password: removedPassword, ...userWithoutPassword } = user;
    return res.json(userWithoutPassword);
  };
}
