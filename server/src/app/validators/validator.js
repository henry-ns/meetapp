export default async (req, res, next, schema) => {
  try {
    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validadion fails', messages: err.inner });
  }
};
