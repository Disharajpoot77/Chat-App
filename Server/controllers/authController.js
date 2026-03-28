const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===== SIGNUP =====
exports.signup= async (req, res) => {
  console.log("REQ BODY ", req.body);
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);

    if(!username || !email || !password) {
      return res.status(400).send("All fields required");
    }

     const user= await User.findOne({ email });
    if (user) return res.status(400).send("User already exists");

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPass });

    await newUser.save();
    res.send("Account created successfully");
  } catch (err) {
    console.log("SIGNUP ERROR 👉", err);
    res.status(500).send("Server error");
  }
};




// app.post('/', async (req, res) => {
//   if (!userName || !email || !passWord) {
//   return res.status(400).send("All fields are required");
// }

//   const user = await User.findOne({ email });
//   if (user) return res.status(400).send("User already exists");

//   const hashedPass = await bcrypt.hash(passWord, 10);
//   const newUser = new User({ userName, email, passWord: hashedPass });
//   await newUser.save();
//   res.send("Account created successfully");
// });

// ===== LOGIN =====
exports.login= async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      "SECRET123",
      { expiresIn: "1h" }
    );

    res.json({
      msg: "Login successful",
      token,
      user: { _id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ msg: "Error during login", error: err.message });
  }
};

