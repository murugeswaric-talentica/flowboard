import taskReducer from '../../redux/reducers/taskReducer';
import { ADD_TASK, DELETE_TASK, MOVE_TASK } from '../../redux/types';
import * as localStorageUtils from '../../utils/localStorage';

// Mock localStorage utilities
jest.mock('../../utils/localStorage', () => ({
  loadTasks: jest.fn(() => []),
}));

describe('Task Reducer', () => {
  let initialState;
  
  beforeEach(() => {
    // Reset mock and initial state
    jest.clearAllMocks();
    initialState = [];
    localStorageUtils.loadTasks.mockReturnValue(initialState);
  });
  
  it('should return the initial state', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    // Mock loadTasks directly before calling the reducer
    localStorageUtils.loadTasks.mockImplementation(() => []);
    const result = taskReducer(undefined, action);
    expect(result).toEqual([]);
  });
  
  it('should handle ADD_TASK', () => {
    const newTask = {
      id: '123',
      title: 'Test Task',
      column: 'To Do',
      createdAt: Date.now()
    };
    
    const action = {
      type: ADD_TASK,
      payload: newTask
    };
    
    const result = taskReducer(initialState, action);
    expect(result).toEqual([newTask]);
  });
  
  it('should handle DELETE_TASK', () => {
    // Set up initial state with tasks
    const stateWithTasks = [
      { id: '123', title: 'Task 1', column: 'To Do' },
      { id: '456', title: 'Task 2', column: 'In Progress' }
    ];
    
    const action = {
      type: DELETE_TASK,
      payload: { id: '123' }
    };
    
    const result = taskReducer(stateWithTasks, action);
    expect(result).toEqual([
      { id: '456', title: 'Task 2', column: 'In Progress' }
    ]);
  });
  
  it('should handle MOVE_TASK', () => {
    // Set up initial state with tasks
    const stateWithTasks = [
      { id: '123', title: 'Task 1', column: 'To Do' },
      { id: '456', title: 'Task 2', column: 'In Progress' }
    ];
    
    const action = {
      type: MOVE_TASK,
      payload: { id: '123', column: 'Done' }
    };
    
    const result = taskReducer(stateWithTasks, action);
    expect(result).toEqual([
      { id: '123', title: 'Task 1', column: 'Done' },
      { id: '456', title: 'Task 2', column: 'In Progress' }
    ]);
  });
  
  it('should not modify task if ID does not match in MOVE_TASK', () => {
    // Set up initial state with tasks
    const stateWithTasks = [
      { id: '123', title: 'Task 1', column: 'To Do' }
    ];
    
    const action = {
      type: MOVE_TASK,
      payload: { id: 'non-existent', column: 'Done' }
    };
    
    const result = taskReducer(stateWithTasks, action);
    expect(result).toEqual(stateWithTasks);
  });
});
