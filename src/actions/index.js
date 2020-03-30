import { ADD_TODO, REMOVE_TODO, INCREMENT, DECREMENT } from 'constants/index';

export const addTodoAction = (todoText) => ({
  type: ADD_TODO,
  todoText
});

export const removeTodoAction = (todoText) => ({
  type: REMOVE_TODO,
  todoText
});

export const incrementCoutnerAction = () => ({
  type: INCREMENT
});

export const decrementCounterAction = () => ({
  type: DECREMENT
});
