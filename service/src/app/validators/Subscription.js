import * as Yup from 'yup';

import validator from './validator';

export const validateSubscriptionStore = (req, res, next) => {
  const schema = Yup.object().shape({
    meetupId: Yup.number().required(),
  });

  return validator(req, res, next, schema);
};

export default validateSubscriptionStore;
