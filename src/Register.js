import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseDispatch, useDispatch } from "react-redux";

const Registerform = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const isFormValid = email.trim() && username.trim() && password.trim();

    const handleSubmit = (e) => {
        e.preventDefault();

        const userDataString = localStorage.getItem('userData');
        console.log(userDataString);
        var existingUserData=[];
    
        if (userDataString !== null) {
            existingUserData = JSON.parse(userDataString);
        }
        // else{
        //     existingUserData=[];
        // }
    
        const newUserData = {
            email: email,
            username: username,
            password: password,
        };
    
        // Ensure existingUserData is an array
        // if (existingUserData.length===0) {
        //     existingUserData = [];
        // }
    
        // Update the user data
        const updatedUserData = [...existingUserData, newUserData];
    
        localStorage.setItem('userData', JSON.stringify(updatedUserData));

        if (email!==null) {
            // Valid user, redirect to '/' page
            
            dispatch({
              type: "ADD_USER",
              payload:email,
            });
      
            navigate(`/addtodo`);
      
          } else {
            // Invalid user, set error message
            
          }
    
        // navigate(`/?userId=${email}`);
    };
    
    

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <form style={{ backgroundColor: 'white', border: '2px solid black', position: 'relative', left: '41%', bottom: '-100px', padding: '50px' }}>
                    <h2 style={{ position: 'relative', left: '45px', fontSize: '26px', top: '-50px' }}>Register</h2>
                    <input type="text" name="email" placeholder="Email" value={email} onChange={handleEmailChange} /><br /><br />
                    <input type="text" name="text" placeholder="Username" value={username} onChange={handleUsernameChange} /><br /><br />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} /><br /><br />
                    <div className="btn-group">
                        <button type="submit" style={{ position: 'relative', left: '51px' }} onClick={handleSubmit} disabled={!isFormValid}>Register</button><br /><br />
                        <Link to="/">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registerform;
