// App.js
import React from 'react';
import { Provider } from 'react-redux';
import {Route,Routes} from 'react-router-dom'
import store from './Store'; 
import AddTodo from './AddTodo';
import Registerform from './Register';
import LoginForm from './Login';

const App = () => {
  return (
    <Provider store={store}>
    <Routes>
    <Route path='/' element={<LoginForm/>}></Route>
    <Route path='/addtodo' element={<AddTodo/>}></Route>
    <Route path='/register' element={<Registerform/>}></Route>
    {/* <Route path='/' element={<AddTodo/>}></Route> */}
    </Routes>
    </Provider>
  );
};

export default App;
