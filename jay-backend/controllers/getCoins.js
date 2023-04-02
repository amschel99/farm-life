const Account = require('../models/Account');

const getCoins = async (req, res) => {
  try {
    const { user } = req.query;
    console.log(user)
    const account = await Account.findOne({ user });

    if (!account) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ coins: account.coins });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error:err.message});
  }
};

module.exports = { getCoins };
