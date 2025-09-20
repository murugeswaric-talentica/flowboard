import { ADD_TASK, DELETE_TASK, MOVE_TASK } from '../types';
import { loadTasks } from '../../utils/localStorage';

// Initialize state from localStorage if available
const initialState = loadTasks();

/**
 * Task reducer for managing task state
 * @param {Array} state - Current task state
 * @param {Object} action - Redux action
 * @returns {Array} - Updated task state
 */
const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
      
    case DELETE_TASK:
      return state.filter(task => task.id !== action.payload.id);
      
    case MOVE_TASK:
      return state.map(task => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            column: action.payload.column
          };
        }
        return task;
      });
      
    default:
      return state;
  }
};

export default taskReducer;
