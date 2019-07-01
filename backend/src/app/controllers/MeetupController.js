import * as Yup from 'yup';
import Meetup from '../models/Meetup';

class MeetupController {
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

    return req.json();
  }
}

export default new MeetupController();
