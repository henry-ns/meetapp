import { Op } from 'sequelize';

import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import File from '../models/File';

import CreateSubscriptionService from '../services/CreateSubscriptionService';
import User from '../models/User';

class SubscriptionController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const subcriptions = await Subscription.findAll({
      where: { user_id: req.userId },
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id'],
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: { [Op.gt]: new Date() },
          },
          include: [
            {
              model: File,
              as: 'file',
              attributes: ['id', 'path', 'url'],
            },
            {
              model: User,
              as: 'owner',
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
      ],
      order: [[Meetup, 'date']],
    });

    return res.json(subcriptions);
  }

  async store(req, res) {
    const subscription = await CreateSubscriptionService.run({
      user_id: req.userId,
      meetup_id: req.params.meetupId,
    });

    return res.json(subscription);
  }
}

export default new SubscriptionController();
