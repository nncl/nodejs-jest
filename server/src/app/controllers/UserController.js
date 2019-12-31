import User from '../models/User';

class UserController {
  async store(req, res) {
    const { email } = req.body;
    const checkUser = await User.findOne({ where: { email } });

    if (checkUser) {
      return res.status(400).json({ error: 'User already registered' });
    }

    const user = await User.create(req.body);
    return res.json(user);
  }
}

export default new UserController();
