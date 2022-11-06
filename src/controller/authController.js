const {AuthenticationServices} = require('../services');

const registerUser = async (req, res) => {
  const {email, password, regCode} = req.body;
  try {
    const user =
    await AuthenticationServices.registerUser(email, password, regCode);
    res.status(201).json({user: user});
  } catch (error) {
    throw error;
  }
};

const signOut = (req, res) => {

};

module.exports = {
  registerUser,
  signOut,
};
