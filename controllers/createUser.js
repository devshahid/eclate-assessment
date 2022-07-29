const userProfile = require("../models/userschema");

const createUser = async (req, res) => {
  console.log(req.body);
  const { email, password, confirmpass, name } = req.body;
  if (!email || !password || !confirmpass || !name) {
    return res
      .status(422)
      .json({ status: "422", error: "some data is missing" });
  }
  if (password != confirmpass) {
    return res.status(422).json({ error: "Password should be match" });
  }
  try {
    const userExist = await userProfile.findOne({ email });
    console.log(userExist);
    if (userExist) {
      console.log("User Already Exist");
      return res.json({ error: "Email already exists" });
    }
    const user = new userProfile({ email, password, name });

    const registerUser = await user.save();

    if (registerUser) {
      res.status(201).json({ message: "user created", statusCode: 201 });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ CatchBlock: err });
  }
};

module.exports = createUser;
