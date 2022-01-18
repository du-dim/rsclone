import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from './User';

interface IBody {
  email: string,
  password: string
}

const router = Router();

router.post(
  '/register',
  [
    check('email', 'Incorrect email').normalizeEmail().isEmail(),
    check('password', 'The minimum password length should be six characters').isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          errors: errors.array(),
          message: 'The data is incorrect during registration',
        });
      } else {
        const { email, password } = req.body as IBody;
        const condidate = await User.findOne({ email });
        if (condidate) {
          res.status(400).json({ message: 'Such a user already exists' });
        } else {
          const hashPassword = await bcrypt.hash(password, 12);
          const user = new User({ email, password: hashPassword });
          await user.save();
          res.status(201).json({ message: 'The user has been created' });
        }
      }
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  },
);

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'User not found' });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: 'Invalid password' });
      } else {
        const token = jwt.sign(
          { userId: user.id },
          config.get<string>('jwtSecret'),
          { expiresIn: '1h' },
        );
        res.json({ token });
      }
    }
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/users', (req: Request, res: Response) => res.sendStatus(200));

export default router;
