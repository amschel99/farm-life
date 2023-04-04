const Account = require('../models/Account');

const updateCoins = async (req, res) => {
  try {
    const { user, coins,points } = req.body;
    console.log(coins,user)
    const updatedAccount = await Account.findOneAndUpdate({ user }, { coins,points });

    if (!updatedAccount) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(updatedAccount);
  } catch (err) {
    console.error(err);
    return res.status(500).json(e.message );
  }
};

module.exports = { updateCoins };
