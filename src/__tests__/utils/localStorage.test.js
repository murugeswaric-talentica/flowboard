import { saveTasks, loadTasks } from '../../utils/localStorage';
import { LOCAL_STORAGE_KEY } from '../../constants';

// Mock constants module
jest.mock('../../constants', () => ({
  LOCAL_STORAGE_KEY: 'flowboard_tasks',
  TASK_COUNTER_KEY: 'flowboard_task_counter',
  generateTaskNumber: jest.fn(() => 'FB-42')
}));

// Mock localStorage
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('localStorage Utilities', () => {
  beforeEach(() => {
    // Clear mock localStorage and reset mock function calls
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  it('should save tasks to localStorage', () => {
    const tasks = [
      { id: '1', taskNumber: 'FB-1', title: 'Task 1', column: 'To Do' },
      { id: '2', taskNumber: 'FB-2', title: 'Task 2', column: 'In Progress' }
    ];
    
    saveTasks(tasks);
    
    expect(localStorage.setItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEY,
      JSON.stringify(tasks)
    );
  });

  it('should load tasks from localStorage', () => {
    const tasks = [
      { id: '1', taskNumber: 'FB-1', title: 'Task 1', column: 'To Do' },
      { id: '2', taskNumber: 'FB-2', title: 'Task 2', column: 'In Progress' }
    ];
    
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    const loadedTasks = loadTasks();
    
    expect(localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY);
    expect(loadedTasks).toEqual(tasks);
  });

  it('should return an empty array if no tasks in localStorage', () => {
    localStorage.getItem.mockReturnValueOnce(null);
    const loadedTasks = loadTasks();
    
    expect(localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY);
    expect(loadedTasks).toEqual([]);
  });

  it('should handle errors when saving to localStorage', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    // Force an error
    localStorage.setItem.mockImplementationOnce(() => {
      throw new Error('Storage error');
    });
    
    saveTasks([{ id: '1', title: 'Task 1' }]);
    
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should handle errors when loading from localStorage', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    // Force an error
    localStorage.getItem.mockImplementationOnce(() => {
      throw new Error('Storage error');
    });
    
    const result = loadTasks();
    
    expect(consoleSpy).toHaveBeenCalled();
    expect(result).toEqual([]);
    consoleSpy.mockRestore();
  });
  
  it('should add task numbers to tasks that do not have them', () => {
    const tasksWithoutNumbers = [
      { id: '1', title: 'Task 1', column: 'To Do' },
      { id: '2', title: 'Task 2', column: 'In Progress' }
    ];
    
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasksWithoutNumbers));
    const loadedTasks = loadTasks();
    
    // All tasks should now have task numbers
    expect(loadedTasks.every(task => task.taskNumber === 'FB-42')).toBeTruthy();
    
    // And the tasks should have been saved back to localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEY,
      expect.any(String)
    );
  });
});
