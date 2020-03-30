import { createStore } from 'redux';
import rootReducer from '@reducers';

const initialState = window.__APP_STATE__ && window.__APP_STATE__.reduxInitialState;
const store = createStore(rootReducer, initialState);

export default store;
