// import React from 'react'
// import axios from 'axios'
// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// const Login = () => {
//   const navigate = useNavigate();


// //  let [show,setshow]=useState({})
// 	let [data,Setdata]=   useState({
// 	  userName:"",
// 	  email:"",
// 	  passWord:""
// 	})
// 	function fun1(e){
// 	  let  {name,value}=    e.target
// 	  Setdata({...data,[name]:value})
// 	  console.log(data);
// 	}

// 	async function fun2(){
// 	  // setshow({data})
// 	  // console.log(show);
// 	 let  response = await axios.post("http://localhost:4000/login",data);
// 	 console.log( "server res",response.data.token);
// 	 localStorage.setItem("token",response.data.token);
// 	 navigate('/UI')
// 	}



//   return (
// 	<div>
 
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

//         <h2 className="text-2xl font-bold text-center mb-6">
//           Welcome Back
//         </h2>

//         <div className="space-y-4">
//           <input
          
//           name='email'  value={data.email}  onChange={fun1}
//             type="email"
//             placeholder="Email"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />

//           <input
//              name='passWord'  value={data.passWord}  onChange={fun1}
//             type="password"
//             placeholder="Password"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />

//           <button
          
//           onClick={fun2}
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
//           >
//             Login
//           </button>
//         </div>

//         <p className="text-center text-sm mt-4">
//           Don’t have an account?{" "}
//           <span className="text-indigo-600 cursor-pointer hover:underline">
// 			<Link to="/">
//             Sign Up
// 			</Link>
//           </span>
//         </p>

//       </div>
//     </div>


// 	</div>
//   )
// }

// export default Login





import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await fetch("http://localhost:5173/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await res.json();
    console.log("LOGIN:", data);

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("me", data.username);

    // ⭐ direct chat open
    nav("/chat");
  };

  return (
    <div  className="auth-container">
      <div  className="auth-card">
        <h2>Welcome Back 👋</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={submit}>Login</button>

        <p className="switch">
          Don’t have an account?{" "}
          <span onClick={() => nav("/")}>Signup</span>
        </p>
      </div>
    </div>
  );
}