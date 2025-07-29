import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Auth } from "../Apis/Api";

const Signup = () => {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();


    // try {
    //   const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    //   // 🔧 Update display name
    //   await updateProfile(userCredential.user, {
    //     displayName: userName
    //   });

    //   setMessage("User signed up successfully!");
    //   navigate("/login")
    //   console.log("Signed up user:", userCredential.user);
    // } catch (error) {
    //   setMessage(error.message);
    // }
    try {
      const res = await fetch(`${Auth}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, password }),
      });

      if (res.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        const errorData = await res.json();
        alert("Signup failed: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Something went wrong!");
    }
  };

  return (

    <>
      <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div className="col-md-4 col-12">
          <h2 className="mb-4">Sign Up</h2>
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                required
                value={userName}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
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

            <button type="submit" className="btn btn-primary">Sign Up</button>

            <p className="mt-3">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
