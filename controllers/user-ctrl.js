const User = require("../modules/user-model");
const { validationResult } = require("express-validator");
const logger = require('../logger/logger')

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
    const userSchema = User(body);
    await userSchema.save();
    logger.log('info','"user created!')
     res.status(201).json(userSchema);
  } catch (err) {
    logger.error('error',err);
    return res.status(400).json(
      err,
      "user not created!",
    );
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });

    logger.log('info','The user has been deleted')
    return res
      .status(200)
      .json("The user has been deleted" );
  } catch (err) {
    logger.error('error',err);
    return res.status(400).json(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res
        .status(404)
        .json({error: `User does not exist` });
    }
    logger.log('info','User ')
    return res.status(200).json(user);
  } catch (err) {
    logger.error('error',err);
    return res.status(400).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.updateOne({ _id: req.params.id }, body);
    if (!user) {
      return res.status(400).json( "Error" );
    }
    logger.log('info','User has been update')
    return res.status(200).json(user);
  } catch (err) {
    logger.error('error',err);
    return res.status(400).json(
      err,
       "user not updated!",
);
  }
};

module.exports = {
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
