import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [post, setPost] = useState([]);
  const handelChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  if (post.status) {
    localStorage.setItem("token", post.data);
    if (post.userType == "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }
  const handleSumbit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/loginuser", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        ...formData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        //localStorage.setItem('token',data.data)

        console.log(data, "userLogin");
        //navigate('/')
      });
  };

  return (
    <div className="container my-container">
      {post.error && (
        <div className="red card-panel">{post.error} with that email!</div>
      )}
      {post.status && (
        <div className="green card-panel">You are Login now!</div>
      )}
      <div className="cover">
        <h5>Login</h5>
        <form onSubmit={handleSumbit}>
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={handelChange}
            required
            style={{ border: "1px solid #ccc" }}
          />
          <input
            className="input-field"
            type="password"
            name="password"
            placeholder="password"
            onChange={handelChange}
            required
          />
          <Link to="/signup">
            <p>Don't have and account?</p>
          </Link>
          <button className="btn #f57f17 yellow darken-4" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
