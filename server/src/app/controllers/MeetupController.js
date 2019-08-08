import { isBefore, parseISO, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import File from '../models/File';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import User from '../models/User';

class MeetupController {
  async index(req, res) {
    const { date, page = 1 } = req.query;

    const searchDate = date ? parseISO(date) : new Date();

    const meetups = await Meetup.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
        user_id: { [Op.not]: req.userId },
      },
      limit: 2,
      offset: (page - 1) * 2,
      attributes: ['id', 'title', 'description', 'location', 'date'],
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'file',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    /**
     * return id of my subscriptions
     */
    const meetupsIndexs = meetups.map(meetup => meetup.id);
    const mySubscriptions = (await Subscription.findAll({
      where: {
        user_id: req.userId,
        meetup_id: { [Op.in]: meetupsIndexs },
      },
      attributes: ['meetup_id'],
    })).map(sub => sub.meetup_id);

    return res.json({ meetups, mySubscriptions });
  }

  async store(req, res) {
    if (isBefore(parseISO(req.body.date), new Date()))
      return res.status(400).json({ error: 'Invalid Date' });

    /**
     * Create meetup
     */
    const meetup = await Meetup.create({
      ...req.body,
      user_id: req.userId,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    if (isBefore(parseISO(req.body.date), new Date()))
      return res.status(400).json({ error: 'Invalid Date' });

    const meetup = await Meetup.findByPk(req.params.id);

    /**
     * Check meetup exists
     */
    if (!meetup) return res.status(400).json({ error: 'Meetup not found' });

    /**
     * Check user owns the meeting
     */
    if (meetup.user_id !== req.userId)
      return res.status(400).json({ error: 'Meetup not found' });

    /**
     * Check meetup has passed
     */
    if (isBefore(meetup.date, new Date()))
      return res.status(400).json({ error: "You can't modify a past meetup" });

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    /**
     * Check user owns the meeting
     */
    if (meetup.user_id !== req.userId)
      return res.status(401).json({ error: 'not authorized' });

    await meetup.destroy();
    return res.json();
  }
}

export default new MeetupController();
