import { ADD_TASK, DELETE_TASK, MOVE_TASK } from '../types';
import { generateId, generateTaskNumber } from '../../constants';
import { saveTasks } from '../../utils/localStorage';

/**
 * Action creator to add a new task
 * @param {string} title - The task title
 * @returns {Object} - Redux action
 */
export const addTask = (title) => (dispatch, getState) => {
  const task = {
    id: generateId(),
    taskNumber: generateTaskNumber(),
    title,
    column: 'To Do',
    createdAt: Date.now()
  };
  
  dispatch({
    type: ADD_TASK,
    payload: task
  });
  
  // Save to localStorage after updating state
  const updatedTasks = getState().tasks;
  saveTasks(updatedTasks);
};

/**
 * Action creator to delete a task
 * @param {string} id - The task ID
 * @returns {Object} - Redux action
 */
export const deleteTask = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_TASK,
    payload: { id }
  });
  
  // Save to localStorage after updating state
  const updatedTasks = getState().tasks;
  saveTasks(updatedTasks);
};

/**
 * Action creator to move a task to a different column
 * @param {string} id - The task ID
 * @param {string} column - The destination column
 * @returns {Object} - Redux action
 */
export const moveTask = (id, column) => (dispatch, getState) => {
  dispatch({
    type: MOVE_TASK,
    payload: { id, column }
  });
  
  // Save to localStorage after updating state
  const updatedTasks = getState().tasks;
  saveTasks(updatedTasks);
};
