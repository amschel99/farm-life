const Account = require('../models/Account');

const createUser = async (req, res) => {
  try {
    const { user } = req.body;
    const account = await Account.create({ user });

    return res.status(201).json(account);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createUser };
