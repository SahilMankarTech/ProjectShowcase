import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [post, setPost] = useState([]);
  const [secretkey, setSecretkey] = useState("");
  const handelChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    if (formData.userType == "admin" && secretkey != "swaraj") {
      alert("Invalid Admin");
    } else {
      fetch("http://localhost:5000/register", {
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
          console.log(data);
        });
    }
  };
  console.log(formData);

  return (
    <div className="container my-container">
      {post.error && (
        <div className="red card-panel">{post.error} with that email!</div>
      )}
      {post.status && (
        <div className="green card-panel">You are Signup can Login now!</div>
      )}
      <h5>Signup</h5>
      <form onSubmit={handleSumbit}>
        <div className="container my-container with-gap ">
          <label>
            <input
              className="with-gap"
              name="userType"
              type="radio"
              value="user"
              onClick={handelChange}
            />
            <span>User</span>
          </label>

          <label>
            <input
              name="userType"
              type="radio"
              value="admin"
              onClick={handelChange}
            />
            <span>Admin</span>
          </label>
        </div>
        {formData.userType == "admin" ? (
          <input
            type="text"
            placeholder="Secret Key"
            name="secretkey"
            onChange={(e) => setSecretkey(e.target.value)}
            required
          />
        ) : null}

        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={handelChange}
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={handelChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handelChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handelChange}
          required
        />
        <Link to="/login">
          <p>Already have and account?</p>
        </Link>
        <button className="btn #f57f17 yellow darken-4" type="submit">
          submit
        </button>
      </form>
    </div>
  );
}
