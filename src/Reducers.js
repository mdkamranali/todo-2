// reducers.js
const initialState = {
    todos: [],
    user:null,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'ADD_TODO':
        return {
          ...state,
          todos: [...state.todos, action.payload]
        };
      case 'REMOVE_TODO':
        return {
          ...state,
          todos: state.todos.filter(todo => todo.id !== action.payload)
        };
        case "ADD_USER" : 
        return {
          ... state,
          user:action.payload
        };
        default:
        return state;
    }
  };
  
  export default rootReducer;
  