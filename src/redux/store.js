import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import taskReducer from './reducers/taskReducer';
import filterReducer from './reducers/filterReducer';

// Combine reducers
const rootReducer = combineReducers({
  tasks: taskReducer,
  filter: filterReducer
});

// Create store with thunk middleware for async actions
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
