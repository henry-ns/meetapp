import User from '../models/User';

class UserController {
  async store(req, res) {
    /**
     * Checking if user already exists
     */
    const isExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (isExists) return res.status(400).json({ error: 'User already exists' });

    /**
     * Create user
     */
    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    /**
     * Checking new email is already registered
     */
    if (email && email !== user.email) {
      const isExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (isExists)
        return res.status(400).json({ error: 'User already exists.' });
    }

    /**
     * Checking oldPassword match
     */
    if (oldPassword && !(await user.checkPassword(oldPassword)))
      return res.status(401).json({ error: 'Password does not match' });

    const { id, name } = await user.update(req.body);

    return res.json({ id, name, email });
  }
}

export default new UserController();
