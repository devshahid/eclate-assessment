const userProfile = require("../models/userschema");

const getUserDetails = async (req, res) => {
  try {
    const usersList = await userProfile.find({});
    console.log(usersList);
    if (!usersList) {
      return res.json({ message: "No Users Found", status: "200" });
    }
    return res
      .status(200)
      .json({ message: "user info", status: "200", usersList });
  } catch (err) {
    return res.status(500).json({ error: err, status: "500" });
  }
};

module.exports = getUserDetails;
