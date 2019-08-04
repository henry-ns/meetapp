import { Op } from 'sequelize';

import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';

import CreateSubscriptionService from '../services/CreateSubscriptionService';

class SubscriptionController {
  async index(req, res) {
    const subcriptions = await Subscription.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: Meetup,
          where: {
            date: { [Op.gt]: new Date() },
          },
          required: true,
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
