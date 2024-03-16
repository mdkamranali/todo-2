import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const TodoList = () => {
  const dispatch = useDispatch();
  const param1 = useSelector(state => state.user); // Email

  const userDataString = localStorage.getItem('userData');
  const existingUserData = JSON.parse(userDataString) || [];
  
  const user = existingUserData.find((user) => user.email === param1);

  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState(user?.todos || []);

  useEffect(() => {
    setTodos(user?.todos || []);
    console.log(user);
  }, [user]); // Update todos when user data changes

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const applycss = {
    position: 'relative',
    right: '-378px',
    top: '-62px',
    cursor: 'pointer',
  };

  const handleClose = () => setOpen(false);

  const removeTodo = (id) => {
    // Dispatch remove todo action to Redux store
    dispatch({
      type: 'REMOVE_TODO',
      payload: id
    });

    // Update local storage
    const updatedUserData = existingUserData.map((userData) => {
      if (userData.email === param1) {
        const updatedTodos = userData.todos.filter((todo) => todo.id !== id);
        return { ...userData, todos: updatedTodos };
      }
      return userData;
    });
    // Save the updated user data back to local storage
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => removeTodo(todo.id)}>Remove</button>
          <div>
            <Button onClick={() => { setOpen(todo.text) }}>Show</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <div><button style={applycss} onClick={handleClose}>Close</button></div>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {open}
                </Typography>
              </Box>
            </Modal>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
