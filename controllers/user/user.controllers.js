import User from "../../models/user/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { varityUser } from "../../middleware/auth/varify.middleware.js";

// cross site scrpting
const registerUser = async (req, res) => {
  const { name, email, password, status } = req.body;

  try {
    if (!name || !email || !password)
      return res.status(400).json({ msg: "all field are required" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    if (!hashedPassword) {
      return res.json({ msg: "hash" });
    }

    const registerUser = new User({
      name,
      email,
      password: hashedPassword,
      status,
    });
    const isSaved = await registerUser.save();

    if (!isSaved) {
      return res.status(400).json({ msg: "user save error" });
    }

    res.status(200).json({ msg: "user registertaion sucessfull" });
  } catch (error) {
    console.log(error, "catch err");
    return res.status(400).json({ msg: "user registertaion failed!" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "invalid email and password" });
  }

  const isUser = await User.findOne({ email: email });

  if (!isUser) {
    return res.status(400).json({ msg: "invalid email" });
  }

  const isValidPass = bcrypt.compareSync(password, isUser.password);

  if (!isValidPass) {
    return res.status(400).json({ msg: "invalid password" });
  }

  var token = jwt.sign({ _id: isUser._id }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60,
  });

  const { password: resPass, ...LoggedInUser } = isUser._doc;

  return res
    .cookie( "access_token", token )
    .status(200)
    .json({
      msg: "Logged in sucessfully",
      user: LoggedInUser,
      password: resPass,
    });
};

export { registerUser, login };
