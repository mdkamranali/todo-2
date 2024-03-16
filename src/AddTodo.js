import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
import Todolist from './Todolist'

const AddTodo = () => {
  
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const param1= useSelector(state => state.user)
  console.log(param1)
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const param1 = searchParams.get("userId");

  const userDataString = localStorage.getItem("userData");
  const existingUserData = JSON.parse(userDataString) || [];

  let user = existingUserData.find((user) => user.email === param1);
//  console.log(user);

  // useEffect(() =>{
        
  // },[])

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (user.todos === undefined || user.todos.length === 0) {
      // Handle case where user or user.todos is undefined or null
      // You may want to log an error or handle it gracefully
       user.todos=[];

      if (text.trim() !== "") {
        dispatch({
          type: "ADD_TODO",
          payload: {
            id: Date.now(),
            text: text.trim(),
          },
        });
  
        // Update user object with new todo item
        const updatedUser = { ...user, todos: [...user.todos, { id: Date.now(), text: text.trim() }] };
        // Update local storage with updated user object
        const updatedUserData = existingUserData.map((userData) =>
          userData.email === param1 ? updatedUser : userData
        );
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
  
        setText("");
      }
    } else if (text.trim() !== "") {
      dispatch({
        type: "ADD_TODO",
        payload: {
          id: Date.now(),
          text: text.trim(),
        },
      });
  
      // Update user object with new todo item
      const updatedUser = { ...user, todos: [...user.todos, { id: Date.now(), text: text.trim() }] };
  
      // Update local storage with updated user object
      const updatedUserData = existingUserData.map((userData) =>
        userData.email === param1 ? updatedUser : userData
      );
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      setText("");
    }
  }
  

  const handleRemove = (id) => {
    dispatch({
      type: "REMOVE_TODO",
      payload: id,
    });
  };
  
  return (
    <div>
      <h1>{user?.email}</h1>
      <input type="text" value={text} onChange={handleChange} />
      <button onClick={handleSubmit} disabled={text?.length === 0}>
        Add Todo
      </button>
      <Todolist />
    </div>
  );

};

export default AddTodo;
