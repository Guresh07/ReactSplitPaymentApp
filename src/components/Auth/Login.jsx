import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Auth } from "../Apis/Api";

const Login = () => {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();


    // try {
    //   const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //   const user = userCredential.user;

    //   setMessage(`Welcome, ${user.displayName || user.email}`);
    //   console.log("Logged in user:", user);
    // } catch (error) {
    //   setMessage("Login failed: " + error.message);
    // }

    try {
      const res = await fetch(`${Auth}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();

        // You can save token / user data to localStorage if API sends one
        localStorage.setItem("currentUser", JSON.stringify(data));

        alert("Login successful!");
        navigate("/");
      } else {
        const errorData = await res.json();
        alert("Login failed: " + (errorData.message || "Invalid credentials"));
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div className="col-md-4 col-12">
          <h2 className="mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Your email"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>

            <button type="submit" className="btn btn-primary">Login</button>

            <p className="mt-3">
              Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
