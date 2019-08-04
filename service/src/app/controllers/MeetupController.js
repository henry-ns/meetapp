import * as Yup from 'yup';
import { isBefore, parseISO, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';

class MeetupController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const { date } = req.query;
    const searchDate = date ? parseISO(date) : new Date();

    const meetups = await Meetup.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(meetups);
  }

  async store(req, res) {
    /**
     * Checking data
     */
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      file_id: Yup.number().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validadion fails' });

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
    /**
     * Checking data
     */
    const schema = Yup.object().shape({
      title: Yup.string(),
      file_id: Yup.number(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validadion fails' });

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

    if (meetup.user_id !== req.userId)
      return res.status(401).json({ error: 'not authorized' });

    await meetup.destroy();
    return res.json();
  }
}

export default new MeetupController();
