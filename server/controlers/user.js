const mongoose = require("mongoose");
const user = require("../models/user");
const User = require("../models/user");

const createUser = (req, res) => {
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    username: req.body.username,
    email: req.body.email,
    birthdate: new Date(req.body.birthdate).toISOString().split("T")[0],
  });

  return user
    .save()
    .then((newUser) => {
      return res.status(201).json({
        success: true,
        message: "New cause created successfully",
        user: newUser,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};

const findUsers = (req, res) => {
  const username = req.params.name || req.query?.name || "";
  const query = {
    username: new RegExp(username, "i"),
  };

  return User.find(query)
    .then((users) => {
      return res.status(200).json({
        success: true,
        message: "Successfully",
        users: users,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    });
};

const updateUser = async (req, res) => {
  if (!req.body?.users) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
    });
  }

  var users = JSON.parse(JSON.stringify(req.body?.users));

  // verify input data
  if (!users.length) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
    });
  }

  if (users.length == 0) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
    });
  }

  users.map((user) => {
    if (
      user._id == "" ||
      user?.username == "" ||
      user?.email == "" ||
      user.birthdate == ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
      });
    }
  });

  // update record
  var resulst = Promise.all(
    users.map(async (user) => {
      const userUpdate = new User({
        username: user.username,
        email: user.email,
        birthdate: new Date(user.birthdate).toISOString().split("T")[0],
      });

      await User.updateOne({ _id: user._id }, { $set: userUpdate })
        .exec()
        .catch((error) => {
          res.status(500).json({
            success: false,
            error: error.message,
          });
        });
      return userUpdate;
    })
  );

  if ((await resulst).length > 0) {
    return res.status(200).json({
      success: true,
      message: "Successfully",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
    });
  }
};

module.exports = { createUser, findUsers, updateUser };
