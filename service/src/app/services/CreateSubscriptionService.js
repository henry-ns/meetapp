import { isBefore } from 'date-fns';

import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';

import SubscriptionMail from '../jobs/SubscriptionMail';
import Queue from '../../lib/Queue';

class SubscriptionError extends Error {
  constructor(status, ...args) {
    super(...args);
    this.status = status;
  }
}

class CreateSubscriptionService {
  async run({ user_id, meetup_id }) {
    const meetup = await Meetup.findByPk(meetup_id, {
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!meetup) throw new SubscriptionError(400, 'Meetup not found');

    /**
     * Checking if user is the owner
     */
    if (meetup.user_id === user_id)
      throw new SubscriptionError(400, "You can't subscribe in your meetups");

    /**
     * Checking date
     */
    if (isBefore(meetup.date, new Date()))
      throw new SubscriptionError(400, "You can't subscribe to past meetups");

    /**
     * Checking if the user is already subscribler in an meetup on that date
     */
    const checkDate = await Subscription.findOne({
      where: { user_id },
      include: {
        model: Meetup,
        where: { date: meetup.date },
        required: true,
      },
    });

    if (checkDate)
      throw new SubscriptionError(
        400,
        "You can't subscribe in two meetings at the same time"
      );

    const isSubscribler = await Subscription.findOne({
      where: {
        user_id,
        meetup_id: meetup.id,
      },
    });

    if (isSubscribler)
      throw new SubscriptionError(400, 'You are already subscribe');

    const subscription = await Subscription.create({
      user_id,
      meetup_id: meetup.id,
    });

    /**
     * Send email
     */
    await Queue.add(SubscriptionMail.key, { meetup });

    return subscription;
  }
}

export default new CreateSubscriptionService();
