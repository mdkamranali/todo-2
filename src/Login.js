// Login.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const a = useSelector(state => state.user);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission

    // Get values from form fields
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Retrieve user data from local storage
    const userDataString = localStorage.getItem("userData");
console.log("userDataString:", userDataString); // Check if userDataString is null or contains data
const existingUserData = JSON.parse(userDataString) || [];
console.log("existingUserData:", existingUserData); // Check if existingUserData is being populated correctly


    // Check if the entered email and password match any user data
    const user = existingUserData.find(
      (user) => user.email === email && user.password === password
    );
    
    if (user) {
      // Valid user, redirect to '/' page
      
      dispatch({
        type: "ADD_USER",
        payload:email,
      });

      setErrorMessage("");
      navigate(`/addtodo`);

    } else {
      // Invalid user, set error message
      setErrorMessage("Invalid email or password");
    }
    // const user = useSelector(state => state.user);
    // console.log(a);
  };

  const applycss = {
    display: "flex",
  };
  const heading = {
    position: "relative",
    left: "45px",
    fontSize: "26px",
    top: "-50px",
  };
  const center = {
    backgroundColor: "white",
    border: "2px solid black",
    position: "relative",
    left: "41%",
    bottom: "-100px",
    padding: "50px",
  };
  const button = {
    position: "relative",
    left: "51px",
  };

  return (
    <div>
      <div style={applycss}>
        <form style={center} onSubmit={handleSubmit}>
          <h2 style={heading}>Login</h2>
          <input type="text" name="email" placeholder="Email" /><br/><br/>
          <input type="password" name="password" placeholder="Password" /><br/><br/>
          <div className="btn-group">
            <button type="submit" style={button}>Login</button><br/><br/>
            <Link to="/register">Register</Link>
          </div>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
