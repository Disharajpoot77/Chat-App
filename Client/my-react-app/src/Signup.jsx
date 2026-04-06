// import React from 'react'
// import axios from 'axios'
// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'


// const Signup = () => {
//   const navigate =useNavigate();

//   // let [show,setshow]=useState({})
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

// async function fun2(e) {
//   e.preventDefault();

//   try {
//     let response = await axios.post("http://localhost:4000/signup", data);
//     console.log("SUCCESS 👉", response.data);
//     alert(response.data);
//     navigate('/login')
//   } catch (err) {
//     console.log("AXIOS ERROR 👉", err.response.data);
//     alert(err.response.data);
//   }
// }



	// async function fun2(e){
  //   e.preventDefault();
	//   // setshow({data})
	//   // console.log(show);
  //   console.log("data",data);
	//   let response= await axios.post("http://localhost:4000/",data);
  //      console.log("res dekho",response.data);	  
	 
	// }



//   return (
// 	<div>
// <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        
//         <h2 className="text-2xl font-bold text-center mb-6">
//           Create Account
//         </h2>

//         <div className="space-y-4">
//           <input
//            name='userName' value ={data.userName} onChange={fun1}
//             type="text"
//             placeholder="Username"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />

//           <input
//            name='email' value ={data.email} onChange={fun1}
//             type="email"
//             placeholder="Email"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />

//           <input
//            name='passWord' value ={data.passWord} onChange={fun1}
//             type="password"
//             placeholder="Password"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />

//           <button
       
//           onClick={fun2} 
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
//           >
//             Sign Up
//           </button>
//         </div>

//         <p className="text-center text-sm mt-4">
//           Already have an account?{" "}
//           <span className="text-indigo-600 cursor-pointer hover:underline">
// 			<Link to="/login">
//             Login
// 			</Link>
//           </span>
//         </p>

//       </div>
//     </div>
// 	</div>
//   )
// }

// export default Signup




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

   const submit = async () => {
     setError("");
     setMsg("");
     setLoading(true);

    try {
        const res= await fetch("http://localhost:5173/api/signup", {
      
         method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      console.log(res);

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      setMsg("Signup successful 🎉 Redirecting...");
      
      setTimeout(() => {
        nav("/login");
      }, 1500);

    } catch (err) {
      setError("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>

        {msg && <p className="success">{msg}</p>}
        {error && <p className="error">{error}</p>}

        <input
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={submit} disabled={loading}>
          {loading ? "Please wait..." : "Signup"}
        </button>

        <p className="switch">
          Already have an account?{" "}
          <span onClick={() => nav("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}