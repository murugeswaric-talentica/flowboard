import { addTask, deleteTask, moveTask } from '../../redux/actions/taskActions';
import { ADD_TASK, DELETE_TASK, MOVE_TASK } from '../../redux/types';
import * as localStorageUtils from '../../utils/localStorage';
import * as constants from '../../constants';

// Mock localStorage utilities and constants
jest.mock('../../utils/localStorage', () => ({
  saveTasks: jest.fn()
}));

jest.mock('../../constants', () => ({
  generateId: jest.fn(() => 'mock-id-123'),
  generateTaskNumber: jest.fn(() => 'FB-42'),
}));

describe('Task Actions', () => {
  let mockDispatch;
  let mockGetState;
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock Redux dispatch and getState
    mockDispatch = jest.fn();
    mockGetState = jest.fn(() => ({ tasks: [] }));
  });
  
  describe('addTask', () => {
    it('should create an ADD_TASK action and save to localStorage', () => {
      // Mock Date.now
      const mockDate = 1600000000000;
      jest.spyOn(Date, 'now').mockImplementation(() => mockDate);
      
      // Call the action creator
      addTask('Test Task')(mockDispatch, mockGetState);
      
      // Verify dispatch was called with correct action
      expect(mockDispatch).toHaveBeenCalledWith({
        type: ADD_TASK,
        payload: {
          id: 'mock-id-123',
          taskNumber: 'FB-42',
          title: 'Test Task',
          column: 'To Do',
          createdAt: mockDate
        }
      });
      
      // Verify localStorage save was called
      expect(localStorageUtils.saveTasks).toHaveBeenCalledWith([]);
      
      // Restore Date.now mock
      jest.restoreAllMocks();
    });
  });
  
  describe('deleteTask', () => {
    it('should create a DELETE_TASK action and save to localStorage', () => {
      // Call the action creator
      deleteTask('task-id-1')(mockDispatch, mockGetState);
      
      // Verify dispatch was called with correct action
      expect(mockDispatch).toHaveBeenCalledWith({
        type: DELETE_TASK,
        payload: { id: 'task-id-1' }
      });
      
      // Verify localStorage save was called
      expect(localStorageUtils.saveTasks).toHaveBeenCalledWith([]);
    });
  });
  
  describe('moveTask', () => {
    it('should create a MOVE_TASK action and save to localStorage', () => {
      // Call the action creator
      moveTask('task-id-1', 'Done')(mockDispatch, mockGetState);
      
      // Verify dispatch was called with correct action
      expect(mockDispatch).toHaveBeenCalledWith({
        type: MOVE_TASK,
        payload: { id: 'task-id-1', column: 'Done' }
      });
      
      // Verify localStorage save was called
      expect(localStorageUtils.saveTasks).toHaveBeenCalledWith([]);
    });
  });
});
