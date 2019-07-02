import { Op } from 'sequelize';
import * as Yup from 'yup';
import { isBefore } from 'date-fns';

import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';

import SubscriptionMail from '../jobs/SubscriptionMail';
import Queue from '../../lib/Queue';

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
    /**
     * Checking data
     */
    const schema = Yup.object().shape({
      meetupId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params)))
      return res.status(400).json({ error: 'Validadion fails' });

    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!meetup) return res.status(400).json({ error: 'Meetup not found' });

    /**
     * Checking if user is the owner
     */
    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: "You can't subscribe in your meetups" });
    }

    /**
     * Checking date
     */
    if (isBefore(meetup.date, new Date())) {
      return res
        .status(400)
        .json({ error: "You can't subscribe to past meetups" });
    }

    /**
     * Checking if the user is already subscribler in an meetup on that date
     */
    const checkDate = await Subscription.findOne({
      where: { user_id: req.userId },
      include: {
        model: Meetup,
        where: { date: meetup.date },
        required: true,
      },
    });

    if (checkDate) {
      return res.status(400).json({
        error: "You can't subscribe in two meetings at the same time",
      });
    }

    const isSubscribler = await Subscription.findOne({
      where: {
        user_id: req.userId,
        meetup_id: meetup.id,
      },
    });

    if (isSubscribler)
      return res.status(400).json({ error: 'You are already subscribed' });

    const subscription = await Subscription.create({
      user_id: req.userId,
      meetup_id: meetup.id,
    });

    /**
     * Send email
     */
    await Queue.add(SubscriptionMail.key, { meetup });

    return res.json(subscription);
  }
}

export default new SubscriptionController();
