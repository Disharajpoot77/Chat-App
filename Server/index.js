// let express= require("express")
// const mongoose = require("mongoose");
// const User = require("./Models/User");
// const cors = require('cors');
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// let app= express()


const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const cors = require("cors");

const connectDB = require("./config/db");
const routes = require("./routes/index");
const initSocket = require("./sockets/sockets");

connectDB();

const  app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api", routes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});

initSocket(io);

server.listen(3000, () => console.log("Server running"));





// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

// app.use(express.json())

// mongoose.connect('mongodb://127.0.0.1:27017/insta')
  
// .then(() => console.log("DB connected..."))
// .catch(err => console.error("DB connection error:", err));

// app.get('/', (req, res) => res.send("Hello"));


// const auth = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) return res.status(401).send('Unauthorized User');

//   try {
//     const decodedToken = jwt.verify(token, "SECRET123");
//     req.user = decodedToken;
//     next();
//   } catch (err) {
//     return res.status(401).send('Invalid Token');
//   }
// };

// // ===== SIGNUP =====
// app.post('/', async (req, res) => {
//   console.log("REQ BODY ", req.body);
//   try {
//     const { userName, email, passWord } = req.body;

//     if (!userName || !email || !passWord) {
//       return res.status(400).send("All fields required");
//     }

//     const user = await User.findOne({ email });
//     if (user) return res.status(400).send("User already exists");

//     const hashedPass = await bcrypt.hash(passWord, 10);
//     const newUser = new User({ userName, email, passWord: hashedPass });

//     await newUser.save();
//     res.send("Account created successfully");
//   } catch (err) {
//     console.log("SIGNUP ERROR 👉", err);
//     res.status(500).send("Server error");
//   }
// });




// // app.post('/', async (req, res) => {
// //   if (!userName || !email || !passWord) {
// //   return res.status(400).send("All fields are required");
// // }

// //   const user = await User.findOne({ email });
// //   if (user) return res.status(400).send("User already exists");

// //   const hashedPass = await bcrypt.hash(passWord, 10);
// //   const newUser = new User({ userName, email, passWord: hashedPass });
// //   await newUser.save();
// //   res.send("Account created successfully");
// // });

// // ===== LOGIN =====
// app.post("/login", async (req, res) => {
//   try {
//     const { email, passWord } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     const isMatch = await bcrypt.compare(passWord, user.passWord);
//     if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

//     const token = jwt.sign(
//       { _id: user._id, email: user.email },
//       "SECRET123",
//       { expiresIn: "1h" }
//     );

//     res.json({
//       msg: "Login successful",
//       token,
//       user: { _id: user._id, userName: user.userName, email: user.email }
//     });
//   } catch (err) {
//     res.status(500).json({ msg: "Error during login", error: err.message });
//   }
// });


// //for get users//
// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find({}, "userName email");
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ msg: "Failed to fetch users" });
//   }
// });






// app.listen(4000,()=>{
// 	console.log("Server is running on port 4000")
// })