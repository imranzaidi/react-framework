import { ADD_TODO, REMOVE_TODO } from 'constants/index';

export default function todos (state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todoText]);
    case REMOVE_TODO:
      return state.filter(todo => todo !== action.todoText);
    default:
      return state;
  }
}
